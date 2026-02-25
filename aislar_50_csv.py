import os
import shutil

# Lista de las 50 tablas clave que obtuvimos
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

src_dir = "/Users/juanantoniomanzanedodelgado/Documents/smilepro---rubio-garcía-dental/migration_data/"
out_dir = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/CSVs_WEB_CORE_50/"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

copiados = 0
for t in tablas_core:
    src_file = os.path.join(src_dir, f"{t.lower()}.csv")
    if os.path.exists(src_file):
        dst_file = os.path.join(out_dir, f"{t.upper()}.csv")
        shutil.copy2(src_file, dst_file)
        copiados += 1
    else:
        # Algunos archivos podrian tener mayusculas o pequeñas diferencias en el origen
        # hacemos iteración lenta pero segura
        for f in os.listdir(src_dir):
            if f.lower() == f"{t.lower()}.csv":
                dst_file = os.path.join(out_dir, f"{t.upper()}.csv")
                shutil.copy2(os.path.join(src_dir, f), dst_file)
                copiados += 1
                break

print(f"Búsqueda finalizada. Copiados {copiados}/50 archivos CSV con todos los millones de datos a la carpeta exclusiva {out_dir}")
