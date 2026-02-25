"""
Extract citas rows from DATOS_COMPLETOS_BBDD_SQL.md and push to Supabase DCitas table.
Handles OLE Automation dates, integer fields, and cleans timestamp-typed columns.
"""
import re, json, requests, datetime

SUPABASE_URL = "https://ltfstsjfybpbtiakopor.supabase.co/rest/v1"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIwMDU0MywiZXhwIjoyMDg2Nzc2NTQzfQ.DPKKLmvnyOKDQng5Q-2sAGC4mXe7fMrPKPCrBaMsr5I"
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal,resolution=merge-duplicates",
}

SRC_FILE = "DATOS_COMPLETOS_BBDD_SQL.md"

# OLE Automation date -> YYYYMMDD integer for Fecha column
OLE_EPOCH = datetime.date(1899, 12, 30)
def ole_to_yyyymmdd(ole_val):
    try:
        d = OLE_EPOCH + datetime.timedelta(days=int(ole_val))
        return int(f"{d.year}{d.month:02d}{d.day:02d}")
    except:
        return None

print(f"📂 Parsing {SRC_FILE}...")

rows = []
cols = []
in_citas = False

with open(SRC_FILE, 'r', encoding='utf-8', errors='replace') as f:
    for line in f:
        line = line.rstrip('\n')
        if re.match(r"## Tabla: `citas`", line, re.IGNORECASE):
            in_citas = True
            continue
        if in_citas and re.match(r"## Tabla:", line):
            break
        if not in_citas:
            continue
        if line.startswith('| IdUsu') or line.startswith('| Columna'):
            raw_cols = [c.strip() for c in line.split('|')]
            cols = [c for c in raw_cols if c and c not in ('Columna',)]
            continue
        if re.match(r'^\|[-| ]+\|?$', line):
            continue
        if line.startswith('|') and cols:
            clean_line = line.replace('\\|', '≡').replace('\\n', ' ')
            cells = [c.strip().replace('≡', '|') for c in clean_line.split('|')]
            cells = [c for c in cells if c != '']
            if len(cells) < 2:
                continue
            rec = {}
            for i, col in enumerate(cols):
                val = cells[i].strip() if i < len(cells) else None
                if val in (None, 'NULL', 'None', '', 'null'): val = None
                rec[col] = val
            rows.append(rec)

print(f"  Rows parsed: {len(rows)}")
if not rows:
    print("❌ No rows found!"); exit(1)

# Column types:
# Column types from exact Postgres schema
INT_COLS = ['IdUsu','IdOrden','Hora','Duracion','IdSitC','IdPac','HorLlegada','Retraso',
            'HorConsul','HorFinal','IdCitasP','NumOcur','CantIntegGrp','IdUserIns',
            'IdCli','IdRef','IdProced','IdPartner','IdCita','IdCia','IdTipoEspec','IdCol',
            'IdCentro','IdGrAgdOpc','IdMotivoAnulacion','IdIcono','NumActos1Tto','IdTarifa',
            'TipoDocIdent','IdPaisIdent','Id_MotivoCitacion','IdOrigenIns','IdOrden_Bloqueado',
            'OrigenAnulacion','Recordada','Confirmada','IdBox']

# These are timestamp columns in Postgres — all have OLE int data, must be nulled
TIMESTAMP_COLS = ['FecAlta','FecNacim','Aceptada','HorSitCita',
                  'EnviarRecordatorio','EnviarConfirmacion','AnulacionGestionada']

# True boolean column
BOOL_COLS = ['Gratuita']

converted = []
for rec in rows:
    r = {}
    for col, val in rec.items():
        if col == 'Fecha':
            r[col] = ole_to_yyyymmdd(val) if val else None
        elif col in TIMESTAMP_COLS:
            r[col] = None  # Drop OLE integer timestamps
        elif col in INT_COLS:
            if val and str(val).lstrip('-').isdigit():
                r[col] = int(val)
            else:
                r[col] = None
        elif col in BOOL_COLS:
            # DCitas schema uses text columns for flags — keep as T/F strings
            if val in ('T', '1', 'True', 'true'): r[col] = 'T'
            elif val in ('F', '0', 'False', 'false'): r[col] = 'F'
            else: r[col] = None
        else:
            r[col] = val
    converted.append(r)

# Deduplicate on (IdUsu, IdOrden)
seen = {}
for r in converted:
    k = (r.get('IdUsu'), r.get('IdOrden'))
    if k[0] is not None and k[1] is not None:
        seen[k] = r

deduped = list(seen.values())
print(f"  Unique citas after dedup: {len(deduped)}")
print(f"  Sample: {list(deduped[0].items())[:8]}")

# Upload in batches of 500
BATCH = 500
ok, err = 0, 0
for i in range(0, len(deduped), BATCH):
    batch = deduped[i:i+BATCH]
    resp = requests.post(
        f"{SUPABASE_URL}/DCitas?on_conflict=IdUsu,IdOrden",
        headers=HEADERS,
        json=batch
    )
    if resp.status_code in (200, 201):
        ok += len(batch)
        print(f"  ✅ {ok} OK")
    else:
        err += len(batch)
        print(f"  ❌ HTTP {resp.status_code}: {resp.text[:250]}")
        break  # Stop on first error to show details

print(f"\n🏁 DCitas: {ok} migradas | {err} errores")
