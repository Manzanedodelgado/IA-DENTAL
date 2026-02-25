import os
import re

csv_dir = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50"
files_to_fix = ["PACIENTES.csv", "PRESU.csv", "PRESUTTO.csv", "TTOSMED.csv", "PAGOCLI.csv", "AGDNOTAS.csv"]

for fname in files_to_fix:
    fpath = os.path.join(csv_dir, fname)
    if not os.path.exists(fpath): continue
    
    with open(fpath, 'r', encoding='utf-8-sig', errors='replace') as f:
        lines = f.readlines()
        
    if not lines: continue
    
    header = lines[0]
    delimiter = '|' if '|' in header else ';' if ';' in header else ','
    
    fixed_lines = [header.strip()]
    current_row = ""
    
    # Pattern to match Start of Row: Number followed by delimiter, or NULL followed by delimiter
    pattern = re.compile(r'^(\d+|NULL)' + re.escape(delimiter))
    
    for line in lines[1:]:
        if pattern.match(line):
            if current_row:
                fixed_lines.append(current_row.strip())
            current_row = line.rstrip('\n')
        else:
            if current_row:
                current_row += " " + line.rstrip('\n')
            else:
                current_row = line.rstrip('\n')
                
    if current_row:
        fixed_lines.append(current_row.strip())
        
    # Write back the fixed lines
    with open(fpath, 'w', encoding='utf-8-sig') as f:
        for fl in fixed_lines:
            f.write(fl + '\n')
            
    print(f"✅ Fixed {fname}: Original Lines: {len(lines)} | Reconstructed Rows: {len(fixed_lines)-1}")

