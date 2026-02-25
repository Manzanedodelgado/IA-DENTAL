import os

in_data_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/DATOS_COMPLETOS_BBDD_SQL.md"
out_dir = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50/"

tablas_core = [
    "pacientes", "clientes", "dcitas", "ttosmed", "agdnotas", 
    "presu", "presutto", "facturas", "pagocli", "tcolabos", 
    "mutuas", "centros", "gabinetes", "tforpago", "tdiagnosticos", 
    "agdcuadromedico", "agdclasificacionusu", "almacenes", "bancos", "tarticulo", 
    "proveedores", "tiposcita", "salasespera", "turnosdoc", "horarioscentro", 
    "festivos", "motivosanulacion", "listasespera", "perfiles", "accesos", 
    "tusers", "tusuagd", "citas_recor", "orto_estudios", "orto_revisiones", 
    "consentimientos_firmas", "anamnesis_resp", "recetas_cab", "tdocsadjuntos", "fotografias_clinicas",
    "albaranesprov_cab", "pedidosprov_cab", "empleados", "crm_campanyas", "tareas", 
    "usuarios", "sysvariables", "sysauditoria_log", "fact_mutuas_cab", "perio_fichas"
]
target_set = set(tablas_core)

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

current_table = None
f_out = None

print("Particionando datos masivos en archivos CSV...")

with open(in_data_file, "r", encoding="utf-8") as f_in:
    for line in f_in:
        line_s = line.strip()
        
        # Reconocer el inicio de tabla
        if line_s.startswith("## Tabla:"):
            tbl_name = line_s.replace("## Tabla:", "").strip().lower()
            
            # Cerrar archivo previo si existía
            if f_out:
                f_out.close()
                f_out = None
                
            if tbl_name in target_set:
                current_table = tbl_name
                out_path = os.path.join(out_dir, f"{tbl_name.upper()}.csv")
                f_out = open(out_path, "w", encoding="utf-8")
            else:
                current_table = None
        
        elif current_table and f_out and line_s.startswith("|"):
            # Es una línea de tabla markdown.
            # Quitamos los pipes iniciales y finales y reemplazamos los intermedios con CSV estandard (ej: ;)
            # Ojo con descartar la linea separadora "---"
            if "---" in line_s and "|---" in line_s:
                pass # skip separator
            else:
                # Quitar pipe inicial y final
                row_raw = line_s
                if row_raw.startswith("|"): row_raw = row_raw[1:]
                if row_raw.endswith("|"): row_raw = row_raw[:-1]
                
                # Split and clean fields
                fields = [f.strip() for f in row_raw.split("|")]
                
                # Joinear con ';' para generar CSV formato europeo
                csv_line = ";".join(fields)
                
                f_out.write(csv_line + "\n")

if f_out:
    f_out.close()

import glob
files = glob.glob(os.path.join(out_dir, "*.csv"))
print(f"Extracción exitosa. {len(files)} archivos CSV generados y consolidados en {out_dir}")
