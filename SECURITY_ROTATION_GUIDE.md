# GUÍA DE ROTACIÓN DE CREDENCIALES

**URGENTE**: Archivo `.env` fue expuesto en el repositorio Git.  
**Acción requerida**: Rotar TODAS las credenciales inmediatamente.

---

## CREDENCIALES A ROTAR

### 1. Database Credentials

**Ubicación**: SQL Server GELITE  
**Variables afectadas**: `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_INSTANCE`, `DB_NAME`

**Pasos**:
```sql
-- Conectar a SQL Server Management Studio
-- Ejecutar:
ALTER LOGIN [usuario_actual] WITH PASSWORD = 'nueva_contraseña_segura';
```

**Actualizar en `.env`**:
```bash
DB_PASSWORD=nueva_contraseña_segura
```

---

### 2. JWT Secrets

**Variables afectadas**: `JWT_SECRET`, `SESSION_SECRET`, `NEXTAUTH_SECRET`

**Generar nuevos secrets**:
```bash
# En terminal (Mac/Linux)
openssl rand -base64 32

# O en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Actualizar en `.env`**:
```bash
JWT_SECRET=nuevo_secret_generado_1
SESSION_SECRET=nuevo_secret_generado_2
NEXTAUTH_SECRET=nuevo_secret_generado_3
```

---

### 3. Google API Key

**Variable afectada**: `GOOGLE_API_KEY`

**Pasos**:
1. Ir a https://aistudio.google.com/apikey
2. **Revocar** la API key actual
3. Crear una nueva API key
4. Copiar la nueva key

**Actualizar en `.env`**:
```bash
GOOGLE_API_KEY=nueva_api_key_de_google
```

---

### 4. NextAuth URL

**Variable afectada**: `NEXTAUTH_URL`

**Verificar configuración**:
```bash
# Desarrollo
NEXTAUTH_URL=http://localhost:3000

# Producción (Vercel)
NEXTAUTH_URL=https://tu-dominio.vercel.app
```

---

## VERIFICACIÓN POST-ROTACIÓN

### 1. Verificar que `.env` NO está en Git

```bash
cd "/Users/juanantoniomanzanedodelgado/Desktop/AGENTE IA"

# Verificar que .env está en .gitignore
grep "^\.env$" .gitignore

# Verificar que .env NO está staged
git status | grep ".env"
# No debe mostrar nada
```

### 2. Actualizar Vercel (si aplica)

```bash
# Ir a Vercel Dashboard
# Project Settings → Environment Variables
# Actualizar TODAS las variables con los nuevos valores
```

### 3. Reiniciar servicios

```bash
# Backend Python
cd qabot
python api_server.py

# Frontend Next.js
npm run dev
```

### 4. Verificar conectividad

- ✅ Base de datos conecta correctamente
- ✅ Google Gemini API responde
- ✅ NextAuth funciona
- ✅ No hay errores de autenticación

---

## LIMPIEZA DE HISTORIAL GIT (OPCIONAL)

**ADVERTENCIA**: Esto reescribe el historial de Git. Solo hazlo si el repositorio es privado y tienes backups.

### Opción 1: BFG Repo-Cleaner (Recomendado)

```bash
# Instalar BFG
brew install bfg  # Mac
# o descargar de: https://rtyley.github.io/bfg-repo-cleaner/

# Crear backup
cd ..
cp -r "AGENTE IA" "AGENTE IA.backup"

# Limpiar .env del historial
cd "AGENTE IA"
bfg --delete-files .env

# Limpiar referencias
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (PELIGROSO)
git push --force
```

### Opción 2: git filter-branch

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch rubio-garcia-dental-integrated/.env" \
  --prune-empty --tag-name-filter cat -- --all

git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push --force
```

---

## PREVENCIÓN FUTURA

### 1. Pre-commit hooks instalados

```bash
# Verificar que Husky está configurado
ls -la .husky/pre-commit

# Si no existe, instalar
npm install --save-dev husky
npx husky install
```

### 2. Secrets scanning en CI/CD

Agregar a `.github/workflows/security.yml`:
```yaml
- name: Scan for secrets
  uses: trufflesecurity/trufflehog@main
  with:
    path: ./
    base: ${{ github.event.repository.default_branch }}
    head: HEAD
```

### 3. Educación del equipo

- ✅ Nunca commitear archivos `.env`
- ✅ Usar `.env.example` para plantillas
- ✅ Rotar credenciales cada 90 días
- ✅ Usar gestores de secretos (Vault, AWS Secrets Manager)

---

## CHECKLIST DE ROTACIÓN

- [ ] Database password rotado
- [ ] JWT secrets rotados (3 variables)
- [ ] Google API key rotada
- [ ] `.env` eliminado del repositorio
- [ ] Variables actualizadas en Vercel
- [ ] Servicios reiniciados y verificados
- [ ] Pre-commit hooks instalados
- [ ] Equipo notificado

---

**Fecha de rotación**: _______________  
**Próxima rotación**: _______________ (90 días)  
**Responsable**: _______________
