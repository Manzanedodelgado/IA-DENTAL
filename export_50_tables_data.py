import os
import csv
from glob import glob
import sys

# Aumentamos el límite global de tamaño de campo CSV porque algunas celdas (ej. firmas en base64) son gigantes
csv.field_size_limit(sys.maxsize)

data_dir = '/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50/'
files = sorted(glob(os.path.join(data_dir, '*.csv')))

out_path = '/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/DATOS_50_TABLAS_CORE.md'

with open(out_path, 'w', encoding='utf-8') as out:
    out.write('# 🚨 EXTRACCIÓN BRUTA Y TOTAL DE DATOS SQL (50 TABLAS CORE)\n\n')
    out.write('Se enumeran las 50 tablas core fundamentales con TODO su contenido (cada fila y cada celda) tal y como se ha ordenado.\n\n')
    
    for f in files:
        table_name = os.path.basename(f).replace('.csv', '')
        out.write(f'## Tabla: `{table_name}`\n\n')
        try:
            with open(f, 'r', encoding='utf-8', errors='replace') as csvfile:
                # Primero, intentar detectar el delimitador en la cabecera
                # Vamos a leer los primeros 1024 caracteres para ver qué hay
                muestra = csvfile.read(1024)
                csvfile.seek(0)
                
                if not muestra:
                    out.write('*Tabla vacía*\n\n')
                    continue
                    
                delim = ','
                if '|' in muestra.split('\n')[0]:
                    delim = '|'
                elif ';' in muestra.split('\n')[0] and ',' not in muestra.split('\n')[0]:
                    delim = ';'
                
                reader = csv.reader(csvfile, delimiter=delim)
                
                try:
                    headers = next(reader)
                except StopIteration:
                    out.write('*Tabla vacía*\n\n')
                    continue
                
                if not headers:
                    continue
                
                # Headers
                out.write('| ' + ' | '.join(h.replace('\ufeff', '').strip() for h in headers) + ' |\n')
                # Separator
                out.write('|' + '|'.join(['---'] * len(headers)) + '|\n')
                
                # Rows
                row_count = 0
                for row in reader:
                    # Limpiamos los saltos de línea y pipes de cada celda para no romper el markdown
                    clean_row = [str(cell).replace('|', '\|').replace('\n', ' ').replace('\r', '') for cell in row]
                    out.write('| ' + ' | '.join(clean_row) + ' |\n')
                    row_count += 1
                
                out.write(f'\n*Total registros consolidados en {table_name}: {row_count}*\n\n')
                
        except Exception as e:
            out.write(f'*Error leyendo datos: {e}*\n\n')

print(f"✅ Extracción masiva finalizada y guardada en {out_path}")
