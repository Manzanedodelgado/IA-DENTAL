import csv
import json
import requests
import os
import uuid
import sys
import time
from datetime import datetime, timedelta

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

# NAMESPACES PARA UUID DETERMINISTICOS (DEBEN COINCIDIR CON bulk_migrate.py PARA FKs)
NS_PAC = uuid.UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
NS_NOTA = uuid.UUID("c3d4e5f6-a1b2-8901-bcde-f12345678901")
NS_TTO = uuid.UUID("d4e5f6a1-b2c3-9012-cdef-123456789012")
NS_PRESU = uuid.UUID("e5f6a1b2-c3d4-0123-def0-234567890123")
NS_PRESUTTO = uuid.UUID("f6a1b2c3-d4e5-1234-ef01-345678901234")
NS_FAC = uuid.UUID("a1b2c3d4-e5f6-2345-f012-456789012345")
NS_PAGO = uuid.UUID("b2c3d4e5-f6a1-3456-0123-567890123456")

def id_to_uuid_pac(numeric_id): return str(uuid.uuid5(NS_PAC, str(numeric_id))) if numeric_id else None
def id_to_uuid_nota(numeric_id): return str(uuid.uuid5(NS_NOTA, str(numeric_id))) if numeric_id else None
def id_to_uuid_tto(numeric_id): return str(uuid.uuid5(NS_TTO, str(numeric_id))) if numeric_id else None
def id_to_uuid_presu(numeric_id): return str(uuid.uuid5(NS_PRESU, str(numeric_id))) if numeric_id else None
def id_to_uuid_presutto(numeric_id): return str(uuid.uuid5(NS_PRESUTTO, str(numeric_id))) if numeric_id else None
def id_to_uuid_fac(numeric_id): return str(uuid.uuid5(NS_FAC, str(numeric_id))) if numeric_id else None
def id_to_uuid_pago(numeric_id): return str(uuid.uuid5(NS_PAGO, str(numeric_id))) if numeric_id else None

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
    val = str(val).strip().split(' ')[0]
    if not val: return None
    if val.replace('.','',1).isdigit() and len(val) >= 4:
        try:
            if float(val) > 10000: return excel_date_to_iso(val)
        except: pass
    if len(val) == 10 and val[4] == '-' and val[7] == '-': return val
    if len(val) >= 8 and '-' in val: return val # YYYY-MM-DD
    return None

def safe_str(val, max_len=None):
    if val is None or val == 'NULL' or val == 'None': return None
    s = str(val).strip()
    return s[:max_len] if max_len and s else (s if s else None)

def safe_float(val, default=0):
    try: return float(val)
    except: return default

def send_batch(table_name, conflict_col, data, retries=3):
    url = f"{SUPABASE_URL}/{table_name}?on_conflict={conflict_col}"
    for attempt in range(retries):
        try:
            resp = SESSION.post(url, json=data, timeout=30)
            if resp.status_code in [200, 201, 204]:
                return len(data), 0
            elif resp.status_code == 400:
                if attempt == 0:
                    print(f"    [400] {resp.text[:200]}", flush=True)
                return 0, len(data)
            else:
                time.sleep(1)
        except requests.exceptions.RequestException:
            time.sleep(2)
    return 0, len(data)

def migrate_table(csv_name, table_name, conflict_col, mapping_func):
    path = os.path.join(BASE_PATH, csv_name)
    print(f"\n{'='*50}\n  MIGRANDO: {table_name}\n{'='*50}", flush=True)
    if not os.path.exists(path):
        print(f"  ERROR: No se encuentra {path}")
        return

    records_dict = {}
    total_ok = 0
    total_err = 0
    total_skip = 0

    with open(path, mode='r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter='|')
        # Separador sqlcmd ("---") en BDs legacy
        first_row_check = True
        
        for row in reader:
            if first_row_check:
                first_row_check = False
                # If the first row is just dashes, skip it
                if any(k and v and v.replace('-', '') == '' for k, v in row.items()):
                    continue
            
            mapped = mapping_func(row)
            if mapped and conflict_col in mapped:
                records_dict[mapped[conflict_col]] = mapped
            else:
                total_skip += 1

            if len(records_dict) >= BATCH_SIZE:
                ok, err = send_batch(table_name, conflict_col, list(records_dict.values()))
                total_ok += ok
                total_err += err
                print(f"  ✅ {total_ok} OK | ⏭️ {total_skip} skip | ❌ {total_err} err", flush=True)
                records_dict = {}
        
        if records_dict:
            ok, err = send_batch(table_name, conflict_col, list(records_dict.values()))
            total_ok += ok
            total_err += err

    print(f"\n  🏁 {table_name}: {total_ok} migrados | {total_skip} omitidos | {total_err} errores\n", flush=True)

# ----------------- MAPEOS -----------------

def map_agdnotas(row):
    id_nota = safe_str(row.get("IdNota"))
    if not id_nota or not is_numeric(id_nota): return None
    id_usu = safe_str(row.get("IdUsu"))
    id_centro = safe_str(row.get("IdCentro"))
    id_pac_raw = id_usu if (id_usu and id_usu != 'NULL') else id_centro
    if not id_pac_raw or not is_numeric(id_pac_raw): return None

    return {
        "IdNota": id_to_uuid_nota(id_nota),
        "IdPac": id_to_uuid_pac(id_pac_raw),
        "Fecha": clean_date(row.get("Fecha")) or "2020-01-01",
        "Nota": safe_str(row.get("Nota")) or "",
        "IdUsu": None  # Evitamos FK error con doctores no existentes por ahora
    }

def map_ttosmed(row):
    id_pac = safe_str(row.get("IdPac"))
    num_tto = safe_str(row.get("NumTto"))
    if not id_pac or not num_tto or not is_numeric(id_pac): return None
    
    id_tto_raw = f"{id_pac}_{num_tto}"
    return {
        "IdTratamiento": id_to_uuid_tto(id_tto_raw),
        "IdPac": id_to_uuid_pac(id_pac),
        "Piezas": safe_str(row.get("PiezasAdu", "0")),
        "DescripMed": safe_str(row.get("ZonasBoca", "")) or "Tratamiento Gelite",
        "DescripPac": safe_str(row.get("Notas", "")) or "Tratamiento histórico"
    }

def map_presu(row):
    num_pre = safe_str(row.get("NumPre"))
    id_pac = safe_str(row.get("IdPac"))
    if not num_pre or not id_pac or not is_numeric(id_pac): return None
    
    return {
        "NumPre": id_to_uuid_presu(num_pre),
        "IdPac": id_to_uuid_pac(id_pac),
        "FecPresup": clean_date(row.get("FecPresup")) or "2020-01-01",
        "Estado": safe_str(row.get("Estado", "1")),
        "Notas": safe_str(row.get("Titulo", "")) or safe_str(row.get("Notas", "")) or "Presupuesto histórico"
    }

def map_presutto(row):
    num_pre = safe_str(row.get("NumPre"))
    lin_pre = safe_str(row.get("LinPre"))
    if not num_pre or not lin_pre: return None
    
    id_raw = f"{num_pre}_{lin_pre}"
    return {
        "Id": id_to_uuid_presutto(id_raw),
        "NumPre": id_to_uuid_presu(num_pre),
        "IdTto": None,
        "Importe": safe_float(row.get("ImportePre", 0)),
        "Unidades": int(safe_float(row.get("Unidades", 1)))
    }

def map_facturas(row):
    id_fac = safe_str(row.get("Id"))
    no_emp = safe_str(row.get("No Empresa"))
    if not id_fac or not no_emp or not is_numeric(no_emp) or not is_numeric(id_fac): return None
    
    return {
        "Id": id_to_uuid_fac(id_fac),
        "No": safe_str(row.get("No", f"F-{id_fac}")),
        "IdPac": id_to_uuid_pac(no_emp),
        "Nombre fiscal": safe_str(row.get("Nombre fiscal", "Paciente")),
        "NIF_Permiso residencia": safe_str(row.get("NIF_Permiso residencia", "")),
        "Fecha Registro": clean_date(row.get("Fecha Registro")) or "2020-01-01",
        "Total": safe_float(row.get("Total", 0))
    }

idcli_to_idpac = {}
try:
    with open(os.path.join(BASE_PATH, "pacientes.csv"), 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        for r in reader:
            pac = str(r.get("IdPac", "")).strip()
            cli = str(r.get("IdCli", "")).strip()
            num = str(r.get("NumPac", "")).strip()
            if pac:
                if cli and cli != 'NULL': idcli_to_idpac[cli] = pac
                if num and num != 'NULL': idcli_to_idpac[num] = pac
except Exception as e:
    print(f"Error cargando pacientes: {e}")

def map_pagocli(row):
    id_pago = safe_str(row.get("IdPagoCli"))
    id_cli_raw = safe_str(row.get("IdCli"))
    if not id_pago or not id_cli_raw or not is_numeric(id_cli_raw) or not is_numeric(id_pago): return None
    
    # Convertir IdCli a IdPac si existe en el diccionario
    id_pac = idcli_to_idpac.get(id_cli_raw, id_cli_raw)
    
    return {
        "IdPagoCli": id_to_uuid_pago(id_pago),
        "IdBanco": None,
        "IdentTM": safe_str(row.get("IdentTM", "Cobro")),
        "Nota": safe_str(row.get("Nota", "Migración de caja")),
        "Importe": safe_float(row.get("Importe", 0)),
        "FecPago": clean_date(row.get("FecPago")) or "2020-01-01",
        "IdCli": id_to_uuid_pac(id_pac)
    }

if __name__ == "__main__":
    print(f"🚀 INICIANDO VOLCADO RESTANTE (Historial, Ttos, Facturación)", flush=True)
    
    migrate_table("pagocli.csv", "PagoCli", "IdPagoCli", map_pagocli)
    
    print("\n🏁 FINALIZADO COMPLETAMENTE")
