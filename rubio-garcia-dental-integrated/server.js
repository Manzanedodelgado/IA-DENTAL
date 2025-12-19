import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de conexión a GELITE (SQL Server)
// SEGURIDAD: Credenciales movidas a variables de entorno
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        instanceName: process.env.DB_INSTANCE || 'INFOMED',
        enableArithAbort: true
    }
};

// Validar que las credenciales estén configuradas
if (!dbConfig.user || !dbConfig.password || !dbConfig.server || !dbConfig.database) {
    console.error('❌ ERROR: Faltan variables de entorno de base de datos');
    console.error('Por favor, copia .env.example a .env y configura las credenciales');
    process.exit(1);
}


// Configuración CORS para permitir acceso desde múltiples orígenes
app.use(cors({
    origin: [
        'http://localhost:5173',              // Desarrollo local
        'http://localhost:3000',              // Desarrollo alternativo
        'https://*.vercel.app',               // Previews de Vercel
        'https://app.rubiogarciadental.com'   // Producción (ajusta según tu dominio)
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        res.json({ status: 'OK', server: dbConfig.server, database: dbConfig.database });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', error: err.message });
    }
});

// Ejecutar consultas SQL dinámicas
app.post('/api/query', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    // Seguridad: Solo permitir SELECT para evitar daños accidentales
    const upperQuery = query.toUpperCase().trim();
    if (!upperQuery.startsWith('SELECT')) {
        return res.status(403).json({ error: 'POR SEGURIDAD, EN ESTA FASE SOLO SE PERMITEN CONSULTAS DE LECTURA (SELECT).' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(query);
        res.json({ rows: result.recordset });
    } catch (err) {
        console.error('SQL Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoints específicos para Alveolo

// Obtener citas del día
app.get('/api/appointments/:date', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('fecha', sql.VarChar, req.params.date)
            .query(`
        SELECT 
          dc.IdOrden as id,
          dc.Fecha as date,
          dc.Hora as time,
          dc.Duracion as durationMinutes,
          CONCAT(p.Nombre, ' ', p.Apellidos) as patientName,
          p.TelMovil as phone,
          CONCAT(col.Nombre, ' ', col.Apellidos) as doctor,
          t.DescripPac as treatment,
          dc.Notas as notes,
          sc.Descripcio as status
        FROM DCitas dc
        LEFT JOIN Pacientes p ON dc.IdPac = p.IdPac
        LEFT JOIN TColabos col ON dc.IdCol = col.IdCol
        LEFT JOIN Tratamientos t ON dc.IdTratamiento = t.IdTratamiento
        LEFT JOIN TSitCita sc ON dc.IdSitC = sc.IdSitC
        WHERE CONVERT(date, dc.Fecha) = @fecha
        ORDER BY dc.Hora
      `);
        res.json({ rows: result.recordset });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener pacientes
app.get('/api/patients', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
      SELECT TOP 200
        IdPac as id,
        Nombre as firstName,
        Apellidos as lastName,
        CONCAT(Nombre, ' ', Apellidos) as name,
        NIF as dni,
        CONCAT('P-', RIGHT('00000' + CAST(IdPac AS VARCHAR), 5)) as recordNumber,
        COALESCE(TelMovil, Tel1) as phone,
        Email as email,
        Direccion as address,
        FecNacim as birthDate,
        FecAlta as registrationDate,
        CASE WHEN Inactivo = 1 THEN 'inactive' ELSE 'active' END as status
      FROM Pacientes
      WHERE Inactivo = 0
      ORDER BY FecAlta DESC
    `);
        res.json({ rows: result.recordset });
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: err.message });
    }
});

// Buscar paciente por ID
app.get('/api/patients/:id', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
        SELECT 
          IdPac as id,
          Nombre as firstName,
          Apellidos as lastName,
          CONCAT(Nombre, ' ', Apellidos) as name,
          NIF as dni,
          CONCAT('P-', RIGHT('00000' + CAST(IdPac AS VARCHAR), 5)) as recordNumber,
          COALESCE(TelMovil, Tel1) as phone,
          Email as email,
          Direccion as address,
          FecNacim as birthDate,
          FecAlta as registrationDate,
          CASE WHEN Inactivo = 1 THEN 'inactive' ELSE 'active' END as status
        FROM Pacientes
        WHERE IdPac = @id
      `);
        res.json({ patient: result.recordset[0] || null });
    } catch (err) {
        console.error('Error fetching patient:', err);
        res.status(500).json({ error: err.message });
    }
});

// Historial de tratamientos de un paciente
app.get('/api/patients/:id/treatments', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
        SELECT 
          tm.NumTto as id,
          tm.FecIni as date,
          tm.PiezasNum as tooth,
          t.DescripPac as treatment,
          t.DescripMed as description,
          CONCAT(c.Nombre, ' ', c.Apellidos) as doctor,
          tm.Importe as cost,
          tm.StaTto as status
        FROM TtosMed tm
        LEFT JOIN Tratamientos t ON tm.IdTratamiento = t.IdTratamiento
        LEFT JOIN TColabos c ON tm.IdCol = c.IdCol
        WHERE tm.IdPac = @id
        ORDER BY tm.FecIni DESC
      `);
        res.json({ rows: result.recordset });
    } catch (err) {
        console.error('Error fetching treatments:', err);
        res.status(500).json({ error: err.message });
    }
});

// Presupuestos de un paciente
app.get('/api/patients/:id/budgets', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
        SELECT 
          pr.NumPre as id,
          pr.FecPresup as date,
          pr.Titulo as title,
          pr.Estado as status,
          (SELECT SUM(pt.ImportePre * pt.Unidades) FROM PresuTto pt WHERE pt.NumPre = pr.NumPre) as total
        FROM Presu pr
        WHERE pr.IdPac = @id
        ORDER BY pr.FecPresup DESC
      `);
        res.json({ rows: result.recordset });
    } catch (err) {
        console.error('Error fetching budgets:', err);
        res.status(500).json({ error: err.message });
    }
});

// Estadísticas para Dashboard
app.get('/api/stats/dashboard', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);

        const today = new Date().toISOString().split('T')[0];

        // SEGURIDAD: Usar prepared statements en lugar de interpolación
        const [citasHoy, pacientesActivos, citasPendientes] = await Promise.all([
            pool.request()
                .input('today', sql.Date, today)
                .query(`SELECT COUNT(*) as count FROM DCitas WHERE CONVERT(date, Fecha) = @today`),
            pool.request()
                .query(`SELECT COUNT(*) as count FROM Pacientes WHERE Inactivo = 0`),
            pool.request()
                .input('today', sql.Date, today)
                .query(`SELECT COUNT(*) as count FROM DCitas WHERE CONVERT(date, Fecha) >= @today`)
        ]);

        res.json({
            citasHoy: citasHoy.recordset[0].count,
            pacientesActivos: pacientesActivos.recordset[0].count,
            citasPendientes: citasPendientes.recordset[0].count
        });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor IA Dental Backend escuchando en http://localhost:${PORT}`);
    console.log(`📡 Conectando a ${dbConfig.server}\\${dbConfig.options.instanceName} -> BD: ${dbConfig.database}`);
});
