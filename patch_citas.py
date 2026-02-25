import csv
import json
import requests
import sys

def cita_to_uuid(id_cita_str):
    if not id_cita_str: return None
    import hashlib
    import uuid
    m = hashlib.md5()
    m.update(str(id_cita_str).encode('utf-8'))
    m.update(b"GELITE_CITA_v1")
    return str(uuid.UUID(m.hexdigest()))

def id_to_uuid(id_str):
    if not id_str: return None
    import hashlib
    import uuid
    m = hashlib.md5()
    m.update(str(id_str).encode('utf-8'))
    m.update(b"GELITE_ID_v1")
    return str(uuid.UUID(m.hexdigest()))

K = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDA1NDMsImV4cCI6MjA4Njc3NjU0M30.uvq4_iijnyednyezO8A7u_vhJDj7nn1bTebi2pflLR0'
U = 'https://ltfstsjfybpbtiakopor.supabase.co/rest/v1'
H_bulk = {'apikey': K, 'Authorization': f'Bearer {K}', 'Prefer': 'return=minimal,resolution=merge-duplicates'}

updates = []

with open('/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/citas.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter=',')
    for row in reader:
        id_cita_raw = row.get("IdCita", "").strip()
        if not id_cita_raw or not id_cita_raw.isdigit(): continue
        
        fecha = row.get("Fecha", "")
        if not fecha or fecha < '2025-01-01': continue
        
        # IdCol viene como numero, lo paso a UUID con el algoritmo base
        idcol_raw = str(row.get("IdCol", "")).strip()
        if idcol_raw.lower() in ["", "null", "none"]:
            idcol_uuid = None
        else:
            idcol_uuid = id_to_uuid(idcol_raw)
            
        updates.append({
            "IdCita": cita_to_uuid(id_cita_raw),
            "IdCol": idcol_uuid,
            "FecAlta": row.get("FecAlta", None) or row.get("Fecha", None)
        })

print(f"Borradores listos: {len(updates)} citas con Doctor/FecAlta extraídos y convertidos a UUID.")

batch_size = 500
for i in range(0, len(updates), batch_size):
    batch = updates[i:i+batch_size]
    res = requests.post(f'{U}/DCitas?on_conflict=IdCita', headers=H_bulk, json=batch)
    if res.status_code not in [200, 201, 204]:
        print(f"Error procesando batch {i}: {res.text}")
    else:
        print(f"Batch {i//batch_size + 1} actualizado OK. ({len(batch)} registros)")

print("Parchado completo con IdCol a UUID.")
