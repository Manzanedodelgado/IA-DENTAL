import re
import os

input_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_REAL_GELITE.md"
output_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/supabase-missing-4.sql"
target_tables = ["AgdNotas", "Presu", "PresuTto", "Facturas"]

def map_type(sql_server_type):
    t = sql_server_type.lower()
    if 'varchar' in t or 'char' in t or 'text' in t: return 'text'
    if 'int' in t or 'smallint' in t or 'tinyint' in t: return 'integer'
    if 'money' in t or 'float' in t or 'decimal' in t or 'numeric' in t or 'real' in t: return 'numeric'
    if 'datetime' in t or 'date' in t or 'time' in t: return 'timestamp with time zone'
    if 'bit' in t: return 'boolean'
    if 'image' in t or 'binary' in t: return 'bytea'
    if 'uniqueidentifier' in t: return 'uuid'
    return 'text'

tables = []

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_table = None
in_table_body = False

for line in lines:
    line = line.strip()
    match = re.search(r'^### \[TABLA\] `(.*?)`', line)
    if match:
        if current_table and current_table['name'].lower() in [t.lower() for t in target_tables]:
            tables.append(current_table)
        current_table = {'name': match.group(1), 'columns': []}
        in_table_body = False
        continue
    
    if current_table and line.startswith('| Columna |'):
        in_table_body = True
        continue
    if current_table and in_table_body and line.startswith('| :---'):
        continue
    
    if current_table and in_table_body and line.startswith('|'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 4:
            col_raw = parts[1]
            props_raw = parts[2]
            col_match = re.search(r'`(.*?)`', col_raw)
            if not col_match: continue
            col_name = col_match.group(1)
            is_pk = '**[PK]**' in props_raw
            type_match = re.search(r'`(.*?)`', props_raw)
            sql_type = type_match.group(1) if type_match else 'varchar'
            pg_type = map_type(sql_type)
            current_table['columns'].append({
                'name': col_name,
                'pg_type': pg_type,
                'is_pk': is_pk
            })
            
    if current_table and in_table_body and line == '':
        in_table_body = False

if current_table and current_table['name'].lower() in [t.lower() for t in target_tables]:
    tables.append(current_table)

with open(output_file, 'w', encoding='utf-8') as out:
    for tbl in tables:
        # Force table name to UPPERCASE to match the CSV exact naming if needed, 
        # But GELITE standard uses exact case from SQL.
        out.write(f"CREATE TABLE IF NOT EXISTS public.\"{tbl['name'].upper()}\" (\n")
        col_defs = []
        pks = []
        for col in tbl['columns']:
            def_str = f"  \"{col['name']}\" {col['pg_type']}"
            if col['is_pk']: pks.append(f"\"{col['name']}\"")
            col_defs.append(def_str)
        if pks: col_defs.append(f"  PRIMARY KEY ({', '.join(pks)})")
        out.write(",\n".join(col_defs) + "\n);\n\n")

print(f"Generado {output_file} con {len(tables)} tablas.")
