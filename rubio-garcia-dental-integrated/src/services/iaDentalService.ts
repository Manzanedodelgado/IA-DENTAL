// ============================================
// SERVICIO IA DENTAL - GEMINI + SQL
// ============================================

import { GoogleGenAI } from "@google/genai";
import { ChatMessage, SystemConfigItem } from "../types";

// API Key desde variables de entorno
const API_KEY = (typeof process !== 'undefined' && process.env?.API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_KEY) || '';

// SCHEMA COMPLETO DE GELITE
const DATABASE_SCHEMA = `
DATABASE SCHEMA 'GELITE' (SQL SERVER) [CONTEXT: DENTAL CLINIC MANAGEMENT]:

TABLE Pacientes ( -- Main Patients Table
  IdPac INT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellidos VARCHAR(100),
  NIF VARCHAR(20),
  Tel1 VARCHAR(20),
  TelMovil VARCHAR(20),
  Email VARCHAR(100),
  Direccion VARCHAR(150),
  CP VARCHAR(10),
  Poblacion VARCHAR(100),
  FecNacim DATETIME,
  FecAlta DATETIME,
  Inactivo BIT
);

TABLE TColabos ( -- Doctors & Staff
  IdCol INT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellidos VARCHAR(100),
  NIF VARCHAR(20),
  NumColeg VARCHAR(20),
  Activo BIT,
  Comision DECIMAL(10,2)
);

TABLE DCitas ( -- Appointments/Agenda
  IdOrden INT PRIMARY KEY,
  IdPac INT, -- FK Pacientes
  IdCol INT, -- FK TColabos (Doctor)
  Fecha DATETIME,
  Hora VARCHAR(5), -- Format HH:mm
  Duracion INT, -- Minutes
  IdSitC INT, -- FK TSitCita (Status)
  Notas TEXT,
  IdTratamiento INT
);

TABLE TSitCita ( -- Appointment Status Lookup
  IdSitC INT PRIMARY KEY,
  Descripcio VARCHAR(50), -- E.g., 'Pendiente', 'Realizada', 'Fallo', 'Anulada'
  FlgAnulada BIT,
  FlgFallo BIT
);

TABLE Tratamientos ( -- Treatments Catalog
  IdTratamiento INT PRIMARY KEY,
  Codigo VARCHAR(20),
  DescripMed VARCHAR(255), -- Internal Description
  DescripPac VARCHAR(255), -- Patient Friendly Description
  PrecioReferencia DECIMAL(10,2),
  Inactivo BIT
);

TABLE Presu ( -- Presupuestos (Budgets Header)
  NumPre INT PRIMARY KEY,
  IdPac INT, -- FK Pacientes
  FecPresup DATETIME,
  FecAcepta DATETIME,
  FecRechaz DATETIME,
  Estado VARCHAR(20),
  Titulo VARCHAR(150)
);

TABLE PresuTto ( -- Budget Lines
  NumPre INT, -- FK Presu
  IdTratamiento INT, -- FK Tratamientos
  ImportePre DECIMAL(10,2),
  PiezasNum VARCHAR(50),
  Unidades INT
);

TABLE TtosMed ( -- Clinical History / Performed Treatments
  NumTto INT PRIMARY KEY,
  IdPac INT,
  IdTratamiento INT,
  IdCol INT,
  FecIni DATETIME,
  FecFin DATETIME,
  Importe DECIMAL(10,2),
  PiezasNum VARCHAR(10),
  StaTto VARCHAR(10)
);

TABLE PagoCli ( -- Patient Payments
  IdPagoCli INT PRIMARY KEY,
  IdPac INT,
  FechaImport DATETIME,
  Importe DECIMAL(10,2),
  IdForPago INT
);
`;

let aiClient: GoogleGenAI | null = null;

try {
    if (API_KEY) {
        aiClient = new GoogleGenAI({ apiKey: API_KEY });
    }
} catch (e) {
    console.warn("IA Dental: API Key no configurada");
}

// Ejecutar SQL contra el backend
async function executeSQL(sqlQuery: string): Promise<any[]> {
    try {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: sqlQuery })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error ejecutando SQL");
        }

        return data.rows || [];
    } catch (error: any) {
        console.error("Error SQL:", error);
        return [{ error: "Error de conexión: " + error.message }];
    }
}

// Formatear JSON a tabla Markdown
function jsonToMarkdownTable(data: any[]): string {
    if (!data || data.length === 0) return "_No se encontraron resultados._";

    if (data[0]?.error) return `⚠️ **Error:** ${data[0].error}`;

    const headers = Object.keys(data[0]);
    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;

    const rows = data.slice(0, 20).map(row => {
        return `| ${headers.map(h => {
            const val = row[h];
            if (val instanceof Date) return val.toLocaleString();
            if (val === null || val === undefined) return '-';
            return String(val).substring(0, 50);
        }).join(' | ')} |`;
    }).join('\n');

    const footer = data.length > 20 ? `\n\n_...y ${data.length - 20} resultados más_` : '';

    return `${headerRow}\n${separatorRow}\n${rows}${footer}`;
}

// ============================================
// IA DENTAL PARA ADMINISTRADOR (Genera y ejecuta SQL)
// ============================================
export async function iaDentalAdminQuery(
    history: ChatMessage[],
    userMessage: string,
    config: SystemConfigItem[] = []
): Promise<string> {

    if (!aiClient) return "⚠️ Error: API Key de Gemini no configurada. Configúrala en IA Dental > Entrenamiento.";

    const businessRules = config
        .filter(c => c.category === 'BUSINESS_RULE' && c.value === 'TRUE')
        .map(c => `- ${c.key}: ${c.description}`)
        .join('\n');

    const SYSTEM_PROMPT = `Eres IA DENTAL, el asistente de IA de Rubio García Dental. Tu trabajo es ayudar al ADMINISTRADOR de la clínica.
Tienes acceso COMPLETO a la base de datos GELITE (SQL Server).

${DATABASE_SCHEMA}

REGLAS DE NEGOCIO ACTIVAS:
${businessRules || 'Ninguna configurada'}

REGLAS CRÍTICAS PARA GENERAR SQL:
1. Para contar PACIENTES: usar tabla "Pacientes" con PK "IdPac"
2. Para contar CITAS: usar tabla "DCitas" con PK "IdOrden"  
3. NUNCA usar columnas llamadas solo "Id" - siempre usar nombre completo (IdPac, IdOrden, IdCol, etc.)
4. Usar SOLO las tablas y columnas que aparecen en el esquema
5. Para contar registros: usar COUNT(*) o COUNT(columna_especifica)
6. Usa TOP para limitar resultados (máx 50)
7. Usa GETDATE() para fecha actual
8. Para "mañana" usa DATEADD(day, 1, GETDATE())
9. Para buscar texto, usa LIKE '%valor%'
10. NUNCA uses DELETE, DROP, TRUNCATE ni comandos destructivos

EJEMPLOS DE SQL CORRECTO:
- "¿Cuántos pacientes?" → SELECT COUNT(*) AS TotalPacientes FROM Pacientes
- "¿Cuántas citas?" → SELECT COUNT(*) AS TotalCitas FROM DCitas
- "Buscar paciente García" → SELECT TOP 10 IdPac, Nombre, Apellidos FROM Pacientes WHERE Apellidos LIKE '%García%'

FORMATO DE RESPUESTA:
Devuelve SOLO el SQL envuelto en \`\`\`sql ... \`\`\` sin explicaciones adicionales.

USUARIO DICE: "${userMessage}"
`;

    try {
        const chat = aiClient.chats.create({ model: 'gemini-2.5-flash' });
        const result = await chat.sendMessage({ message: SYSTEM_PROMPT });

        let response = result.text?.trim() || '';

        // Extraer SQL si existe
        const sqlMatch = response.match(/```sql\n?([\s\S]*?)\n?```/);

        if (sqlMatch && sqlMatch[1]) {
            const sqlQuery = sqlMatch[1].trim();

            // Ejecutar SQL
            const queryResult = await executeSQL(sqlQuery);
            const tableOutput = jsonToMarkdownTable(queryResult);

            return `
He ejecutado la siguiente consulta en **GELITE**:

\`\`\`sql
${sqlQuery}
\`\`\`

**Resultados:**

${tableOutput}
      `.trim();
        }

        // Si no hay SQL, devolver respuesta directa
        return response;

    } catch (error: any) {
        console.error("Error IADental Admin:", error);
        return `❌ Error procesando la solicitud: ${error.message}`;
    }
}

// ============================================
// IA DENTAL PARA PACIENTES (Chat amable, sin SQL directo)
// ============================================
export async function iaDentalPatientChat(
    userMessage: string,
    patientContext?: { name?: string; phone?: string }
): Promise<string> {

    if (!aiClient) return "Lo siento, no puedo conectar con el sistema en este momento. Por favor, contacte directamente con la clínica.";

    const PATIENT_PROMPT = `
Eres IA DENTAL, el asistente virtual de Rubio García Dental. 
Estás hablando con un PACIENTE${patientContext?.name ? ` llamado ${patientContext.name}` : ''}.

INFORMACIÓN DE LA CLÍNICA:
- Nombre: Rubio García Dental
- Dirección: C/ Ejemplo 123, Madrid
- Teléfono: 91 XXX XX XX
- Horario: Lunes a Viernes 9:00-20:00, Sábados 9:00-14:00

TU PERSONALIDAD:
- Amable, profesional y empático
- Respuestas concisas pero cálidas
- Nunca reveles información técnica de la base de datos
- Si preguntan por citas, indica que pueden llamar o enviar WhatsApp
- Para urgencias, recomienda llamar al teléfono de la clínica

MENSAJE DEL PACIENTE: "${userMessage}"

Responde de forma natural y útil:
`;

    try {
        const chat = aiClient.chats.create({ model: 'gemini-2.5-flash' });
        const result = await chat.sendMessage({ message: PATIENT_PROMPT });
        return result.text?.trim() || "Disculpa, no he podido procesar tu mensaje. ¿Podrías repetirlo?";
    } catch (error: any) {
        console.error("Error IADental Patient:", error);
        return "Lo siento, estoy experimentando problemas técnicos. Por favor, contacta directamente con la clínica.";
    }
}

// ============================================
// RESPUESTA GENERAL PARA WIDGET
// ============================================
export async function generateIADentalResponse(
    message: string,
    context: string = "general"
): Promise<string> {

    if (!aiClient) return "Sistema IA Dental no disponible. API Key no configurada.";

    const prompt = `
Eres IA DENTAL, el asistente de IA de Rubio García Dental.
Contexto actual: ${context}

Usuario dice: "${message}"

Responde de forma útil, profesional y concisa:
`;

    try {
        const chat = aiClient.chats.create({ model: 'gemini-2.5-flash' });
        const result = await chat.sendMessage({ message: prompt });
        return result.text?.trim() || "No pude generar una respuesta.";
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

export { aiClient, API_KEY };
