"""
Database Connector - CAPA 1: NÚCLEO LOCAL
Conexión a GELITE @ GABINETE2
"""

import pyodbc
from typing import List, Dict, Any, Optional
from contextlib import contextmanager
from loguru import logger
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import QueuePool

from config import settings, get_connection_string


class DatabaseConnector:
    """
    Conector a la base de datos GELITE
    Gestiona conexiones y ejecución de queries con validación
    """
    
    def __init__(self):
        self.connection_string = get_connection_string()
        self._engine = None
        self._session_factory = None
        self._initialize_engine()
    
    def _initialize_engine(self):
        """Inicializa el engine de SQLAlchemy con pooling"""
        try:
            # Crear connection string para SQLAlchemy
            sqlalchemy_url = f"mssql+pyodbc:///?odbc_connect={self.connection_string}"
            
            # Crear engine con pool de conexiones
            self._engine = create_engine(
                sqlalchemy_url,
                poolclass=QueuePool,
                pool_size=5,
                max_overflow=10,
                pool_pre_ping=True,  # Verificar conexiones
                echo=settings.ENABLE_QUERY_LOGGING
            )
            
            # Session factory
            self._session_factory = sessionmaker(bind=self._engine)
            
            logger.info(f"✅ Database engine initialized: {settings.DB_SERVER}/{settings.DB_NAME}")
            
        except Exception as e:
            logger.error(f"❌ Failed to initialize database engine: {e}")
            raise
    
    @contextmanager
    def get_session(self) -> Session:
        """
        Context manager para sesiones de base de datos
        
        Yields:
            Session: SQLAlchemy session
        """
        session = self._session_factory()
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            logger.error(f"Database session error: {e}")
            raise
        finally:
            session.close()
    
    def test_connection(self) -> bool:
        """
        Prueba la conexión a la base de datos
        
        Returns:
            bool: True si la conexión es exitosa
        """
        try:
            with self.get_session() as session:
                result = session.execute(text("SELECT 1 as test"))
                row = result.fetchone()
                if row and row[0] == 1:
                    logger.info("✅ Database connection test successful")
                    return True
            return False
        except Exception as e:
            logger.error(f"❌ Database connection test failed: {e}")
            return False
    
    def execute_query(
        self, 
        query: str, 
        params: Optional[Dict[str, Any]] = None,
        fetch_all: bool = True
    ) -> List[Dict[str, Any]]:
        """
        Ejecuta una consulta SQL con validación previa
        
        Args:
            query: Consulta SQL
            params: Parámetros para la consulta
            fetch_all: Si True, retorna todas las filas; si False, solo la primera
        
        Returns:
            List[Dict]: Resultados de la consulta
        """
        try:
            with self.get_session() as session:
                # Ejecutar query
                result = session.execute(text(query), params or {})
                
                # Fetch results
                if fetch_all:
                    rows = result.fetchall()
                else:
                    row = result.fetchone()
                    rows = [row] if row else []
                
                # Convertir a dict
                if rows:
                    columns = result.keys()
                    return [dict(zip(columns, row)) for row in rows]
                
                return []
                
        except Exception as e:
            logger.error(f"Query execution failed: {e}")
            logger.debug(f"Failed query: {query}")
            raise
    
    def execute_scalar(self, query: str, params: Optional[Dict[str, Any]] = None) -> Any:
        """
        Ejecuta una consulta que retorna un solo valor
        
        Args:
            query: Consulta SQL
            params: Parámetros
        
        Returns:
            Any: Valor escalar
        """
        try:
            with self.get_session() as session:
                result = session.execute(text(query), params or {})
                row = result.fetchone()
                return row[0] if row else None
        except Exception as e:
            logger.error(f"Scalar query failed: {e}")
            raise
    
    def get_table_schema(self, table_name: str) -> List[Dict[str, Any]]:
        """
        Obtiene el esquema de una tabla
        
        Args:
            table_name: Nombre de la tabla
        
        Returns:
            List[Dict]: Información de columnas
        """
        query = """
        SELECT 
            COLUMN_NAME as name,
            DATA_TYPE as type,
            CHARACTER_MAXIMUM_LENGTH as max_length,
            IS_NULLABLE as nullable,
            COLUMN_DEFAULT as default_value
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = :table_name
        ORDER BY ORDINAL_POSITION
        """
        
        return self.execute_query(query, {"table_name": table_name})
    
    def get_all_tables(self) -> List[str]:
        """
        Obtiene lista de todas las tablas de la base de datos
        
        Returns:
            List[str]: Nombres de tablas
        """
        query = """
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_NAME
        """
        
        results = self.execute_query(query)
        return [row['TABLE_NAME'] for row in results]
    
    def get_foreign_keys(self, table_name: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Obtiene información de claves foráneas
        
        Args:
            table_name: Tabla específica (None para todas)
        
        Returns:
            List[Dict]: Información de FKs
        """
        query = """
        SELECT 
            fk.name as fk_name,
            tp.name as parent_table,
            cp.name as parent_column,
            tr.name as referenced_table,
            cr.name as referenced_column
        FROM sys.foreign_keys fk
        INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
        INNER JOIN sys.tables tp ON fkc.parent_object_id = tp.object_id
        INNER JOIN sys.columns cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
        INNER JOIN sys.tables tr ON fkc.referenced_object_id = tr.object_id
        INNER JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
        """
        
        if table_name:
            query += " WHERE tp.name = :table_name"
            return self.execute_query(query, {"table_name": table_name})
        
        return self.execute_query(query)
    
    def insert_report(self, report_data: Dict[str, Any]) -> int:
        """
        Inserta un reporte en REPORTES_QA
        
        Args:
            report_data: Datos del reporte
        
        Returns:
            int: ID del reporte insertado
        """
        query = f"""
        INSERT INTO {settings.REPORTS_TABLE} 
        (REP_TIPO, REP_CATEGORIA, REP_SEVERIDAD, REP_TITULO, REP_DESCRIPCION, REP_DATOS_JSON, REP_ACCIONES)
        OUTPUT INSERTED.REP_ID
        VALUES (:tipo, :categoria, :severidad, :titulo, :descripcion, :datos, :acciones)
        """
        
        try:
            with self.get_session() as session:
                result = session.execute(text(query), report_data)
                report_id = result.fetchone()[0]
                logger.info(f"Report inserted with ID: {report_id}")
                return report_id
        except Exception as e:
            logger.error(f"Failed to insert report: {e}")
            raise
    
    def close(self):
        """Cierra el engine y todas las conexiones"""
        if self._engine:
            self._engine.dispose()
            logger.info("Database engine disposed")


# Singleton instance
db = DatabaseConnector()
