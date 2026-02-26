#!/usr/bin/env python3
"""
migrate_catalogo_tratamientos.py (v2)
Extrae tratamientos RAÍZ únicos de TtosMed.Notas.
Elimina número de pieza, texto libre, cobros, etc.
Solo inserta la raíz del tratamiento (ej: "OBTURACION", "IMPLANTE ENDOSEO").
"""
import urllib.request, json, re
from collections import Counter

KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIwMDU0MywiZXhwIjoyMDg2Nzc2NTQzfQ.DPKKLmvnyOKDQng5Q-2sAGC4mXe7fMrPKPCrBaMsr5I'
BASE = 'https://ltfstsjfybpbtiakopor.supabase.co/rest/v1'

# ── 1) Extraer notas de TtosMed ───────────────────────────────────────────
print("Extrayendo tratamientos de TtosMed...")
raw_list = []
offset = 0
while True:
    url = f'{BASE}/TtosMed?select=Notas&CId=eq.EntradaMedicaTratamiento&offset={offset}&limit=1000'
    resp = urllib.request.urlopen(urllib.request.Request(url, headers={
        'apikey': KEY, 'Authorization': f'Bearer {KEY}'
    }))
    data = json.loads(resp.read())
    if not data:
        break
    for r in data:
        n = (r.get('Notas') or '').strip()
        if n:
            raw_list.append(n)
    offset += 1000

print(f"  {len(raw_list)} entradas con Notas no vacías")

# ── 2) Extraer RAÍZ del tratamiento ──────────────────────────────────────
def extract_root(raw: str) -> str:
    """Extrae solo el nombre base del tratamiento, eliminando:
    - Número de pieza (#XX)
    - Paréntesis vacíos ()
    - PAGO: / Cobro / Cobro de
    - Números sueltos (precios, IDs)
    - Texto libre después de punto o coma
    """
    s = raw.strip()
    
    # Descartar entradas de pago/cobro
    if re.match(r'^(PAGO|Cobro|Ingreso|FACTURA|Devolución|Recibo|ANTICIPO)', s, re.I):
        return ''
    
    # Quitar "Cobro de " prefix → dejar solo el tratamiento
    s = re.sub(r'^Cobro\s+de\s+', '', s, flags=re.I)
    
    # Quitar número de pieza: #11, #36, etc.
    s = re.sub(r'\s*#\d{1,2}\b', '', s)
    
    # Quitar pieza entre paréntesis: (36), (11), (PIEZA 36)
    s = re.sub(r'\s*\(\s*(?:pieza\s*)?\d{1,2}\s*\)', '', s, flags=re.I)
    
    # Quitar paréntesis vacíos
    s = re.sub(r'\s*\(\s*\)\s*', '', s)
    
    # Quitar contenido libre entre paréntesis (notas del doctor)
    s = re.sub(r'\s*\([^)]{10,}\)', '', s)
    
    # Quitar todo después de ' - ' (suele ser nota libre)
    s = re.sub(r'\s+-\s+.+$', '', s)
    
    # Quitar números sueltos (precios)
    if re.match(r'^\d+\.?\d*$', s.strip()):
        return ''
    
    # Normalizar espacios
    s = re.sub(r'\s+', ' ', s).strip()
    
    # Quitar trailing numbers (ej "LIMPIEZA 2")
    s = re.sub(r'\s+\d+$', '', s)
    
    # Longitud mínima
    if len(s) < 3:
        return ''
    
    return s.upper()

root_counts = Counter()
for raw in raw_list:
    root = extract_root(raw)
    if root:
        root_counts[root] += 1

print(f"  Raíces de tratamiento únicas: {len(root_counts)}")
print(f"\n  Top 20:")
for name, cnt in root_counts.most_common(20):
    print(f"    [{cnt:5d}x] {name}")

# ── 3) Inferir categoría y tipo_aplicación ────────────────────────────────
def infer_categoria(name: str) -> str:
    n = name.lower()
    if any(w in n for w in ['implante', 'osteo', 'interfase', 'aditamento', 'seno', 'prgf', 'plasma', 'membrana', 'pilar']):
        return 'Implantología'
    if any(w in n for w in ['ortodoncia', 'retenedor', 'bracket', 'alineador', 'mensualid', 'arco']):
        return 'Ortodoncia'
    if any(w in n for w in ['endodoncia', 'conducto', 'pulp', 'apicoformación']):
        return 'Endodoncia'
    if any(w in n for w in ['curetaje', 'periodoncia', 'raspado', 'sondaje', 'periodontal']):
        return 'Periodoncia'
    if any(w in n for w in ['prótesis', 'corona', 'puente', 'póntico', 'prostodoncia', 'resina', 'esquelético', 'provisional', 'parcial', 'completa']):
        return 'Prostodoncia'
    if any(w in n for w in ['cirugía', 'exodoncia', 'extracción', 'alvéolo', 'quist', 'frenillo', 'biopsia', 'apicectomía']):
        return 'Cirugía Oral'
    if any(w in n for w in ['blanqueamiento', 'carilla', 'estétic']):
        return 'Estética Dental'
    if any(w in n for w in ['limpieza', 'higiene', 'tartrectomía', 'profilaxis', 'fluorización', 'fluor']):
        return 'Higiene'
    if any(w in n for w in ['radiografía', 'panorámica', 'rx ', 'tac', 'cbct', 'periapical', 'serie']):
        return 'Radiología'
    if any(w in n for w in ['obturación', 'obturacion', 'reconstruccion', 'reconstrucción', 'empaste', 'incrustación', 'sellador']):
        return 'Odontología Conservadora'
    if any(w in n for w in ['férula', 'ferula', 'descarga', 'bruxismo', 'atm']):
        return 'ATM / Férulas'
    if any(w in n for w in ['primera visita', 'revisión', 'revision', 'consulta', 'diagnóstico', 'estudio']):
        return 'Consulta'
    return 'General'

def infer_tipo(name: str) -> str:
    n = name.lower()
    if any(w in n for w in ['por cuadrante', 'cuadrante']):
        return 'cuadrante'
    if any(w in n for w in ['por arcada', 'arcada']):
        return 'arcada'
    if any(w in n for w in ['obturación', 'obturacion', 'reconstruccion', 'reconstrucción', 'endodoncia',
                             'corona', 'implante', 'exodoncia', 'extracción', 'apicectomía',
                             'perno', 'incrustación', 'carilla', 'sellador', 'apicoformación',
                             'sobreimplante', 'pilar']):
        return 'pieza'
    return 'boca'

# ── 4) Borrar catálogo anterior ───────────────────────────────────────────
print("\n  Borrando catálogo anterior...")
req = urllib.request.Request(
    f'{BASE}/catalogo_tratamientos?id=gt.0',
    method='DELETE',
    headers={'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
)
try:
    urllib.request.urlopen(req)
    print("  ✅ Catálogo anterior borrado")
except Exception as e:
    print(f"  ⚠️ Error borrando: {e}")

# ── 5) Preparar e insertar ────────────────────────────────────────────────
rows = []
for name, cnt in root_counts.most_common():
    cat = infer_categoria(name)
    tipo = infer_tipo(name)
    rows.append({
        'nombre': name,
        'categoria': cat,
        'tipo_aplicacion': tipo,
        'precio': 0,
        'activo': True,
        'orden': cnt,
    })

print(f"\n  Insertando {len(rows)} tratamientos raíz...")

BATCH = 50
inserted = 0
for i in range(0, len(rows), BATCH):
    batch = rows[i:i+BATCH]
    payload = json.dumps(batch).encode()
    req = urllib.request.Request(
        f'{BASE}/catalogo_tratamientos',
        data=payload,
        method='POST',
        headers={
            'apikey': KEY,
            'Authorization': f'Bearer {KEY}',
            'Content-Type': 'application/json',
            'Prefer': 'resolution=ignore-duplicates',
        }
    )
    try:
        urllib.request.urlopen(req)
        inserted += len(batch)
    except Exception as e:
        body = ''
        try: body = e.read().decode()[:200]
        except: pass
        print(f"  ❌ Error en batch {i}: {body}")

print(f"\n✅ Insertados {inserted} tratamientos raíz en catalogo_tratamientos")
print(f"\nCategorías:")
cat_counts = Counter(r['categoria'] for r in rows)
for cat, cnt in cat_counts.most_common():
    print(f"  {cat}: {cnt}")
print(f"\nTipos:")
tipo_counts = Counter(r['tipo_aplicacion'] for r in rows)
for t, cnt in tipo_counts.items():
    print(f"  {t}: {cnt}")
