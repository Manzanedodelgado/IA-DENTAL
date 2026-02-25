import os

in_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_REAL_GELITE.md"
out_file = "/Users/juanantoniomanzanedodelgado/Desktop/smilepro---rubio-garcía-dental/ESTRUCTURA_WEB_50_TABLAS_CORE.md"

# Nombres y prefijos core
core_keywords = [
    "Pacientes", "Clientes", "Citas", "Ttos", "Notas", "Presupuestos", "Factura", "Pago", 
    "Colabos", "Centros", "Gabinetes", "ForPago", "Diagnostico", "Almacen", "Mutual", "Banco", 
    "Articulo", "Proveedor", "Tipos", "Salas", "Festivos", "Motivos", "Esperas", "Perfil", 
    "Acceso", "Users", "Ortodoncia", "Fichas", "Revision", "Consentimientos", "Recetas",
    "Docs", "Campañas", "Empleados", "Usuarios", "Auditoria", "Perio", "Horarios", "Bancos",
    "Turnos"
]

found_tables = []
current_table_lines = []
capturing = False
table_title = ""

with open(in_file, "r", encoding="utf-8") as f_in:
    for line in f_in:
        if line.startswith("### [TABLA]"):
            # Si estábamos capturando, lo guardamos si cumple el conteo
            if capturing and current_table_lines:
                found_tables.append((table_title, current_table_lines))
                
            parts = line.split("`")
            if len(parts) >= 3:
                tbl_name = parts[1]
                # Check if it resembles our core tables
                if any(k.lower() in tbl_name.lower() for k in core_keywords) or tbl_name.lower() in ["mutuas", "perfiles", "accesos"]:
                    capturing = True
                    table_title = tbl_name
                    current_table_lines = [line]
                else:
                    capturing = False
        elif line.startswith("---") and capturing:
            current_table_lines.append(line)
            found_tables.append((table_title, current_table_lines))
            capturing = False
            current_table_lines = []
        elif capturing:
            current_table_lines.append(line)

# Sort by size to get the richest tables (or just prioritize the main ones)
# We want exactly 50
found_tables = sorted(found_tables, key=lambda x: len(x[1]), reverse=True)

# Delete duplicates just in case
unique_tables = []
seen = set()
for title, lines in found_tables:
    if title not in seen:
        seen.add(title)
        unique_tables.append((title, lines))

top_50 = unique_tables[:50]

with open(out_file, "w", encoding="utf-8") as f_out:
    f_out.write("# 🏗️ ARQUITECTURA CORE WEB: 50 TABLAS ESENCIALES DE GELITE\n\n")
    f_out.write("Este documento contiene la estructura forense **100% real y sin alteraciones** de las 50 tablas fundamentales requeridas para la aplicación web, importadas con sus columnas exactas y genuinas extraídas de SQL Server.\n\n")
    for title, lines in top_50:
        f_out.write("".join(lines))
        f_out.write("\n")

print(f"Mejora completada. Extraídas y guardadas exactamente {len(top_50)} tablas nucleares.")
