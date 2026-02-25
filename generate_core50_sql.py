import re
import os

input_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_WEB_50_TABLAS_CORE.md"
output_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/supabase-migration-core50.sql"

def map_type(sql_server_type):
    t = sql_server_type.lower()
    if 'varchar' in t or 'char' in t or 'text' in t:
        return 'text'
    if 'int' in t or 'smallint' in t or 'tinyint' in t:
        return 'integer'
    if 'money' in t or 'float' in t or 'decimal' in t or 'numeric' in t or 'real' in t:
        return 'numeric'
    if 'datetime' in t or 'date' in t or 'time' in t:
        return 'timestamp with time zone'
    if 'bit' in t:
        return 'boolean'
    if 'image' in t or 'binary' in t:
        return 'bytea'
    if 'uniqueidentifier' in t:
        return 'uuid'
    return 'text'

tables = []

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_table = None
in_table_body = False

for line in lines:
    line = line.strip()
    
    # Detcet table start
    match = re.search(r'^### \[TABLA\] `(.*?)`', line)
    if match:
        if current_table:
            tables.append(current_table)
        current_table = {
            'name': match.group(1),
            'columns': []
        }
        in_table_body = False
        continue
    
    # Detect the markdown table start for columns
    if current_table and line.startswith('| Columna |'):
        in_table_body = True
        continue
    if current_table and in_table_body and line.startswith('| :---'):
        continue
    
    # Parse columns
    if current_table and in_table_body and line.startswith('|'):
        parts = [p.strip() for p in line.split('|')]
        # | `ColName` | **[PK]** `type` | Concept |
        if len(parts) >= 4:
            col_raw = parts[1]
            props_raw = parts[2]
            
            # Extract column name
            col_match = re.search(r'`(.*?)`', col_raw)
            if not col_match:
                continue
            col_name = col_match.group(1)
            
            # Extract properties
            is_pk = '**[PK]**' in props_raw
            is_not_null = 'NOT NULL' in props_raw.upper()
            
            # Extract type (the first thing in backticks in props_raw)
            type_match = re.search(r'`(.*?)`', props_raw)
            sql_type = type_match.group(1) if type_match else 'varchar'
            pg_type = map_type(sql_type)
            
            # If the column name is standard ID or implies identity, and it's PK
            if is_pk and pg_type == 'integer':
                pg_type = 'integer' # We won't use serial because we are preserving original IDs
                
            current_table['columns'].append({
                'name': col_name,
                'sql_type': sql_type,
                'pg_type': pg_type,
                'is_pk': is_pk,
                'is_not_null': is_not_null
            })
            
    # Stop parsing columns if we hit empty line after table
    if current_table and in_table_body and line == '':
        in_table_body = False

if current_table:
    tables.append(current_table)

with open(output_file, 'w', encoding='utf-8') as out:
    out.write("-- AUTO-GENERATED: MIGRAIÓN 50 TABLAS CORE (SUPABASE)\n")
    out.write("-- Basado en ESTRUCTURA_WEB_50_TABLAS_CORE.md\n\n")
    
    for tbl in tables:
        out.write(f"CREATE TABLE IF NOT EXISTS public.\"{tbl['name']}\" (\n")
        
        col_defs = []
        pks = []
        
        for col in tbl['columns']:
            # Quote the column name to preserve exact casing
            def_str = f"  \"{col['name']}\" {col['pg_type']}"
            if col['name'].lower() == 'id':
               # Common safely if there's an ID column
               def_str += " DEFAULT gen_random_uuid()" if col['pg_type'] == 'uuid' else ""
            
            if col['is_not_null']:
                # Wait, some original data might have nulls where it shouldn't. Let's be relaxed for migration.
                pass 
                
            if col['is_pk']:
                pks.append(f"\"{col['name']}\"")
                
            col_defs.append(def_str)
            
        if pks:
            col_defs.append(f"  PRIMARY KEY ({', '.join(pks)})")
            
        out.write(",\n".join(col_defs) + "\n")
        out.write(");\n\n")

print(f"Generado {output_file} con {len(tables)} tablas.")
