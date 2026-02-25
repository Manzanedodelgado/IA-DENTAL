import os
import csv
from glob import glob

data_dir = '/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/'
files = sorted(glob(os.path.join(data_dir, '*.csv')))

out_path = '/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/DATOS_COMPLETOS_BBDD_SQL.md'

with open(out_path, 'w', encoding='utf-8') as out:
    out.write('# EXTRACCIÓN BRUTA Y TOTAL DE DATOS SQL (GELITE)\n\n')
    out.write('Se enumeran TODAS las tablas disponibles con TODO el contenido (cada fila y cada celda) tal y como se ha exigido, ordenado por Tabla y por Columna.\n\n')
    
    for f in files:
        table_name = os.path.basename(f).replace('.csv', '')
        out.write(f'## Tabla: `{table_name}`\n\n')
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
                    # Escape pipe characters in user data
                    clean_row = [str(cell).replace('|', '\|').replace('\n', ' ') for cell in row]
                    out.write('| ' + ' | '.join(clean_row) + ' |\n')
                    row_count += 1
                
                out.write(f'\n*Total registros extraídos en {table_name}: {row_count}*\n\n')
                
        except Exception as e:
            out.write(f'*Error leyendo datos: {e}*\n\n')

print(f"Extracción masiva finalizada y guardada en: {out_path}")
