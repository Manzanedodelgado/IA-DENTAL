"""
Schema Knowledge Module
Parsea el esquema de GELITE y proporciona contexto al LLM
"""

import csv
from typing import Dict, List, Set
from collections import defaultdict
from loguru import logger


class SchemaKnowledge:
    """
    Gestor de conocimiento del esquema de GELITE
    Parse el CSV con columnas y tablas para proporcionar contexto al LLM
    """
    
    def __init__(self, schema_csv_path: str = "/Users/juanantoniomanzanedodelgado/Desktop/NOMBRE DE COLUMNAS.csv"):
        self.schema_csv_path = schema_csv_path
        self.tables: Dict[str, List[str]] = defaultdict(list)
        self.all_tables: Set[str] = set()
        self.all_columns: List[tuple] = []
        
        self._load_schema()
    
    def _load_schema(self):
        """Carga el esquema desde el CSV"""
        try:
            with open(self.schema_csv_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip().replace('\r', '')
                    if ';' in line:
                        parts = line.split(';')
                        if len(parts) == 2:
                            table, column = parts
                            self.tables[table].append(column)
                            self.all_tables.add(table)
                            self.all_columns.append((table, column))
            
            logger.info(f"✅ Schema loaded: {len(self.all_tables)} tables, {len(self.all_columns)} columns")
            
        except Exception as e:
            logger.error(f"❌ Failed to load schema: {e}")
            raise
    
    def get_table_schema(self, table_name: str) -> str:
        """
        Obtiene el esquema de una tabla específica en formato legible
        
        Args:
            table_name: Nombre de la tabla
        
        Returns:
            str: Schema formatted para el LLM
        """
        if table_name not in self.tables:
            return f"Tabla '{table_name}' no encontrada en el esquema."
        
        columns = self.tables[table_name]
        schema_text = f"Tabla: {table_name}\n"
        schema_text += f"Columnas ({len(columns)}):\n"
        schema_text += "\n".join(f"  - {col}" for col in columns)
        
        return schema_text
    
    def get_relevant_tables(self, keywords: List[str]) -> List[str]:
        """
        Encuentra tablas relevantes basadas en keywords
        
        Args:
            keywords: Palabras clave (ej: ['paciente', 'cita', 'tratamiento'])
        
        Returns:
            List[str]: Nombres de tablas relevantes
        """
        relevant = set()
        keywords_lower = [k.lower() for k in keywords]
        
        for table in self.all_tables:
            table_lower = table.lower()
            for keyword in keywords_lower:
                if keyword in table_lower:
                    relevant.add(table)
                    break
        
        return sorted(list(relevant))
    
    def get_full_schema_summary(self) -> str:
        """
        Genera un resumen completo del esquema para el LLM
        ADVERTENCIA: Esto puede ser muy largo (7792 columnas)
        
        Returns:
            str: Resumen completo
        """
        summary = f"ESQUEMA GELITE - Total: {len(self.all_tables)} tablas\n\n"
        
        for table in sorted(self.all_tables):
            columns = self.tables[table]
            summary += f"\n{table} ({len(columns)} columnas):\n"
            summary += ", ".join(columns[:10])  # Solo primeras 10 para no saturar
            if len(columns) > 10:
                summary += f", ... y {len(columns) - 10} más"
            summary += "\n"
        
        return summary
    
    def get_core_tables_schema(self) -> str:
        """
        Obtiene el esquema de las tablas core más importantes
        Optimizado para prompt del LLM
        
        Returns:
            str: Schema de tablas principales
        """
        core_tables = [
            'Pacientes', 'Citas', 'Tratamientos', 'Presupuestos',
            'Facturas', 'TColabos', 'Centros', 'Clientes',
            'Almace', 'Historias', 'Odontograma'
        ]
        
        schema_text = "=== TABLAS PRINCIPALES GELITE ===\n\n"
        
        for table in core_tables:
            # Buscar tabla exacta o variaciones
            found_tables = [t for t in self.all_tables if table.lower() in t.lower()]
            
            for found_table in found_tables:
                columns = self.tables[found_table]
                schema_text += f"\n📋 {found_table} ({len(columns)} columnas):\n"
                schema_text += "\n".join(f"   • {col}" for col in columns)
                schema_text += "\n"
        
        return schema_text
    
    def search_columns(self, search_term: str) -> List[tuple]:
        """
        Busca columnas que contengan el término
        
        Args:
            search_term: Término a buscar
        
        Returns:
            List[tuple]: (tabla, columna) que matchean
        """
        search_lower = search_term.lower()
        matches = []
        
        for table, column in self.all_columns:
            if search_lower in column.lower() or search_lower in table.lower():
                matches.append((table, column))
        
        return matches
    
    def get_patient_related_schema(self) -> str:
        """
        Obtiene el esquema relacionado con pacientes
        Útil para la mayoría de queries del QABot
        
        Returns:
            str: Schema relacionado con pacientes
        """
        patient_keywords = ['pac', 'pacient', 'cit', 'trat', 'presu', 'fact', 'hist']
        relevant_tables = []
        
        for table in self.all_tables:
            table_lower = table.lower()
            if any(kw in table_lower for kw in patient_keywords):
                relevant_tables.append(table)
        
        schema_text = "=== ESQUEMA RELACIONADO CON PACIENTES ===\n\n"
        
        for table in sorted(relevant_tables)[:20]:  # Top 20 tablas
            columns = self.tables[table]
            schema_text += f"\n{table}:\n"
            schema_text += ", ".join(columns)
            schema_text += "\n"
        
        return schema_text
    
    def generate_llm_context(self, query_type: str = "general") -> str:
        """
        Genera el contexto óptimo para el LLM según el tipo de query
        
        Args:
            query_type: Tipo de query ('patient', 'financial', 'inventory', 'general')
        
        Returns:
            str: Contexto optimizado
        """
        if query_type == "patient":
            return self.get_patient_related_schema()
        elif query_type == "financial":
            return self._get_financial_schema()
        elif query_type == "inventory":
            return self._get_inventory_schema()
        else:
            return self.get_core_tables_schema()
    
    def _get_financial_schema(self) -> str:
        """Schema relacionado con finanzas"""
        financial_keywords = ['fact', 'pago', 'cobr', 'caja', 'banco', 'arq']
        relevant_tables = [t for t in self.all_tables 
                          if any(kw in t.lower() for kw in financial_keywords)]
        
        schema_text = "=== ESQUEMA FINANCIERO ===\n\n"
        for table in sorted(relevant_tables)[:15]:
            columns = self.tables[table]
            schema_text += f"\n{table}: {', '.join(columns[:20])}\n"
        
        return schema_text
    
    def _get_inventory_schema(self) -> str:
        """Schema relacionado con inventario"""
        inventory_keywords = ['almace', 'stock', 'prove', 'pedid', 'invent']
        relevant_tables = [t for t in self.all_tables 
                          if any(kw in t.lower() for kw in inventory_keywords)]
        
        schema_text = "=== ESQUEMA INVENTARIO ===\n\n"
        for table in sorted(relevant_tables)[:15]:
            columns = self.tables[table]
            schema_text += f"\n{table}: {', '.join(columns[:20])}\n"
        
        return schema_text
    
    def get_stats(self) -> Dict:
        """Obtiene estadísticas del esquema"""
        return {
            "total_tables": len(self.all_tables),
            "total_columns": len(self.all_columns),
            "avg_columns_per_table": len(self.all_columns) / len(self.all_tables) if self.all_tables else 0,
            "max_columns_table": max([(len(cols), table) for table, cols in self.tables.items()], key=lambda x: x[0]) if self.tables else (0, None)
        }


# Singleton instance
schema_knowledge = SchemaKnowledge()


# Helper function para queries rápidas
def get_schema_for_query(natural_language_query: str) -> str:
    """
    Determina automáticamente el esquema relevante para una query
    
    Args:
        natural_language_query: Query en lenguaje natural
    
    Returns:
        str: Schema context optimizado
    """
    query_lower = natural_language_query.lower()
    
    # Detectar tipo de query
    if any(word in query_lower for word in ['pacient', 'cita', 'historial', 'tratamiento']):
        return schema_knowledge.generate_llm_context("patient")
    elif any(word in query_lower for word in ['factura', 'pago', 'cobro', 'deuda', 'ingreso']):
        return schema_knowledge.generate_llm_context("financial")
    elif any(word in query_lower for word in ['stock', 'inventario', 'material', 'proveedor']):
        return schema_knowledge.generate_llm_context("inventory")
    else:
        return schema_knowledge.generate_llm_context("general")
