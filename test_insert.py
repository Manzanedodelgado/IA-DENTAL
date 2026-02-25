import csv
import json
import requests
import os
import sys
from datetime import datetime, timedelta

SUPABASE_URL = "https://ltfstsjfybpbtiakopor.supabase.co/rest/v1"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDA1NDMsImV4cCI6MjA4Njc3NjU0M30.uvq4_iijnyednyezO8A7u_vhJDj7nn1bTebi2pflLR0"
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal,resolution=merge-duplicates"
}

CSV_FILE = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50/Pacientes.csv"

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

def clean_value(val):
    if val is None or val == 'NULL' or val == 'None' or val == '':
        return None
    return val

with open(CSV_FILE, mode='r', encoding='utf-8-sig', errors='replace') as f:
    first_line = f.readline()
    delimiter = ';' if ';' in first_line else ','
    f.seek(0)
    reader = csv.DictReader(f, delimiter=delimiter)
    
    first_row = next(reader)
    cleaned_row = {}
    for k, v in first_row.items():
        if k is None: continue
        k = k.strip()
        if not k: continue
        val = clean_value(v)
        
        if val and str(val).lower() in ['true', 'false']:
            val = str(val).lower() == 'true'
        elif val and ('Fec' in k or 'Date' in k or k in ['Inactivo', 'Exitus', 'Dispensada', 'Anulada', 'Aceptada', 'AnulacionGestionada', '_fechareg']):
            val = clean_date(val)
            
        cleaned_row[k] = val

print("Enviando fila 1 a Pacientes...")
resp = requests.post(
    f"{SUPABASE_URL}/Pacientes?on_conflict=IdPac",
    headers=HEADERS,
    json=[cleaned_row]
)
print("STATUS:", resp.status_code)
print("RESPONSE:", resp.text)
