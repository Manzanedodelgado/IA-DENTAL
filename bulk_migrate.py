import csv
import json
import requests
import os
import uuid
import sys
import time
from datetime import datetime, timedelta

# CONFIGURACIÓN
SUPABASE_URL = "https://ltfstsjfybpbtiakopor.supabase.co/rest/v1"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDA1NDMsImV4cCI6MjA4Njc3NjU0M30.uvq4_iijnyednyezO8A7u_vhJDj7nn1bTebi2pflLR0"
BATCH_SIZE = 500

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal,resolution=merge-duplicates"
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)

BASE_PATH = "/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data"
PACIENTES_CSV = os.path.join(BASE_PATH, "pacientes.csv")
CITAS_CSV = os.path.join(BASE_PATH, "citas.csv")

# Namespace fijo para UUIDs determinísticos
NS_PAC = uuid.UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
NS_CITA = uuid.UUID("b2c3d4e5-f6a1-8901-bcde-f12345678901")

def id_to_uuid(numeric_id):
    return str(uuid.uuid5(NS_PAC, str(numeric_id)))

def cita_to_uuid(numeric_id):
    return str(uuid.uuid5(NS_CITA, str(numeric_id)))

def is_numeric(val):
    try:
        int(val)
        return True
    except:
        return False

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
            if float(val) > 10000:
                return excel_date_to_iso(val)
        except:
            pass
    # Validar que parece una fecha YYYY-MM-DD
    if len(val) == 10 and val[4] == '-' and val[7] == '-':
        return val
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

def safe_str(val, max_len=255):
    if val is None or val == 'NULL' or val == 'None': return None
    s = str(val).strip()
    return s[:max_len] if s else None

def send_batch(table_name, data, retries=3):
    conflict_col = "IdCli" if table_name == "Clientes" else "IdCita"
    url = f"{SUPABASE_URL}/{table_name}?on_conflict={conflict_col}"
    for attempt in range(retries):
        try:
            resp = SESSION.post(url, json=data, timeout=30)
            if resp.status_code in [200, 201, 204]:
                return len(data), 0
            elif resp.status_code == 400:
                # Log first error for diagnosis
                if attempt == 0:
                    err_text = resp.text[:200]
                    print(f"    [400] {err_text}", flush=True)
                return 0, len(data)
            else:
                time.sleep(1)
        except requests.exceptions.RequestException as e:
            time.sleep(2)
    return 0, len(data)

def migrate_table(csv_path, table_name, mapping_func, delimiter=','):
    print(f"\n{'='*50}", flush=True)
    print(f"  MIGRANDO: {table_name}", flush=True)
    print(f"{'='*50}", flush=True)
    
    if not os.path.exists(csv_path):
        print(f"  ERROR: No se encuentra {csv_path}")
        return

    records_dict = {}
    total_ok = 0
    total_err = 0
    total_skip = 0

    with open(csv_path, mode='r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter=delimiter)
        for row in reader:
            mapped = mapping_func(row)
            if mapped:
                pk = "IdCli" if table_name == "Clientes" else "IdCita"
                records_dict[mapped[pk]] = mapped
            else:
                total_skip += 1

            if len(records_dict) >= BATCH_SIZE:
                ok, err = send_batch(table_name, list(records_dict.values()))
                total_ok += ok
                total_err += err
                print(f"  ✅ {total_ok} OK | ⏭️ {total_skip} skip | ❌ {total_err} err", flush=True)
                records_dict = {}
        
        if records_dict:
            ok, err = send_batch(table_name, list(records_dict.values()))
            total_ok += ok
            total_err += err

    print(f"\n  🏁 {table_name}: {total_ok} migrados | {total_skip} omitidos | {total_err} errores\n", flush=True)

# --- MAPEOS ---

def map_paciente(row):
    try:
        # Usar IdPac como clave (IdCli suele ser NULL en estos CSV)
        id_pac = row.get("IdPac", "")
        if id_pac is None: return None
        id_pac = str(id_pac).strip()
        if not is_numeric(id_pac): return None
        
        nombre = safe_str(row.get("Nombre"))
        apellidos = safe_str(row.get("Apellidos"))        
        return {
            "IdCli": id_to_uuid(id_pac),
            "NumPac": id_pac,
            "Nombre": nombre or "",
            "Apellidos": apellidos or "",
            "NIF": safe_str(row.get("NIF"), 20),
            "TelMovil": safe_str(row.get("TelMovil"), 20),
            "Tel1": safe_str(row.get("Tel1"), 20),
            "Email": safe_str(row.get("Email")),
            "FecNacim": clean_date(row.get("FecNacim")),
            "Direccion": safe_str(row.get("Direccion")),
            "CP": safe_str(row.get("CP"), 10),
            "Notas": safe_str(row.get("Notas"), 500),
        }
    except:
        return None

def map_cita(row):
    try:
        id_cita_raw = row.get("IdCita", "")
        id_pac_raw = row.get("IdPac", "")
        if id_cita_raw is None or id_pac_raw is None: return None
        id_cita_raw = str(id_cita_raw).strip()
        id_pac_raw = str(id_pac_raw).strip()
        if not is_numeric(id_cita_raw) or not is_numeric(id_pac_raw): return None
        
        fecha = clean_date(row.get("Fecha"))
        if not fecha or fecha < '2025-01-01': return None
        
        dur = 30
        try: dur = int(float(row.get("Duracion", "30")))
        except: pass
        
        sit = 0
        try: sit = int(row.get("IdSitC", "0"))
        except: pass
        
        return {
            "IdCita": cita_to_uuid(id_cita_raw),
            "IdPac": id_to_uuid(id_pac_raw),  # FK → misma función que Clientes
            "Fecha": fecha,
            "HorConsul": clean_time(row.get("HorConsul")),
            "Duracion": dur,
            "Texto": safe_str(row.get("Texto"), 255) or "",
            "IdSitC": sit,
            "Confirmada": str(row.get("Confirmada", "")).lower() in ["true", "1", "t"]
        }
    except:
        return None

if __name__ == "__main__":
    print(f"🚀 VOLCADO MASIVO GELITE → SUPABASE (v5 — UUID Determinístico)", flush=True)
    print(f"   Inicio: {datetime.now().strftime('%H:%M:%S')}\n", flush=True)
    migrate_table(PACIENTES_CSV, "Clientes", map_paciente, delimiter=';')
    migrate_table(CITAS_CSV, "DCitas", map_cita, delimiter=',')
    print(f"\n🏁 FIN: {datetime.now().strftime('%H:%M:%S')}", flush=True)
