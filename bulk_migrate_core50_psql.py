import csv
import psycopg2
from psycopg2.extras import execute_batch
import os
import sys
from datetime import datetime
import re

# TODO: Fill connection string
DB_KWARGS = {
    "host": "aws-1-eu-central-1.pooler.supabase.com",
    "port": 6543, # Try pooler port 6543 first for better connection handling, fallback to 5432
    "dbname": "postgres",
    "user": "postgres.ltfstsjfybpbtiakopor",
    "password": "Yoera001!!!",
    "sslmode": "require"
}

BASE_PATH = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental"
CSV_DIR = os.path.join(BASE_PATH, "CSVs_WEB_CORE_50")
SQL_FILE = os.path.join(BASE_PATH, "supabase-migration-core50.sql")

def parse_schema_fields():
    # Retorna un diccionario con las columnas de cada tabla para no insertar basura
    schema = {}
    current_table = None
    if not os.path.exists(SQL_FILE): return schema
    with open(SQL_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line: continue
            
            # CREATE TABLE public."tableName"
            m = re.search(r'CREATE TABLE IF NOT EXISTS public\."([^"]+)"', line)
            if m:
                current_table = m.group(1)
                schema[current_table] = []
                continue
                
            if current_table and line.startswith('"'):
                col_name = line.split('"')[1]
                schema[current_table].append(col_name)
            
            if current_table and line.startswith('PRIMARY KEY'):
                current_table = None
                
    return schema

def clean_val(val):
    if val is None or val == 'NULL' or val == 'None' or val == '': return None
    return val

def migrate_csv_direct(csv_filename, conn, schema_dict):
    table_name = csv_filename.replace('.csv', '')
    
    # Encontrar el nombre real respetando mayusculas basado en la clave del diccionario
    real_table_name = None
    for t in schema_dict.keys():
        if t.lower() == table_name.lower():
            real_table_name = t
            break
            
    if not real_table_name:
        return
        
    valid_cols = set(schema_dict[real_table_name])
    csv_path = os.path.join(CSV_DIR, csv_filename)
    if not os.path.exists(csv_path): return
    
    print(f"MIGRANDO DIRECTO: {real_table_name}...", flush=True)
    
    with open(csv_path, mode='r', encoding='utf-8-sig', errors='replace') as f:
        first_line = f.readline()
        delimiter = ';' if ';' in first_line else ','
        f.seek(0)
        
        reader = csv.DictReader(f, delimiter=delimiter)
        
        # Filtramos columnas del CSV para asegurarnos que solo insertamos las declaradas en SQL
        header_cols = [c.strip() for c in (reader.fieldnames or []) if c and c.strip() in valid_cols]
        if not header_cols: return
        
        cols_str = ", ".join([f'"{c}"' for c in header_cols])
        placeholders = ", ".join(["%s"] * len(header_cols))
        
        # ON CONFLICT DO NOTHING requiere postgres 9.5+ (Supabase lo soporta)
        insert_query = f'INSERT INTO public."{real_table_name}" ({cols_str}) VALUES ({placeholders}) ON CONFLICT DO NOTHING'
        
        batch = []
        total_ok = 0
        
        for row in reader:
            record = []
            valid_row = True
            for c in header_cols:
                val = clean_val(row.get(c))
                record.append(val)
            
            if valid_row:
                batch.append(tuple(record))
                
            if len(batch) >= 1000:
                with conn.cursor() as cur:
                    execute_batch(cur, insert_query, batch)
                conn.commit()
                total_ok += len(batch)
                print(f"  ✅ {total_ok} insertados en {real_table_name}...", flush=True)
                batch = []
                
        if batch:
            with conn.cursor() as cur:
                execute_batch(cur, insert_query, batch)
            conn.commit()
            total_ok += len(batch)
            
    print(f"🏁 FIN {real_table_name}: {total_ok} filas inyectadas.\n")


if __name__ == "__main__":
    # if "[Yosoy001!!!]" in DB_CONNECT_INFO or "[TU-CONTRASEÑA-AQUI]" in DB_CONNECT_INFO:
    #     print("ERROR: Tienes que abrir el script bulk_migrate_core50_psql.py y reemplazar [YOUR-PASSWORD] por tu contraseña real de Supabase.")
    #     sys.exit(1)
        
    print("🚀 VOLCADO MASIVO POR PSQL DIRECTO")
    schema = parse_schema_fields()
    
    try:
        conn = psycopg2.connect(**DB_KWARGS)
    except psycopg2.OperationalError as e:
        print("Fallback a puerto 5432...")
        DB_KWARGS["port"] = 5432
        conn = psycopg2.connect(**DB_KWARGS)
    target_tables = ["Pacientes", "Clientes", "TColabos", "Centros", "TUsers", "Bancos", "TForPago", "Mutuas", "TiposCita", "Gabinetes"]
    
    all_files = os.listdir(CSV_DIR)
    all_tables = [f.replace('.csv', '') for f in all_files if f.endswith('.csv')]
    all_tables.sort(key=lambda t: target_tables.index(t) if t in target_tables else 999)
    
    for t_name in all_tables:
        migrate_csv_direct(f"{t_name}.csv", conn, schema)
        
    conn.close()
    print("MIGRACION PSQL COMPLETADA")
