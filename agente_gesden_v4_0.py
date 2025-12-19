"""
=====================================================
AGENTE AI PARA GESDEN G5.29 - VERSIÓN 4.0
Versión: 4.0 - INTELIGENCIA ARTIFICIAL REAL
Base de datos: GELITE (SQL Server 2008)
=====================================================

🤖 NUEVA ARQUITECTURA v4.0:
- Motor de IA usando Claude API
- Procesamiento real de lenguaje natural
- Sin patrones regex limitados
- Entiende CUALQUIER forma de expresarse
- Contexto conversacional

IMPORTANTE:
- NumPac = Número de paciente visible (usado por la clínica)
- IdPac = ID interno de base de datos (clave primaria)
- El usuario trabaja con NumPac, pero las relaciones usan IdPac

FUNCIONALIDADES v4.0:
✅ Crear/Buscar pacientes (con validación de duplicados)
✅ Crear/Listar citas
✅ Crear presupuestos
✅ Crear actos médicos/tratamientos
✅ Consultar deuda pendiente
✅ Buscar tratamientos en catálogo
✅ Listar colaboradores activos
✅ 🆕 Motor de IA con Claude para lenguaje natural
✅ 🆕 Modo fallback si no hay API key
"""

import pyodbc
import re
import json
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List, Tuple
import logging

# =====================================================
# CONFIGURACIÓN
# =====================================================

class ConfigGesden:
    """Configuración de conexión a Gesden"""
    
    SERVIDOR = "GABINETE2\\INFOMED"
    BASE_DATOS = "GELITE"
    DRIVER = "SQL Server"
    ID_CENTRO = 2  # Tu centro
    
    # API de Claude (obtener de variable de entorno)
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
    
    @classmethod
    def get_connection_string(cls):
        return (
            f'DRIVER={{{cls.DRIVER}}};'
            f'SERVER={cls.SERVIDOR};'
            f'DATABASE={cls.BASE_DATOS};'
            f'Trusted_Connection=yes;'
        )

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('agente_gesden.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

# =====================================================
# UTILIDADES DE CONVERSIÓN DE FECHAS
# =====================================================

class ConversorFechas:
    """Convierte entre formatos de fecha de Gesden y Python"""
    
    @staticmethod
    def fecha_gesden_a_datetime(fecha_int: int) -> datetime:
        """Convierte fecha de Gesden (int) a datetime"""
        base_date = datetime(1899, 12, 30)
        return base_date + timedelta(days=fecha_int)
    
    @staticmethod
    def datetime_a_fecha_gesden(fecha: datetime) -> int:
        """Convierte datetime a formato Gesden (int)"""
        base_date = datetime(1899, 12, 30)
        delta = fecha - base_date
        return delta.days
    
    @staticmethod
    def hora_gesden_a_str(hora_int: int) -> str:
        """Convierte hora de Gesden a string legible"""
        if hora_int is None:
            return "00:00"
        horas = hora_int // 10000
        minutos = (hora_int % 10000) // 100
        return f"{horas:02d}:{minutos:02d}"
    
    @staticmethod
    def str_a_hora_gesden(hora_str: str) -> int:
        """Convierte string de hora a formato Gesden"""
        partes = hora_str.split(':')
        horas = int(partes[0])
        minutos = int(partes[1]) if len(partes) > 1 else 0
        return (horas * 10000) + (minutos * 100)

# =====================================================
# CLASE DE CONEXIÓN A BASE DE DATOS
# =====================================================

class ConexionGesden:
    """Maneja la conexión y operaciones con la BD de Gesden"""
    
    def __init__(self):
        self.conn: Optional[pyodbc.Connection] = None
        self.conectar()
    
    def conectar(self):
        """Establece conexión con Gesden"""
        try:
            conn_string = ConfigGesden.get_connection_string()
            self.conn = pyodbc.connect(conn_string)
            logging.info("✅ Conectado a Gesden GELITE")
            print("✅ Conexión exitosa a Gesden")
        except Exception as e:
            logging.error(f"❌ Error de conexión: {str(e)}")
            raise Exception(f"No se pudo conectar a Gesden: {str(e)}")
    
    def ejecutar_query(self, sql: str, params: tuple = None, commit: bool = False) -> Any:
        """Ejecuta una query SQL"""
        try:
            cursor = self.conn.cursor()
            
            if params:
                cursor.execute(sql, params)
            else:
                cursor.execute(sql)
            
            if commit:
                self.conn.commit()
                filas_afectadas = cursor.rowcount
                logging.info(f"✅ Query ejecutada. Filas afectadas: {filas_afectadas}")
                return filas_afectadas
            else:
                resultados = cursor.fetchall()
                logging.info(f"✅ Query ejecutada. Resultados: {len(resultados)} filas")
                return resultados
        
        except Exception as e:
            if commit:
                self.conn.rollback()
            logging.error(f"❌ Error en query: {str(e)}")
            raise
    
    def cerrar(self):
        """Cierra la conexión"""
        if self.conn:
            self.conn.close()
            logging.info("🔒 Conexión cerrada")

# =====================================================
# GESTOR DE PACIENTES
# =====================================================

class GestorPacientes:
    """Gestiona operaciones con pacientes"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def crear_paciente(self, nombre: str, apellidos: str, 
                      fecha_nacimiento: datetime, telefono_movil: str,
                      email: str = None, direccion: str = None,
                      sexo: str = None) -> Dict:
        """Crea un nuevo paciente en la base de datos"""
        
        # Convertir a mayúsculas
        nombre = nombre.upper().strip()
        apellidos = apellidos.upper().strip()
        
        # ========================================
        # VALIDACIÓN DE DUPLICADOS
        # ========================================
        
        # 1. Validar por nombre y apellidos exactos
        duplicados_nombre = self.db.ejecutar_query(
            """
            SELECT IdPac, NumPac, Nombre, Apellidos, FecNacim, TelMovil
            FROM Pacientes
            WHERE Nombre = ? AND Apellidos = ?
            """,
            (nombre, apellidos)
        )
        
        if duplicados_nombre:
            pac_dup = duplicados_nombre[0]
            raise ValueError(
                f"❌ PACIENTE DUPLICADO\n"
                f"Ya existe: {pac_dup.Nombre} {pac_dup.Apellidos}\n"
                f"NumPac: {pac_dup.NumPac} | ID: {pac_dup.IdPac}\n"
                f"F.Nac: {pac_dup.FecNacim.strftime('%d/%m/%Y') if pac_dup.FecNacim else 'N/A'}\n"
                f"Tel: {pac_dup.TelMovil or 'N/A'}"
            )
        
        # 2. Validar por teléfono
        if telefono_movil:
            tel_limpio = telefono_movil.replace(" ", "").replace("-", "")
            duplicados_tel = self.db.ejecutar_query(
                """
                SELECT IdPac, NumPac, Nombre, Apellidos, TelMovil
                FROM Pacientes
                WHERE REPLACE(REPLACE(TelMovil, ' ', ''), '-', '') = ?
                """,
                (tel_limpio,)
            )
            
            if duplicados_tel:
                pac_dup = duplicados_tel[0]
                raise ValueError(
                    f"❌ TELÉFONO YA REGISTRADO\n"
                    f"El teléfono {telefono_movil} pertenece a:\n"
                    f"{pac_dup.Nombre} {pac_dup.Apellidos}\n"
                    f"NumPac: {pac_dup.NumPac} | ID: {pac_dup.IdPac}"
                )
        
        # 3. Validar por similitud
        partes_nombre = nombre.split()
        if partes_nombre:
            primer_nombre = partes_nombre[0]
            similares = self.db.ejecutar_query(
                """
                SELECT TOP 3 IdPac, NumPac, Nombre, Apellidos, FecNacim, TelMovil
                FROM Pacientes
                WHERE Apellidos = ? AND Nombre LIKE ?
                """,
                (apellidos, f"{primer_nombre}%")
            )
            
            if similares:
                print("\n⚠️ ADVERTENCIA: Encontré paciente(s) con nombre similar:")
                for pac in similares:
                    print(f"   • {pac.Nombre} {pac.Apellidos} - "
                          f"NumPac: {pac.NumPac} - "
                          f"Tel: {pac.TelMovil or 'N/A'}")
                
                confirmacion = input("\n¿Estás SEGURO de crear este nuevo paciente? (escribe SI): ")
                if confirmacion.upper() != 'SI':
                    raise ValueError("❌ Creación cancelada. El paciente probablemente ya existe.")
        
        # ========================================
        # CREAR PACIENTE
        # ========================================
        
        # Obtener siguiente NumPac
        result = self.db.ejecutar_query(
            "SELECT MAX(NumPac) AS MaxNum FROM Pacientes"
        )
        siguiente_numpac = (result[0].MaxNum or 0) + 1
        
        # Insertar paciente
        sql = """
            INSERT INTO Pacientes (
                NumPac, Nombre, Apellidos, FecNacim, TelMovil,
                Email, Direccion, Sexo, FecAlta, IdCentro,
                Mailing, TipoDocIdent, _version, _fechaModif,
                AceptaGDPR, NoContactable, Derivado
            ) VALUES (
                ?, ?, ?, ?, ?,
                ?, ?, ?, GETDATE(), ?,
                0, 0, 1, GETDATE(),
                0, 0, 0
            )
        """
        
        self.db.ejecutar_query(
            sql,
            (siguiente_numpac, nombre, apellidos, fecha_nacimiento, telefono_movil,
             email, direccion, sexo, ConfigGesden.ID_CENTRO),
            commit=True
        )
        
        # Obtener el paciente creado
        paciente_creado = self.db.ejecutar_query(
            "SELECT TOP 1 IdPac, NumPac, Nombre, Apellidos FROM Pacientes ORDER BY IdPac DESC"
        )[0]
        
        resultado = {
            'IdPac': paciente_creado.IdPac,
            'NumPac': paciente_creado.NumPac,
            'Nombre': paciente_creado.Nombre,
            'Apellidos': paciente_creado.Apellidos
        }
        
        logging.info(f"✅ Paciente creado: ID={resultado['IdPac']}, NumPac={resultado['NumPac']}, {nombre} {apellidos}")
        
        return resultado
    
    def buscar_paciente(self, nombre: str = None, apellidos: str = None, 
                       numpac: str = None, telefono: str = None) -> List[Dict]:
        """Busca pacientes por diversos criterios"""
        condiciones = []
        params = []
        
        # Si el primer parámetro es un número, buscar por NumPac
        if nombre and nombre.strip().isdigit():
            condiciones.append("NumPac = ?")
            params.append(int(nombre.strip()))
        elif nombre:
            condiciones.append("Nombre LIKE ?")
            params.append(f"%{nombre.upper()}%")
        
        if apellidos:
            condiciones.append("Apellidos LIKE ?")
            params.append(f"%{apellidos.upper()}%")
        
        if numpac:
            condiciones.append("NumPac = ?")
            params.append(numpac)
        
        if telefono:
            tel_limpio = telefono.replace(" ", "").replace("-", "")
            condiciones.append("(TelMovil LIKE ? OR Tel1 LIKE ?)")
            params.extend([f"%{tel_limpio}%", f"%{tel_limpio}%"])
        
        if not condiciones:
            return []
        
        sql = f"""
            SELECT TOP 10
                IdPac, NumPac, Nombre, Apellidos,
                TelMovil, Email, FecNacim, Sexo
            FROM Pacientes
            WHERE {' AND '.join(condiciones)}
            ORDER BY Apellidos, Nombre
        """
        
        resultados = self.db.ejecutar_query(sql, tuple(params))
        
        pacientes = []
        for row in resultados:
            pacientes.append({
                'IdPac': row.IdPac,
                'NumPac': row.NumPac,
                'Nombre': row.Nombre,
                'Apellidos': row.Apellidos,
                'TelMovil': row.TelMovil,
                'Email': row.Email,
                'FecNacim': row.FecNacim,
                'Sexo': row.Sexo
            })
        
        return pacientes
    
    def obtener_paciente_por_id(self, id_pac: int) -> Optional[Dict]:
        """Obtiene un paciente por su ID interno"""
        sql = """
            SELECT 
                IdPac, NumPac, Nombre, Apellidos, 
                TelMovil, Tel1, Email, FecNacim, Sexo,
                Direccion, CP, IdCli
            FROM Pacientes
            WHERE IdPac = ?
        """
        
        resultados = self.db.ejecutar_query(sql, (id_pac,))
        
        if resultados:
            row = resultados[0]
            return {
                'IdPac': row.IdPac,
                'NumPac': row.NumPac,
                'Nombre': row.Nombre,
                'Apellidos': row.Apellidos,
                'TelMovil': row.TelMovil,
                'Tel1': row.Tel1,
                'Email': row.Email,
                'FecNacim': row.FecNacim,
                'Sexo': row.Sexo,
                'Direccion': row.Direccion,
                'CP': row.CP,
                'IdCli': row.IdCli
            }
        
        return None
    
    def obtener_paciente_por_numpac(self, num_pac: int) -> Optional[Dict]:
        """Obtiene un paciente por su NumPac (número visible)"""
        sql = """
            SELECT 
                IdPac, NumPac, Nombre, Apellidos, 
                TelMovil, Tel1, Email, FecNacim, Sexo,
                Direccion, CP, IdCli
            FROM Pacientes
            WHERE NumPac = ?
        """
        
        resultados = self.db.ejecutar_query(sql, (num_pac,))
        
        if resultados:
            row = resultados[0]
            return {
                'IdPac': row.IdPac,
                'NumPac': row.NumPac,
                'Nombre': row.Nombre,
                'Apellidos': row.Apellidos,
                'TelMovil': row.TelMovil,
                'Tel1': row.Tel1,
                'Email': row.Email,
                'FecNacim': row.FecNacim,
                'Sexo': row.Sexo,
                'Direccion': row.Direccion,
                'CP': row.CP,
                'IdCli': row.IdCli
            }
        
        return None

# =====================================================
# GESTOR DE CITAS
# =====================================================

class GestorCitas:
    """Gestiona operaciones con citas"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def listar_citas_fecha(self, fecha: datetime, id_usuario: int = None) -> List[Dict]:
        """Lista citas de una fecha específica"""
        fecha_gesden = ConversorFechas.datetime_a_fecha_gesden(fecha)
        
        sql = """
            SELECT 
                c.IdCita, c.IdPac, c.Fecha, c.Hora, c.Duracion,
                c.Texto, c.NUMPAC, c.Contacto, c.IdSitC,
                p.Nombre, p.Apellidos
            FROM DCitas c
            LEFT JOIN Pacientes p ON c.IdPac = p.IdPac
            WHERE c.Fecha = ?
        """
        
        params = [fecha_gesden]
        
        if id_usuario:
            sql += " AND c.IdUsu = ?"
            params.append(id_usuario)
        
        sql += " ORDER BY c.Hora"
        
        resultados = self.db.ejecutar_query(sql, tuple(params))
        
        citas = []
        for row in resultados:
            fecha_dt = ConversorFechas.fecha_gesden_a_datetime(row.Fecha)
            hora_str = ConversorFechas.hora_gesden_a_str(row.Hora)
            
            citas.append({
                'IdCita': row.IdCita,
                'IdPac': row.IdPac,
                'Fecha': fecha_dt.strftime('%Y-%m-%d'),
                'Hora': hora_str,
                'Duracion': row.Duracion,
                'Texto': row.Texto,
                'NumPac': row.NUMPAC,
                'Paciente': f"{row.Apellidos or ''} {row.Nombre or ''}".strip(),
                'Telefono': row.Contacto,
                'Estado': row.IdSitC
            })
        
        return citas
    
    def crear_cita(self, id_pac: int, fecha: datetime, hora_str: str,
                   duracion: int = 30, texto: str = "", id_usuario: int = 3) -> int:
        """Crea una nueva cita"""
        
        # Obtener datos del paciente
        paciente = self.db.ejecutar_query(
            "SELECT NumPac, Nombre, Apellidos, TelMovil FROM Pacientes WHERE IdPac = ?",
            (id_pac,)
        )
        
        if not paciente:
            raise ValueError(f"Paciente con ID {id_pac} no encontrado")
        
        pac = paciente[0]
        
        # Convertir fecha y hora
        fecha_gesden = ConversorFechas.datetime_a_fecha_gesden(fecha)
        hora_gesden = ConversorFechas.str_a_hora_gesden(hora_str)
        
        # Obtener siguiente IdOrden
        result = self.db.ejecutar_query(
            "SELECT ISNULL(MAX(IdOrden), 0) + 1 AS NextId FROM DCitas WHERE IdUsu = ? AND Fecha = ?",
            (id_usuario, fecha_gesden)
        )
        id_orden = result[0].NextId
        
        # Insertar cita
        sql = """
            INSERT INTO DCitas (
                IdUsu, IdOrden, Fecha, Hora, Duracion, IdSitC,
                Texto, IdPac, NUMPAC, Contacto, FecAlta,
                Recordada, Confirmada, TipoDocIdent, IdOrigenIns,
                IdCentro
            ) VALUES (
                ?, ?, ?, ?, ?, 1,
                ?, ?, ?, ?, GETDATE(),
                0, 0, 0, 0,
                ?
            )
        """
        
        self.db.ejecutar_query(
            sql,
            (id_usuario, id_orden, fecha_gesden, hora_gesden, duracion,
             texto, id_pac, pac.NumPac, pac.TelMovil, ConfigGesden.ID_CENTRO),
            commit=True
        )
        
        # Obtener ID de la cita creada
        result = self.db.ejecutar_query(
            "SELECT MAX(IdCita) AS IdCita FROM DCitas WHERE IdUsu = ? AND IdOrden = ? AND Fecha = ?",
            (id_usuario, id_orden, fecha_gesden)
        )
        
        id_cita = result[0].IdCita
        
        logging.info(f"✅ Cita creada: ID={id_cita}, Paciente={pac.Nombre} {pac.Apellidos}")
        
        return id_cita

# =====================================================
# GESTOR DE COLABORADORES
# =====================================================

class GestorColaboradores:
    """Gestiona operaciones con colaboradores/doctores"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def listar_activos(self) -> List[Dict]:
        """Lista todos los colaboradores activos"""
        sql = """
            SELECT 
                IdCol, Codigo, Alias, Nombre, Apellidos,
                TelMovil, Email
            FROM TColabos
            WHERE Activo = 'S'
            ORDER BY Apellidos, Nombre
        """
        
        resultados = self.db.ejecutar_query(sql)
        
        colaboradores = []
        for row in resultados:
            colaboradores.append({
                'IdCol': row.IdCol,
                'Codigo': row.Codigo,
                'Alias': row.Alias,
                'Nombre': row.Nombre,
                'Apellidos': row.Apellidos,
                'NombreCompleto': f"{row.Apellidos or ''} {row.Nombre or ''}".strip(),
                'TelMovil': row.TelMovil,
                'Email': row.Email
            })
        
        return colaboradores
    
    def obtener_por_id(self, id_col: int) -> Optional[Dict]:
        """Obtiene un colaborador por ID"""
        sql = """
            SELECT 
                IdCol, Codigo, Alias, Nombre, Apellidos
            FROM TColabos
            WHERE IdCol = ?
        """
        
        resultados = self.db.ejecutar_query(sql, (id_col,))
        
        if resultados:
            row = resultados[0]
            return {
                'IdCol': row.IdCol,
                'Codigo': row.Codigo,
                'Alias': row.Alias,
                'Nombre': row.Nombre,
                'Apellidos': row.Apellidos,
                'NombreCompleto': f"{row.Apellidos} {row.Nombre}"
            }
        
        return None
    
    def colaborador_con_citas_hoy(self) -> Optional[int]:
        """Obtiene el ID del colaborador que tiene citas hoy"""
        fecha_hoy = ConversorFechas.datetime_a_fecha_gesden(datetime.now())
        
        sql = """
            SELECT TOP 1 IdUsu
            FROM DCitas
            WHERE Fecha = ?
            ORDER BY Hora
        """
        
        resultados = self.db.ejecutar_query(sql, (fecha_hoy,))
        
        if resultados:
            return resultados[0].IdUsu
        
        return None

# =====================================================
# GESTOR DE TRATAMIENTOS (CATÁLOGO)
# =====================================================

class GestorTratamientos:
    """Gestiona el catálogo de tratamientos"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def buscar(self, texto: str, limit: int = 20) -> List[Dict]:
        """Busca tratamientos en el catálogo"""
        # Buscar en tabla Tratamientos
        sql = """
            SELECT TOP ?
                IdTratamiento AS IdTto,
                Codigo,
                Descrip AS Descripcion,
                Precio AS Importe
            FROM Tratamientos
            WHERE Descrip LIKE ? OR Codigo LIKE ?
            ORDER BY Descrip
        """
        
        resultados = self.db.ejecutar_query(
            sql,
            (limit, f"%{texto}%", f"%{texto}%")
        )
        
        tratamientos = []
        for row in resultados:
            tratamientos.append({
                'IdTto': row.IdTto,
                'Codigo': row.Codigo,
                'Descripcion': row.Descripcion,
                'Importe': float(row.Importe) if row.Importe else 0.0
            })
        
        return tratamientos
    
    def obtener_por_id(self, id_tto: int) -> Optional[Dict]:
        """Obtiene un tratamiento por ID"""
        sql = """
            SELECT 
                IdTratamiento AS IdTto,
                Codigo,
                Descrip AS Descripcion,
                Precio AS Importe
            FROM Tratamientos
            WHERE IdTratamiento = ?
        """
        
        resultados = self.db.ejecutar_query(sql, (id_tto,))
        
        if resultados:
            row = resultados[0]
            return {
                'IdTto': row.IdTto,
                'Codigo': row.Codigo,
                'Descripcion': row.Descripcion,
                'Importe': float(row.Importe) if row.Importe else 0.0
            }
        
        return None

# =====================================================
# GESTOR DE ACTOS MÉDICOS
# =====================================================

class GestorActosMedicos:
    """Gestiona actos médicos/tratamientos realizados"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def crear_acto(self, id_pac: int, id_col: int, id_tto: int,
                   piezas: str = None, notas: str = "", 
                   importe: float = 0.0) -> int:
        """
        Crea un acto médico/tratamiento realizado
        
        Args:
            id_pac: ID del paciente
            id_col: ID del colaborador (OBLIGATORIO)
            id_tto: ID del tratamiento del catálogo
            piezas: Piezas dentales (ej: "26" o "11.12.45")
            notas: Notas del tratamiento
            importe: Importe del acto
        
        Returns:
            NumTto: Número del tratamiento creado
        """
        
        # Obtener siguiente NumTto para este paciente
        result = self.db.ejecutar_query(
            "SELECT ISNULL(MAX(NumTto), 0) + 1 AS NextNum FROM TtosMed WHERE IdPac = ?",
            (id_pac,)
        )
        num_tto = result[0].NextNum
        
        # Convertir piezas a formato numérico si se proporcionan
        piezas_num = None
        if piezas:
            # Formato: "11.12.45" -> convertir a número
            piezas_num = piezas.replace(".", "")
        
        # Insertar acto médico
        sql = """
            INSERT INTO TtosMed (
                IdPac, NumTto, IdTto, StaTto, FecIni,
                IdCol, Notas, Importe, PiezasNum, Pendiente,
                IdCentro, _fechareg, _version
            ) VALUES (
                ?, ?, ?, 7, GETDATE(),
                ?, ?, ?, ?, ?,
                ?, GETDATE(), 1
            )
        """
        
        self.db.ejecutar_query(
            sql,
            (id_pac, num_tto, id_tto, id_col, notas, importe, 
             piezas_num, importe, ConfigGesden.ID_CENTRO),
            commit=True
        )
        
        logging.info(f"✅ Acto médico creado: Paciente={id_pac}, NumTto={num_tto}, IdTto={id_tto}")
        
        return num_tto
    
    def listar_por_paciente(self, id_pac: int) -> List[Dict]:
        """Lista todos los tratamientos de un paciente"""
        sql = """
            SELECT 
                tm.NumTto, tm.IdTto, tm.FecIni, tm.Notas,
                tm.Importe, tm.StaTto, tm.PiezasNum,
                t.Descrip AS Tratamiento
            FROM TtosMed tm
            LEFT JOIN Tratamientos t ON tm.IdTto = t.IdTratamiento
            WHERE tm.IdPac = ?
            ORDER BY tm.FecIni DESC
        """
        
        resultados = self.db.ejecutar_query(sql, (id_pac,))
        
        tratamientos = []
        for row in resultados:
            tratamientos.append({
                'NumTto': row.NumTto,
                'IdTto': row.IdTto,
                'Tratamiento': row.Tratamiento,
                'FecIni': row.FecIni,
                'Notas': row.Notas,
                'Importe': float(row.Importe) if row.Importe else 0.0,
                'Estado': row.StaTto,
                'Piezas': row.PiezasNum
            })
        
        return tratamientos

# =====================================================
# GESTOR DE PRESUPUESTOS
# =====================================================

class GestorPresupuestos:
    """Gestiona presupuestos"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def crear_presupuesto(self, id_pac: int, id_col: int, 
                          titulo: str = "", tratamientos: List[Dict] = None) -> Dict:
        """
        Crea un presupuesto
        
        Args:
            id_pac: ID del paciente
            id_col: ID del colaborador (OBLIGATORIO)
            titulo: Título del presupuesto
            tratamientos: Lista de dict con {id_tto, piezas, unidades, notas}
        
        Returns:
            Dict con IdPac, NumSerie, NumPre
        """
        
        # Obtener siguiente NumPre para este paciente
        result = self.db.ejecutar_query(
            """
            SELECT ISNULL(MAX(NumPre), 0) + 1 AS NextNum 
            FROM Presu 
            WHERE IdPac = ? AND NumSerie = 0
            """,
            (id_pac,)
        )
        num_pre = result[0].NextNum
        num_serie = 0
        
        # Insertar cabecera del presupuesto
        sql_presu = """
            INSERT INTO Presu (
                IdPac, NumSerie, NumPre, Titulo, FecPresup,
                IdCol, IdCentro, _fechareg, _version
            ) VALUES (
                ?, ?, ?, ?, GETDATE(),
                ?, ?, GETDATE(), 1
            )
        """
        
        self.db.ejecutar_query(
            sql_presu,
            (id_pac, num_serie, num_pre, titulo, id_col, ConfigGesden.ID_CENTRO),
            commit=True
        )
        
        # Si hay tratamientos, añadirlos
        if tratamientos:
            for idx, tto in enumerate(tratamientos, 1):
                self._añadir_linea_presupuesto(
                    id_pac, num_serie, num_pre, idx,
                    tto.get('id_tto'),
                    tto.get('piezas'),
                    tto.get('unidades', 1),
                    tto.get('notas', ''),
                    id_col
                )
        
        logging.info(f"✅ Presupuesto creado: Paciente={id_pac}, NumPre={num_pre}")
        
        return {
            'IdPac': id_pac,
            'NumSerie': num_serie,
            'NumPre': num_pre
        }
    
    def _añadir_linea_presupuesto(self, id_pac: int, num_serie: int, num_pre: int,
                                   lin_pre: int, id_tto: int, piezas: str = None,
                                   unidades: int = 1, notas: str = "", id_col: int = None):
        """Añade una línea de tratamiento al presupuesto"""
        
        # Obtener precio del tratamiento
        tratamiento = self.db.ejecutar_query(
            "SELECT Precio FROM Tratamientos WHERE IdTratamiento = ?",
            (id_tto,)
        )
        
        importe = float(tratamiento[0].Precio) if tratamiento and tratamiento[0].Precio else 0.0
        importe_total = importe * unidades
        
        # Convertir piezas
        piezas_num = None
        if piezas:
            piezas_num = piezas.replace(".", "")
        
        # Insertar línea
        sql = """
            INSERT INTO PresuTto (
                IdPac, NumSerie, NumPre, LinPre, IdTto,
                Unidades, ImportePre, ImporteUni, Notas,
                PiezasNum, IdCol, _version
            ) VALUES (
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, 1
            )
        """
        
        self.db.ejecutar_query(
            sql,
            (id_pac, num_serie, num_pre, lin_pre, id_tto,
             unidades, importe_total, importe, notas,
             piezas_num, id_col),
            commit=True
        )
    
    def listar_por_paciente(self, id_pac: int) -> List[Dict]:
        """Lista presupuestos de un paciente"""
        sql = """
            SELECT 
                p.NumSerie, p.NumPre, p.Titulo, p.FecPresup,
                p.FecAcepta, co.Nombre + ' ' + co.Apellidos AS Colaborador
            FROM Presu p
            LEFT JOIN TColabos co ON p.IdCol = co.IdCol
            WHERE p.IdPac = ?
            ORDER BY p.FecPresup DESC
        """
        
        resultados = self.db.ejecutar_query(sql, (id_pac,))
        
        presupuestos = []
        for row in resultados:
            presupuestos.append({
                'NumSerie': row.NumSerie,
                'NumPre': row.NumPre,
                'Titulo': row.Titulo,
                'FecPresup': row.FecPresup,
                'FecAcepta': row.FecAcepta,
                'Colaborador': row.Colaborador
            })
        
        return presupuestos

# =====================================================
# GESTOR DE DEUDA
# =====================================================

class GestorDeuda:
    """Gestiona consultas de deuda de pacientes"""
    
    def __init__(self, db: ConexionGesden):
        self.db = db
    
    def consultar_deuda_paciente(self, id_pac: int) -> Dict:
        """Consulta la deuda pendiente de un paciente"""
        
        # Obtener IdCli del paciente
        paciente = self.db.ejecutar_query(
            "SELECT IdCli FROM Pacientes WHERE IdPac = ?",
            (id_pac,)
        )
        
        if not paciente or not paciente[0].IdCli:
            return {
                'total_deuda': 0.0,
                'deudas': []
            }
        
        id_cli = paciente[0].IdCli
        
        # Consultar deudas pendientes
        sql = """
            SELECT 
                IdDeudaCli, FecPlazo, Adeudo, Pendiente,
                NFactura, Liquidado
            FROM DeudaCli
            WHERE IdCli = ? AND Liquidado = 0
            ORDER BY FecPlazo
        """
        
        resultados = self.db.ejecutar_query(sql, (id_cli,))
        
        deudas = []
        total = 0.0
        
        for row in resultados:
            pendiente = float(row.Pendiente) if row.Pendiente else 0.0
            total += pendiente
            
            deudas.append({
                'IdDeudaCli': row.IdDeudaCli,
                'FecPlazo': row.FecPlazo,
                'Adeudo': float(row.Adeudo) if row.Adeudo else 0.0,
                'Pendiente': pendiente,
                'NFactura': row.NFactura
            })
        
        return {
            'total_deuda': total,
            'deudas': deudas
        }

# =====================================================
# MOTOR DE INTELIGENCIA ARTIFICIAL
# =====================================================

class MotorIA:
    """Motor de IA usando Claude API para procesar lenguaje natural"""
    
    def __init__(self):
        self.api_key = ConfigGesden.ANTHROPIC_API_KEY
        self.historial = []
        
        if self.api_key:
            try:
                import anthropic
                self.client = anthropic.Anthropic(api_key=self.api_key)
                self.disponible = True
                logging.info("✅ Motor IA activado con Claude API")
                print("🤖 Motor IA activado - Modo inteligente")
            except ImportError:
                logging.warning("⚠️ Instala anthropic: pip install anthropic")
                self.disponible = False
                print("⚠️ Motor IA desactivado - Instala: pip install anthropic")
            except Exception as e:
                logging.error(f"❌ Error al iniciar Motor IA: {e}")
                self.disponible = False
                print(f"⚠️ Motor IA desactivado - Error: {e}")
        else:
            self.disponible = False
            logging.info("💡 Motor IA desactivado - Configura ANTHROPIC_API_KEY para activar")
            print("💡 Motor IA desactivado - Modo básico (sin API)")
    
    def get_system_prompt(self) -> str:
        """Genera el prompt de sistema con contexto actualizado"""
        
        fecha_hoy = datetime.now()
        dias_semana_es = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
        dia_actual = dias_semana_es[fecha_hoy.weekday()]
        
        return f"""Eres un asistente inteligente para una clínica dental que usa el software Gesden.

CONTEXTO TEMPORAL:
- Fecha de hoy: {fecha_hoy.strftime('%d/%m/%Y')}
- Día de la semana: {dia_actual}

Tu función es interpretar peticiones en lenguaje natural y convertirlas en acciones estructuradas.

ACCIONES DISPONIBLES:

1. buscar_paciente
   - Buscar por nombre, apellidos o número de paciente (NumPac)
   - Parámetros: busqueda (string)

2. crear_paciente
   - Crear un nuevo paciente
   - Parámetros: (se pedirán interactivamente)

3. crear_cita
   - Crear una cita para un paciente
   - Parámetros: nombre_paciente, fecha, hora

4. listar_citas
   - Ver citas de una fecha específica
   - Parámetros: fecha ("hoy", "mañana", o fecha específica)

5. listar_colaboradores
   - Mostrar lista de doctores/colaboradores activos
   - Parámetros: ninguno

6. buscar_tratamiento
   - Buscar en catálogo de tratamientos odontológicos
   - Parámetros: busqueda

7. consultar_deuda
   - Ver deuda pendiente de un paciente
   - Parámetros: nombre_paciente

IMPORTANTE - MANEJO DE FECHAS:
- "hoy" = {fecha_hoy.strftime('%d/%m/%Y')}
- "mañana" = {(fecha_hoy + timedelta(days=1)).strftime('%d/%m/%Y')}
- "próximo lunes", "martes que viene", etc. = calcula la próxima ocurrencia de ese día
- Si mencionan una fecha como "15/12/2025" o "15 de diciembre", úsala directamente

IMPORTANTE - MANEJO DE HORAS:
- Formatos válidos: "10:30", "10h", "10.30h", "las 10", "10 de la mañana"
- Normaliza siempre a formato "HH:MM" (ej: "10:30")

FORMATO DE RESPUESTA:
Responde SIEMPRE en formato JSON válido:

{{
    "accion": "nombre_de_accion",
    "parametros": {{
        "param1": "valor1"
    }},
    "mensaje": "Mensaje amigable para el usuario"
}}

EJEMPLOS:

Usuario: "busca a Juan García"
{{
    "accion": "buscar_paciente",
    "parametros": {{
        "busqueda": "Juan García"
    }},
    "mensaje": "Buscando paciente Juan García..."
}}

Usuario: "crea cita para María López el próximo lunes a las 11.30h"
{{
    "accion": "crear_cita",
    "parametros": {{
        "nombre_paciente": "María López",
        "fecha": "{self._calcular_proximo_dia('lunes').strftime('%d/%m/%Y')}",
        "hora": "11:30"
    }},
    "mensaje": "Creando cita para María López el lunes {self._calcular_proximo_dia('lunes').strftime('%d/%m/%Y')} a las 11:30"
}}

Usuario: "qué citas tengo hoy"
{{
    "accion": "listar_citas",
    "parametros": {{
        "fecha": "hoy"
    }},
    "mensaje": "Consultando citas de hoy..."
}}

Usuario: "lista de doctores"
{{
    "accion": "listar_colaboradores",
    "parametros": {{}},
    "mensaje": "Mostrando lista de colaboradores activos..."
}}

Usuario: "cuánto debe Juan Pérez"
{{
    "accion": "consultar_deuda",
    "parametros": {{
        "nombre_paciente": "Juan Pérez"
    }},
    "mensaje": "Consultando deuda de Juan Pérez..."
}}

IMPORTANTE:
- Si no entiendes la petición, usa accion: "desconocida"
- Sé flexible con las variaciones del lenguaje
- Extrae la información clave de forma inteligente
- NO inventes datos, si falta información usa accion: "necesita_aclaracion"
"""
    
    def _calcular_proximo_dia(self, dia_nombre: str) -> datetime:
        """Calcula la fecha del próximo día de la semana especificado"""
        dias_map = {
            'lunes': 0, 'martes': 1, 'miercoles': 2, 'miércoles': 2,
            'jueves': 3, 'viernes': 4, 'sabado': 5, 'sábado': 5, 'domingo': 6
        }
        
        hoy = datetime.now()
        dia_objetivo = dias_map.get(dia_nombre.lower(), 0)
        dias_hasta = (dia_objetivo - hoy.weekday()) % 7
        
        if dias_hasta == 0:
            dias_hasta = 7
        
        return hoy + timedelta(days=dias_hasta)
    
    def procesar(self, texto_usuario: str) -> Dict:
        """Procesa una petición usando IA o fallback"""
        
        if self.disponible:
            return self._procesar_con_ia(texto_usuario)
        else:
            return self._procesar_fallback(texto_usuario)
    
    def _procesar_con_ia(self, texto_usuario: str) -> Dict:
        """Procesa con Claude API"""
        
        try:
            # Preparar mensajes
            mensajes = self.historial + [{
                "role": "user",
                "content": texto_usuario
            }]
            
            # Llamar a Claude
            response = self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2000,
                system=self.get_system_prompt(),
                messages=mensajes
            )
            
            # Extraer respuesta
            respuesta_texto = response.content[0].text.strip()
            
            # Limpiar markdown si existe
            respuesta_texto = respuesta_texto.replace("```json", "").replace("```", "").strip()
            
            # Parsear JSON
            resultado = json.loads(respuesta_texto)
            
            # Actualizar historial
            self.historial.append({"role": "user", "content": texto_usuario})
            self.historial.append({"role": "assistant", "content": respuesta_texto})
            
            # Mantener historial limitado (últimas 10 interacciones)
            if len(self.historial) > 20:
                self.historial = self.historial[-20:]
            
            logging.info(f"✅ IA procesó: {resultado.get('accion', 'desconocida')}")
            
            return resultado
        
        except json.JSONDecodeError as e:
            logging.error(f"❌ Error parseando JSON de IA: {e}")
            logging.error(f"Respuesta: {respuesta_texto}")
            return {
                "accion": "desconocida",
                "parametros": {},
                "mensaje": "Lo siento, hubo un error procesando tu petición."
            }
        
        except Exception as e:
            logging.error(f"❌ Error en Motor IA: {e}")
            return self._procesar_fallback(texto_usuario)
    
    def _procesar_fallback(self, texto: str) -> Dict:
        """Procesamiento básico sin IA (fallback)"""
        
        texto_lower = texto.lower()
        
        # Buscar paciente
        if any(word in texto_lower for word in ['busca', 'buscar', 'encuentra', 'encontrar', 'paciente']):
            match = re.search(r'(?:busca|buscar|encuentra|encontrar|paciente)\s+(?:a\s+|paciente\s+)?(.+)', texto, re.IGNORECASE)
            if match:
                busqueda = match.group(1).strip()
                # Limpiar palabras extras
                busqueda = busqueda.replace(' para ', ' ').replace(' el ', ' ').strip()
                return {
                    "accion": "buscar_paciente",
                    "parametros": {"busqueda": busqueda},
                    "mensaje": f"Buscando: {busqueda}"
                }
        
        # Listar citas
        if any(word in texto_lower for word in ['lista', 'listar', 'mostrar', 'ver']) and 'cita' in texto_lower:
            if 'hoy' in texto_lower:
                fecha = "hoy"
            elif 'mañana' in texto_lower or 'manana' in texto_lower:
                fecha = "mañana"
            else:
                fecha = "hoy"
            
            return {
                "accion": "listar_citas",
                "parametros": {"fecha": fecha},
                "mensaje": f"Mostrando citas de {fecha}..."
            }
        
        # Crear cita
        if any(word in texto_lower for word in ['crea', 'crear', 'nueva', 'agendar', 'agenda']) and 'cita' in texto_lower:
            return {
                "accion": "ayuda",
                "parametros": {},
                "mensaje": "Para crear una cita necesito: nombre del paciente, fecha y hora.\nEjemplo: 'crear cita para Juan García el próximo lunes a las 10:30'"
            }
        
        # Colaboradores
        if any(word in texto_lower for word in ['colaborador', 'doctor', 'doctores', 'médico']):
            return {
                "accion": "listar_colaboradores",
                "parametros": {},
                "mensaje": "Mostrando colaboradores..."
            }
        
        # No entendido
        return {
            "accion": "desconocida",
            "parametros": {},
            "mensaje": "No entendí tu petición. Intenta reformularla o escribe 'ayuda'"
        }

# =====================================================
# AGENTE PRINCIPAL
# =====================================================

class AgenteGesdenIA:
    """Agente principal que coordina todas las operaciones"""
    
    def __init__(self):
        print("🚀 Iniciando Agente Gesden IA v4.0...")
        
        self.db = ConexionGesden()
        self.pacientes = GestorPacientes(self.db)
        self.citas = GestorCitas(self.db)
        self.colaboradores = GestorColaboradores(self.db)
        self.tratamientos = GestorTratamientos(self.db)
        self.actos = GestorActosMedicos(self.db)
        self.presupuestos = GestorPresupuestos(self.db)
        self.deuda = GestorDeuda(self.db)
        self.ia = MotorIA()  # Motor de IA en lugar de regex
        
        print("✅ Agente iniciado correctamente\n")
    
    def procesar_comando(self, comando: str) -> str:
        """Procesa un comando usando IA"""
        
        print(f"\n💬 '{comando}'")
        
        # Usar el motor de IA para interpretar
        resultado_ia = self.ia.procesar(comando)
        
        accion = resultado_ia.get('accion', 'desconocida')
        params = resultado_ia.get('parametros', {})
        mensaje_ia = resultado_ia.get('mensaje', '')
        
        # Mostrar mensaje de la IA si existe
        if mensaje_ia:
            print(f"🤖 {mensaje_ia}")
        
        try:
            if accion == 'crear_paciente':
                return self._cmd_crear_paciente(params)
            
            elif accion == 'crear_cita':
                return self._cmd_crear_cita_ia(params)
            
            elif accion == 'listar_citas':
                return self._cmd_listar_citas_ia(params)
            
            elif accion == 'buscar_paciente':
                return self._cmd_buscar_paciente_ia(params)
            
            elif accion == 'listar_colaboradores':
                return self._cmd_listar_colaboradores(params)
            
            elif accion == 'buscar_tratamiento':
                return self._cmd_buscar_tratamiento(params)
            
            elif accion == 'consultar_deuda':
                return self._cmd_consultar_deuda_ia(params)
            
            elif accion == 'ayuda':
                return self._mostrar_ayuda()
            
            else:
                return self._mostrar_ayuda()
        
        except Exception as e:
            logging.error(f"Error procesando comando: {str(e)}")
            return f"❌ Error: {str(e)}"
    
    def _cmd_crear_paciente(self, params: Dict) -> str:
        """Comando: Crear paciente nuevo"""
        
        print(f"\n📝 Para crear un paciente necesito:")
        print(f"   1. Nombre")
        print(f"   2. Apellidos")
        print(f"   3. Fecha de nacimiento (DD/MM/YYYY)")
        print(f"   4. Teléfono móvil")
        print(f"\n💡 Ejemplo: crear paciente Juan García Pérez 15/03/1985 666123456\n")
        
        # Pedir datos interactivamente
        nombre = input("👤 Nombre: ").strip()
        apellidos = input("👤 Apellidos: ").strip()
        fecha_nac_str = input("📅 Fecha nacimiento (DD/MM/YYYY): ").strip()
        telefono = input("📱 Teléfono móvil: ").strip()
        
        # Parsear fecha
        try:
            fecha_nac = datetime.strptime(fecha_nac_str, '%d/%m/%Y')
        except:
            return "❌ Formato de fecha incorrecto. Usa DD/MM/YYYY"
        
        # Confirmar
        print(f"\n📋 Datos a registrar:")
        print(f"   Nombre: {nombre.upper()}")
        print(f"   Apellidos: {apellidos.upper()}")
        print(f"   F. Nacimiento: {fecha_nac.strftime('%d/%m/%Y')}")
        print(f"   Teléfono: {telefono}")
        
        confirmacion = input("\n¿Crear paciente? (s/n): ").lower()
        if confirmacion != 's':
            return "❌ Operación cancelada"
        
        # Crear paciente
        paciente = self.pacientes.crear_paciente(
            nombre=nombre,
            apellidos=apellidos,
            fecha_nacimiento=fecha_nac,
            telefono_movil=telefono
        )
        
        return f"✅ Paciente creado exitosamente\n" \
               f"🆔 ID: {paciente['IdPac']}\n" \
               f"📋 Número: {paciente['NumPac']}\n" \
               f"👤 {paciente['Nombre']} {paciente['Apellidos']}"
    
    def _cmd_crear_cita(self, params: Dict) -> str:
        """Comando: Crear cita"""
        
        nombre_completo = params.get('nombre_completo', '')
        fecha_texto = params.get('fecha_texto', '')
        hora = params.get('hora', '10:00')
        
        # Buscar paciente
        partes = nombre_completo.split()
        nombre = partes[0] if partes else ""
        apellidos = " ".join(partes[1:]) if len(partes) > 1 else ""
        
        pacientes = self.pacientes.buscar_paciente(nombre=nombre, apellidos=apellidos)
        
        if not pacientes:
            return f"❌ No encontré paciente '{nombre_completo}'"
        
        if len(pacientes) > 1:
            resultado = "🔍 Encontré varios pacientes:\n"
            for i, pac in enumerate(pacientes, 1):
                resultado += f"  {i}. {pac['Apellidos']} {pac['Nombre']} - NumPac: {pac['NumPac']}\n"
            return resultado + "\n⚠️ Especifica mejor el nombre"
        
        paciente = pacientes[0]
        
        # Extraer fecha
        fecha = self.nlp.extraer_fecha(fecha_texto)
        if not fecha:
            return f"❌ No entendí la fecha '{fecha_texto}'"
        
        # Crear cita
        id_cita = self.citas.crear_cita(
            id_pac=paciente['IdPac'],
            fecha=fecha,
            hora_str=hora,
            duracion=30,
            texto="Cita creada por IA"
        )
        
        return f"✅ Cita creada para {paciente['Apellidos']} {paciente['Nombre']}\n" \
               f"📅 {fecha.strftime('%d/%m/%Y')} a las {hora}\n" \
               f"🆔 ID Cita: {id_cita}"
    
    def _cmd_listar_citas(self, params: Dict) -> str:
        """Comando: Listar citas"""
        
        cuando = params.get('cuando', 'hoy')
        fecha = self.nlp.extraer_fecha(cuando)
        
        if not fecha:
            return f"❌ No entendí '{cuando}'"
        
        citas = self.citas.listar_citas_fecha(fecha)
        
        if not citas:
            return f"📅 No hay citas para el {fecha.strftime('%d/%m/%Y')}"
        
        resultado = f"📅 Citas del {fecha.strftime('%d/%m/%Y')}:\n\n"
        
        for cita in citas:
            resultado += f"🕐 {cita['Hora']} - {cita['Paciente']}\n"
            resultado += f"   📝 {cita['Texto'] or 'Sin descripción'}\n"
            resultado += f"   ⏱️ {cita['Duracion']} min | 🆔 {cita['IdCita']}\n\n"
        
        return resultado
    
    def _cmd_buscar_paciente(self, params: Dict) -> str:
        """Comando: Buscar paciente"""
        
        nombre_completo = params.get('nombre', '').strip()
        
        # Si es un número, buscar por NumPac directamente
        if nombre_completo.isdigit():
            paciente = self.pacientes.obtener_paciente_por_numpac(int(nombre_completo))
            if paciente:
                return f"🔍 Encontrado:\n\n" \
                       f"👤 {paciente['Apellidos']} {paciente['Nombre']}\n" \
                       f"   🆔 NumPac: {paciente['NumPac']}\n" \
                       f"   📱 {paciente['TelMovil'] or 'Sin teléfono'}\n" \
                       f"   🎂 {paciente['FecNacim'].strftime('%d/%m/%Y') if paciente['FecNacim'] else 'N/A'}\n"
            else:
                return f"❌ No encontré paciente con NumPac '{nombre_completo}'"
        
        # Dividir en palabras
        partes = nombre_completo.split()
        
        # Si solo hay UNA palabra, buscar en NOMBRE O APELLIDOS
        if len(partes) == 1:
            palabra = partes[0]
            # Buscar primero por apellidos
            pacientes = self.pacientes.buscar_paciente(apellidos=palabra)
            # Si no encuentra, buscar por nombre
            if not pacientes:
                pacientes = self.pacientes.buscar_paciente(nombre=palabra)
        else:
            # Si hay varias palabras, dividir en nombre y apellidos
            nombre = partes[0]
            apellidos = " ".join(partes[1:])
            pacientes = self.pacientes.buscar_paciente(nombre=nombre, apellidos=apellidos)
        
        if not pacientes:
            return f"❌ No encontré pacientes con '{nombre_completo}'"
        
        resultado = f"🔍 Encontré {len(pacientes)} paciente(s):\n\n"
        
        for pac in pacientes:
            resultado += f"👤 {pac['Apellidos']} {pac['Nombre']}\n"
            resultado += f"   🆔 NumPac: {pac['NumPac']}\n"
            resultado += f"   📱 {pac['TelMovil'] or 'Sin teléfono'}\n"
            if pac['FecNacim']:
                resultado += f"   🎂 {pac['FecNacim'].strftime('%d/%m/%Y')}\n"
            resultado += "\n"
        
        return resultado
    
    def _cmd_buscar_paciente_ia(self, params: Dict) -> str:
        """Comando: Buscar paciente (versión optimizada para IA)"""
        busqueda = params.get('busqueda', '').strip()
        
        if not busqueda:
            return "❌ Necesito un nombre, apellido o número de paciente para buscar"
        
        # Reutilizar lógica existente
        return self._cmd_buscar_paciente({'nombre': busqueda})
    
    def _cmd_crear_cita_ia(self, params: Dict) -> str:
        """Comando: Crear cita (versión optimizada para IA)"""
        
        nombre_paciente = params.get('nombre_paciente', '')
        fecha_str = params.get('fecha', '')
        hora_str = params.get('hora', '10:00')
        
        if not nombre_paciente:
            return "❌ Necesito el nombre del paciente"
        
        # Parsear fecha
        fecha = self._parsear_fecha_ia(fecha_str)
        if not fecha:
            return f"❌ No pude entender la fecha '{fecha_str}'"
        
        # Buscar paciente
        partes = nombre_paciente.split()
        if len(partes) == 1:
            pacientes = self.pacientes.buscar_paciente(apellidos=partes[0])
            if not pacientes:
                pacientes = self.pacientes.buscar_paciente(nombre=partes[0])
        else:
            nombre = partes[0]
            apellidos = " ".join(partes[1:])
            pacientes = self.pacientes.buscar_paciente(nombre=nombre, apellidos=apellidos)
        
        if not pacientes:
            return f"❌ No encontré paciente '{nombre_paciente}'"
        
        if len(pacientes) > 1:
            resultado = "🔍 Encontré varios pacientes:\n"
            for i, pac in enumerate(pacientes, 1):
                resultado += f"  {i}. {pac['Apellidos']} {pac['Nombre']} - NumPac: {pac['NumPac']}\n"
            return resultado + "\n⚠️ Por favor especifica mejor el nombre"
        
        paciente = pacientes[0]
        
        # Crear cita
        id_cita = self.citas.crear_cita(
            id_pac=paciente['IdPac'],
            fecha=fecha,
            hora_str=hora_str,
            duracion=30,
            texto="Cita creada por IA"
        )
        
        return f"✅ Cita creada para {paciente['Apellidos']} {paciente['Nombre']}\n" \
               f"📅 {fecha.strftime('%d/%m/%Y')} a las {hora_str}\n" \
               f"🆔 ID Cita: {id_cita}"
    
    def _cmd_listar_citas_ia(self, params: Dict) -> str:
        """Comando: Listar citas (versión optimizada para IA)"""
        
        fecha_str = params.get('fecha', 'hoy')
        fecha = self._parsear_fecha_ia(fecha_str)
        
        if not fecha:
            return f"❌ No entendí la fecha '{fecha_str}'"
        
        citas = self.citas.listar_citas_fecha(fecha)
        
        if not citas:
            return f"📅 No hay citas para el {fecha.strftime('%d/%m/%Y')}"
        
        resultado = f"📅 Citas del {fecha.strftime('%d/%m/%Y')}:\n\n"
        
        for cita in citas:
            resultado += f"🕐 {cita['Hora']} - {cita['Paciente']}\n"
            resultado += f"   📝 {cita['Texto'] or 'Sin descripción'}\n"
            resultado += f"   ⏱️ {cita['Duracion']} min | 🆔 {cita['IdCita']}\n\n"
        
        return resultado
    
    def _cmd_consultar_deuda_ia(self, params: Dict) -> str:
        """Comando: Consultar deuda (versión optimizada para IA)"""
        
        nombre_paciente = params.get('nombre_paciente', '')
        
        # Buscar paciente
        partes = nombre_paciente.split()
        if len(partes) == 1:
            pacientes = self.pacientes.buscar_paciente(apellidos=partes[0])
            if not pacientes:
                pacientes = self.pacientes.buscar_paciente(nombre=partes[0])
        else:
            nombre = partes[0]
            apellidos = " ".join(partes[1:])
            pacientes = self.pacientes.buscar_paciente(nombre=nombre, apellidos=apellidos)
        
        if not pacientes:
            return f"❌ No encontré paciente '{nombre_paciente}'"
        
        if len(pacientes) > 1:
            resultado = "🔍 Encontré varios pacientes:\n"
            for i, pac in enumerate(pacientes, 1):
                resultado += f"  {i}. {pac['Apellidos']} {pac['Nombre']} - NumPac: {pac['NumPac']}\n"
            return resultado + "\n⚠️ Especifica mejor el nombre"
        
        paciente = pacientes[0]
        
        # Consultar deuda
        info_deuda = self.deuda.consultar_deuda_paciente(paciente['IdPac'])
        
        if info_deuda['total_deuda'] == 0:
            return f"✅ {paciente['Apellidos']} {paciente['Nombre']} no tiene deuda pendiente"
        
        resultado = f"💰 Deuda de {paciente['Apellidos']} {paciente['Nombre']}:\n\n"
        resultado += f"📊 TOTAL PENDIENTE: {info_deuda['total_deuda']:.2f}€\n\n"
        
        if info_deuda['deudas']:
            resultado += "Detalle:\n"
            for deuda in info_deuda['deudas']:
                resultado += f"  • {deuda['Pendiente']:.2f}€ - Vence: {deuda['FecPlazo'].strftime('%d/%m/%Y') if deuda['FecPlazo'] else 'Sin fecha'}\n"
                if deuda['NFactura']:
                    resultado += f"    Factura: {deuda['NFactura']}\n"
        
        return resultado
    
    def _parsear_fecha_ia(self, fecha_str: str) -> Optional[datetime]:
        """Parsea una fecha en diferentes formatos"""
        
        fecha_str_lower = fecha_str.lower().strip()
        
        if fecha_str_lower == 'hoy':
            return datetime.now()
        elif fecha_str_lower == 'mañana' or fecha_str_lower == 'manana':
            return datetime.now() + timedelta(days=1)
        
        # Formato DD/MM/YYYY
        try:
            return datetime.strptime(fecha_str, '%d/%m/%Y')
        except:
            pass
        
        # Otros formatos
        try:
            return datetime.strptime(fecha_str, '%Y-%m-%d')
        except:
            pass
        
        return None
    
    def _cmd_listar_colaboradores(self, params: Dict) -> str:
        """Comando: Listar colaboradores activos"""
        
        colaboradores = self.colaboradores.listar_activos()
        
        if not colaboradores:
            return "❌ No hay colaboradores activos"
        
        resultado = f"👨‍⚕️ Colaboradores activos ({len(colaboradores)}):\n\n"
        
        for col in colaboradores:
            resultado += f"• {col['NombreCompleto']}\n"
            resultado += f"  🆔 ID: {col['IdCol']} | Código: {col['Codigo']}\n"
            if col['TelMovil']:
                resultado += f"  📱 {col['TelMovil']}\n"
            resultado += "\n"
        
        return resultado
    
    def _cmd_buscar_tratamiento(self, params: Dict) -> str:
        """Comando: Buscar tratamiento"""
        
        texto = params.get('texto', '')
        
        tratamientos = self.tratamientos.buscar(texto)
        
        if not tratamientos:
            return f"❌ No encontré tratamientos con '{texto}'"
        
        resultado = f"🔍 Encontré {len(tratamientos)} tratamiento(s):\n\n"
        
        for tto in tratamientos:
            resultado += f"• {tto['Descripcion']}\n"
            resultado += f"  🆔 ID: {tto['IdTto']} | Código: {tto['Codigo']}\n"
            resultado += f"  💰 {tto['Importe']:.2f}€\n\n"
        
        return resultado
    
    def _cmd_consultar_deuda(self, params: Dict) -> str:
        """Comando: Consultar deuda"""
        
        nombre_completo = params.get('nombre', '')
        
        # Buscar paciente
        partes = nombre_completo.split()
        nombre = partes[0] if partes else ""
        apellidos = " ".join(partes[1:]) if len(partes) > 1 else ""
        
        pacientes = self.pacientes.buscar_paciente(nombre=nombre, apellidos=apellidos)
        
        if not pacientes:
            return f"❌ No encontré paciente '{nombre_completo}'"
        
        if len(pacientes) > 1:
            resultado = "🔍 Encontré varios pacientes:\n"
            for i, pac in enumerate(pacientes, 1):
                resultado += f"  {i}. {pac['Apellidos']} {pac['Nombre']} - NumPac: {pac['NumPac']}\n"
            return resultado + "\n⚠️ Especifica mejor el nombre"
        
        paciente = pacientes[0]
        
        # Consultar deuda
        info_deuda = self.deuda.consultar_deuda_paciente(paciente['IdPac'])
        
        if info_deuda['total_deuda'] == 0:
            return f"✅ {paciente['Apellidos']} {paciente['Nombre']} no tiene deuda pendiente"
        
        resultado = f"💰 Deuda de {paciente['Apellidos']} {paciente['Nombre']}:\n\n"
        resultado += f"📊 TOTAL PENDIENTE: {info_deuda['total_deuda']:.2f}€\n\n"
        
        if info_deuda['deudas']:
            resultado += "Detalle:\n"
            for deuda in info_deuda['deudas']:
                resultado += f"  • {deuda['Pendiente']:.2f}€ - Vence: {deuda['FecPlazo'].strftime('%d/%m/%Y') if deuda['FecPlazo'] else 'Sin fecha'}\n"
                if deuda['NFactura']:
                    resultado += f"    Factura: {deuda['NFactura']}\n"
        
        return resultado
    
    def _mostrar_ayuda(self) -> str:
        """Muestra comandos disponibles"""
        return """
❓ No entendí el comando. Comandos disponibles:

📝 PACIENTES:
  • crear paciente
  • buscar paciente [nombre] [apellidos]
  • buscar paciente [NumPac]  (ejemplo: buscar paciente 4134)
  • buscar paciente [teléfono]

📅 CITAS:
  • crear cita para [nombre] el [fecha] a las [hora]
  • listar citas de hoy/mañana

👨‍⚕️ COLABORADORES:
  • listar colaboradores

🦷 TRATAMIENTOS:
  • buscar tratamiento [texto]

💰 DEUDA:
  • deuda de [nombre paciente]

💡 Ejemplos:
  • crear paciente
  • buscar paciente 4134
  • buscar paciente Juan García
  • buscar paciente 666123456
  • crear cita para María López el 15/12/2025 a las 10:30
  • listar citas de hoy
  • listar colaboradores
  • buscar tratamiento empaste
  • deuda de Juan García
"""
    
    def cerrar(self):
        """Cierra la conexión"""
        self.db.cerrar()

# =====================================================
# INTERFAZ DE LÍNEA DE COMANDOS
# =====================================================

def main():
    """Función principal - Interfaz CLI"""
    
    print("=" * 60)
    print("🦷 AGENTE IA PARA GESDEN G5.29 - v4.0")
    print("=" * 60)
    print()
    
    try:
        agente = AgenteGesdenIA()
        
        print("📝 Escribe 'ayuda' para ver comandos")
        print("📝 Escribe 'salir' para terminar")
        print()
        
        while True:
            try:
                comando = input("👤 Tú: ").strip()
                
                if not comando:
                    continue
                
                if comando.lower() in ['salir', 'exit', 'quit']:
                    print("\n👋 ¡Hasta luego!")
                    break
                
                if comando.lower() == 'ayuda':
                    print(agente._mostrar_ayuda())
                    continue
                
                respuesta = agente.procesar_comando(comando)
                print(f"\n🤖 Agente:\n{respuesta}\n")
            
            except KeyboardInterrupt:
                print("\n\n👋 Interrumpido")
                break
            except Exception as e:
                print(f"\n❌ Error: {str(e)}\n")
        
        agente.cerrar()
    
    except Exception as e:
        print(f"\n❌ Error fatal: {str(e)}")
        logging.error(f"Error fatal: {str(e)}", exc_info=True)

if __name__ == "__main__":
    main()
