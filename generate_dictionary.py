import os
import csv
from glob import glob

data_dir = '/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/'
files = sorted(glob(os.path.join(data_dir, '*.csv')))

md_content = ['# Diccionario Estricto de la Base de Datos Original SQL (GELITE)\n\n']
md_content.append('Este documento contiene la estructura **exacta, original y nativa** extraída del servidor origen/SQL Manager de GELITE.\n')
md_content.append('Se enumeran todas las tablas recuperadas y absolutamente todas las columnas (campos) que cada una de ellas contiene, sin excluir ningún dato histórico o parámetro de configuración.\n\n')

for f in files:
    table_name = os.path.basename(f).replace('.csv', '')
    md_content.append(f'## Tabla: `{table_name}`\n')
    try:
        with open(f, 'r', encoding='utf-8') as csvfile:
            head = csvfile.readline().strip()
            # Try to detect delimiter
            if ';' in head and ',' not in head:
                delim = ';'
            elif ',' in head and ';' not in head:
                delim = ','
            elif head.count(';') > head.count(','):
                delim = ';'
            else:
                delim = ','
                
            csvfile.seek(0)
            reader = csv.reader(csvfile, delimiter=delim)
            headers = next(reader)
            
            if not headers: 
                md_content.append('*Tabla vacía o sin columnas legibles.*\n\n')
                continue
            
            md_content.append('| Columna Original SQL |')
            md_content.append('| --- |')
            for h in headers:
                clean_h = str(h).replace('\ufeff', '').strip()
                if clean_h:
                    md_content.append(f'| `{clean_h}` |')
            md_content.append('\n')
    except Exception as e:
        md_content.append(f'*Error leyendo archivo: {e}*\n\n')

out_path = '/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_GELITE_COMPLETA.md'
with open(out_path, 'w', encoding='utf-8') as out:
    out.write('\n'.join(md_content))

print(f"Diccionario masivo generado correctamente con {len(files)} tablas en: {out_path}")
