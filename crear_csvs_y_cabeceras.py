import os
import re

schema_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_WEB_50_TABLAS_CORE.md"
data_dir = "/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/"
out_dir = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50/"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

# Parse schema
tables_schema = {}
current_table = None

with open(schema_file, "r", encoding="utf-8") as f:
    for line in f:
        if line.startswith("### [TABLA]"):
            match = re.search(r"`(.*?)`", line)
            if match:
                current_table = match.group(1)
                tables_schema[current_table] = []
        elif current_table and line.startswith("| ") and "Nombre Columna" not in line and "---" not in line:
            parts = line.split("|")
            if len(parts) > 1:
                col_name = parts[1].strip()
                if col_name and not col_name.startswith("*"):
                    tables_schema[current_table].append(col_name)

# 1. Copiar los CSV que YA tienen datos masivos y están en migration_data
csvs_disponibles = {}
for root, dirs, files in os.walk(data_dir):
    for f in files:
        if f.endswith(".csv"):
            name = f.replace(".csv", "").upper()
            csvs_disponibles[name.lower()] = os.path.join(root, f)

import shutil
creados = 0

for tbl, cols in tables_schema.items():
    tbl_name = tbl.upper()
    out_csv = os.path.join(out_dir, f"{tbl_name}.csv")
    
    # Si tenemos el CSV original de datos para esta tabla, lo copiamos directamente
    if tbl.lower() in csvs_disponibles:
        shutil.copy2(csvs_disponibles[tbl.lower()], out_csv)
    else:
        # Si no había histórico de esta tabla en concreto (ej. gabinetes vacíos), creamos el CSV con sus columnas reales
        with open(out_csv, "w", encoding="utf-8") as f_out:
            f_out.write(";".join(cols) + "\n")
    creados += 1

print(f"Éxito: Se han materializado los {creados} archivos CSV en la carpeta local, poblandose con millones de datos donde correspondían existencias y construyendo las cabeceras puras de GELITE en el resto.")
