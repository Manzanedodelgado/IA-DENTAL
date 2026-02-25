import csv
import json
import requests
import hashlib
import uuid
import re
from datetime import datetime

def cita_to_uuid(id_cita_str):
    if not id_cita_str: return None
    m = hashlib.md5()
    m.update(str(id_cita_str).encode('utf-8'))
    m.update(b"GELITE_CITA_v1")
    return str(uuid.UUID(m.hexdigest()))

def id_to_uuid(id_str):
    if not id_str: return None
    m = hashlib.md5()
    m.update(str(id_str).encode('utf-8'))
    m.update(b"GELITE_ID_v1")
    return str(uuid.UUID(m.hexdigest()))

def clean_date(d_str):
    if not d_str: return None
    try:
        val = float(d_str.replace(',', '.'))
        from datetime import timedelta
        dt = datetime(1899, 12, 30) + timedelta(days=val)
        return dt.strftime('%Y-%m-%d %H:%M:%S')
    except:
        pass
    
    # Intenta DD/MM/YY HH:MM o similares
    match = re.search(r'(\d+)[/-](\d+)[/-](\d+)', d_str)
    if match:
        p1, p2, p3 = match.groups()
        # asumiendo DD/MM/YYYY o DD/MM/YY
        if len(p3) == 4:
            y, m, d = p3, p2, p1
        elif len(p1) == 4:
            y, m, d = p1, p2, p3
        else:
            y = "20" + p3 if len(p3) == 2 else p3
            m, d = p2, p1
        
        # Validar rangos simples
        if int(m) > 12: m, d = d, m # swap si es American format
        if int(m) <= 12 and int(d) <= 31:
            return f"{y}-{m.zfill(2)}-{d.zfill(2)} 00:00:00"
            
    return None

K = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDA1NDMsImV4cCI6MjA4Njc3NjU0M30.uvq4_iijnyednyezO8A7u_vhJDj7nn1bTebi2pflLR0'
U = 'https://ltfstsjfybpbtiakopor.supabase.co/rest/v1'
H_bulk = {'apikey': K, 'Authorization': f'Bearer {K}', 'Prefer': 'return=minimal,resolution=merge-duplicates'}

updates = {}

csv_file = '/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/citas.csv'

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter=',')
    for row in reader:
        id_cita_raw = str(row.get("IdCita", "")).strip()
        if not id_cita_raw or not id_cita_raw.isdigit(): continue
        
        fecha = clean_date(row.get("Fecha", ""))
        if not fecha or fecha < '2025-01-01': continue
        
        idcol_raw = str(row.get("IdCol", "")).strip()
        idcol_uuid = None
        if idcol_raw and idcol_raw.lower() not in ["null", "none"]:
            idcol_uuid = id_to_uuid(idcol_raw)
            
        notas = row.get("NOTAS", "")
        fec_alta = clean_date(row.get("FecAlta", ""))
        # if fec_alta is invalid, skip it so it doesn't break postgres
        
        c_uuid = cita_to_uuid(id_cita_raw)
        
        obj = {
            "IdCita": c_uuid,
            "IdCol": idcol_uuid,
            "NOTAS": notas[:500] if notas else ""
        }
        if fec_alta: 
            obj["FecAlta"] = fec_alta
            
        updates[c_uuid] = obj

updates_list = list(updates.values())
print(f"Total citas únicas a parchear arreglando fechas: {len(updates_list)}")

batch_size = 500
for i in range(0, len(updates_list), batch_size):
    batch = updates_list[i:i+batch_size]
    res = requests.post(f'{U}/DCitas?on_conflict=IdCita', headers=H_bulk, json=batch)
    if res.status_code not in [200, 201, 204]:
        print(f"Error procesando batch {i}: {res.status_code} - {res.text}")
    else:
        print(f"Batch {i//batch_size + 1} actualizado OK. ({len(batch)} registros)")

print("Parchado FINALIZADO en Supabase.")
