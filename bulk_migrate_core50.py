import csv
import json
import requests
import os
import uuid
import sys
import time
from datetime import datetime, timedelta
import re

# CONFIGURACIÓN ORIGINAL
# TODO: Rellena esta variable con la SECRET `service_role` key del panel de Supabase
SUPABASE_URL = "https://ltfstsjfybpbtiakopor.supabase.co/rest/v1"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIwMDU0MywiZXhwIjoyMDg2Nzc2NTQzfQ.DPKKLmvnyOKDQng5Q-2sAGC4mXe7fMrPKPCrBaMsr5I"
BATCH_SIZE = 500

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal,resolution=merge-duplicates"
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)

BASE_PATH = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental"
CSV_DIR = os.path.join(BASE_PATH, "CSVs_WEB_CORE_50")
SQL_FILE = os.path.join(BASE_PATH, "supabase-migration-core50.sql")

def id_to_uuid(numeric_id, namespace):
    return str(uuid.uuid5(namespace, str(numeric_id)))

def excel_date_to_iso(serial):
    try:
        return (datetime(1899, 12, 30) + timedelta(days=float(serial))).strftime('%Y-%m-%d')
    except:
        return None

def clean_date(val):
    if not val or val == 'NULL' or val == 'None': return None
    val = val.strip().split(' ')[0]
    if not val: return None
    if val.replace('.','',1).isdigit() and len(val) >= 4:
        try:
            val_f = float(val)
            if val_f > 10000:
                return excel_date_to_iso(val)
        except:
            pass
    if len(val) >= 10 and val[4] == '-' and val[7] == '-':
        return val[:10]
    return None

def clean_time(val):
    if not val or val == 'NULL' or val == 'None': return '10:00:00'
    val = val.strip()
    if ':' in val: return val
    try:
        secs = int(float(val))
        if secs < 0: secs = 0
        if secs > 86399: secs = 86399
        h = secs // 3600
        m = (secs % 3600) // 60
        s = secs % 60
        return f'{h:02d}:{m:02d}:{s:02d}'
    except:
        return '10:00:00'

def clean_value(val):
    if val is None or val == 'NULL' or val == 'None' or val == '':
        return None
    return val

def parse_pks_from_sql():
    table_pks = {}
    current_table = None
    exact_table = None
    if not os.path.exists(SQL_FILE):
        return table_pks
    with open(SQL_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            # CREATE TABLE public."tableName"
            m = re.search(r'CREATE TABLE IF NOT EXISTS public\."([^"]+)"', line)
            if m:
                current_table = m.group(1).lower()
                exact_table = m.group(1)
                continue
                
            if current_table and line.startswith('PRIMARY KEY'):
                # PRIMARY KEY ("Col1", "Col2")
                m_pk = re.search(r'\(([^)]+)\)', line)
                if m_pk:
                    pks = [c.strip().replace('"', '') for c in m_pk.group(1).split(',')]
                    table_pks[current_table] = {"pk": ",".join(pks), "exact_name": exact_table}
                current_table = None
    return table_pks

def send_batch(table_name, pk_col, data, retries=3):
    # Ensure quotes are stripped from the endpoint URL
    clean_table_name = table_name.strip('"')
    url = f"{SUPABASE_URL}/{clean_table_name}?on_conflict={pk_col}"
    for attempt in range(retries):
        try:
            resp = SESSION.post(url, json=data, timeout=30)
            if resp.status_code in [200, 201, 204]:
                return len(data), 0
            else:
                if attempt == retries - 1:
                    print(f"\n[HTTP {resp.status_code} ERROR ON BATCH PUSH]\n{resp.text}\n", flush=True)
                    sys.exit(1)
                time.sleep(1)
        except requests.exceptions.RequestException as e:
            time.sleep(2)
    return 0, len(data)

def migrate_csv(csv_filename, pks_map):
    csv_table_name = csv_filename.replace('.csv', '')
    map_entry = pks_map.get(csv_table_name.lower())
    
    if not map_entry:
        pk_col = None
        exact_table_name = csv_table_name
    else:
        pk_col = map_entry["pk"]
        exact_table_name = map_entry["exact_name"]
    
    csv_path = os.path.join(CSV_DIR, csv_filename)
    if not os.path.exists(csv_path):
        return
        
    print(f"\n{'='*50}", flush=True)
    print(f"  MIGRANDO: {exact_table_name} (from {csv_filename})", flush=True)
    if not pk_col:
        print(f"  ⚠️ No PK found for {csv_table_name}. Skipping to avoid duplicates.")
        return
        
    print(f"  PK para ON CONFLICT: {pk_col}")
    print(f"{'='*50}", flush=True)

    pk_cols_str = pk_col
    pk_cols_list = [c.strip() for c in pk_col.split(',')]

    records_dict = {}
    total_ok = 0
    total_err = 0

    # Try different delimiters since GELITE exports usually mix ; and ,
    with open(csv_path, mode='r', encoding='utf-8-sig', errors='replace') as f:
        # Detectar separador (leyendo primera linea)
        first_line = f.readline()
        if '|' in first_line:
            delimiter = '|'
        elif ';' in first_line:
            delimiter = ';'
        else:
            delimiter = ','
        f.seek(0)
        
        reader = csv.DictReader(f, delimiter=delimiter)
        for i, row in enumerate(reader):
            # Si el csv.DictReader pone un None como valor, significa que la fila
            # tiene menos delimitadores físicos que la cabecera (es una línea rota por un salto de línea en el texto).
            if None in row.values():
                print(f"  ⚠️ Skipping broken row (missing delimiters): {list(row.values())[0]}")
                continue

            # Clean row values
            cleaned_row = {}
            for k, v in row.items():
                if k is None: continue # Skip dangling columns
                k = k.strip()
                if not k: continue
                val = clean_value(v)
                
                # Basic heuristic for boolean (True/False strings to booleans)
                if val and str(val).lower() in ['true', 'false']:
                    val = str(val).lower() == 'true'
                # Basic heuristics for dates
                elif val and ('Fec' in k or 'Date' in k or k in ['Inactivo', 'Exitus', 'Dispensada', 'Anulada', 'Aceptada', 'AnulacionGestionada', '_fechareg']):
                    val = clean_date(val)
                
                # Special fix for AGDNOTAS.Fecha being an integer in the DB but exported as "YYYY-MM-DD"
                if exact_table_name == "AGDNOTAS" and k == "Fecha" and val and isinstance(val, str):
                    val = val.replace('-', '').replace('/', '').replace(' ', '')
                    if not val.isdigit():
                        val = None
                    
                cleaned_row[k] = val

            # Keep only rows that have a PK 
            # Multi-column PK extraction
            pk_val_tuple = tuple(cleaned_row.get(c) for c in pk_cols_list)
            
            # If any part of the PK is None, skip the row
            if None not in pk_val_tuple:
                # Basic check for any ID/Num columns being fractured strings
                is_broken = False
                for pk_col_item, val in zip(pk_cols_list, pk_val_tuple):
                    if (pk_col_item.lower().startswith('id') or pk_col_item.lower().startswith('num')) and \
                       not str(val).replace('-', '').replace('.', '').isdigit():
                        print(f"  ⚠️ Skipping broken row: PK component {pk_col_item} = {val}")
                        is_broken = True
                        break
                
                if is_broken:
                    continue
                
                # Local deduplication to prevent 500 ON CONFLICT ON UPDATE
                records_dict[pk_val_tuple] = cleaned_row

            if len(records_dict) >= BATCH_SIZE:
                ok, err = send_batch(exact_table_name, pk_cols_str, list(records_dict.values()))
                total_ok += ok
                total_err += err
                print(f"  ✅ {total_ok} OK | ❌ {total_err} err", flush=True)
                records_dict = {}
        
        if records_dict:
            ok, err = send_batch(exact_table_name, pk_cols_str, list(records_dict.values()))
            total_ok += ok
            total_err += err

    print(f"\n  🏁 {exact_table_name}: {total_ok} migrados | {total_err} errores\n", flush=True)

if __name__ == "__main__":
    if "[PEGA-AQUI-TU-SERVICE-ROLE-KEY]" in SUPABASE_KEY:
        print("ERROR: Abre el script bulk_migrate_core50.py y cambia [PEGA-AQUI-TU-SERVICE-ROLE-KEY] por tu service_role key secreta de Supabase.")
        sys.exit(1)
        
    print(f"🚀 VOLCADO MASIVO 50 TABLAS GELITE → SUPABASE", flush=True)
    pks_map = parse_pks_from_sql()
    
    # Priority tables to migrate first
    priority = ["Pacientes", "Clientes", "TColabos", "Centros", "TUsers", "Bancos", "TForPago", "Mutuas", "TiposCita", "Gabinetes"]
    all_files = os.listdir(CSV_DIR)
    
    # Sort files: priority first, then rest
    all_tables = [f.replace('.csv', '') for f in all_files if f.endswith('.csv')]
    all_tables.sort(key=lambda t: priority.index(t) if t in priority else 999)
    
    for t_name in all_tables:
        migrate_csv(f"{t_name}.csv", pks_map)
        
    print(f"\n🏁 FIN: {datetime.now().strftime('%H:%M:%S')}", flush=True)
