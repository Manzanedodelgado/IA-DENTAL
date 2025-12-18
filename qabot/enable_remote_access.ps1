# Script PowerShell para Habilitar SQL Server Acceso Remoto
# Sin necesidad de SQL Server Configuration Manager
# EJECUTAR COMO ADMINISTRADOR en GABINETE2

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "QABot - Configuración Automática" -ForegroundColor Cyan
Write-Host "Habilitando SQL Server Acceso Remoto" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que se ejecuta como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Debe ejecutar este script como Administrador" -ForegroundColor Red
    Write-Host "Click derecho en PowerShell -> Ejecutar como Administrador" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Paso 1: Habilitando TCP/IP en SQL Server..." -ForegroundColor Yellow

# Habilitar TCP/IP via registro
$instanceName = "INFOMED"
$regPath = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL*.$instanceName\MSSQLServer\SuperSocketNetLib\Tcp"

# Buscar la ruta exacta
$sqlInstances = Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\" | Where-Object { $_.Name -like "*MSSQL*.$instanceName" }

if ($sqlInstances) {
    foreach ($instance in $sqlInstances) {
        $tcpPath = Join-Path $instance.PSPath "MSSQLServer\SuperSocketNetLib\Tcp"
        
        if (Test-Path $tcpPath) {
            # Habilitar TCP/IP
            Set-ItemProperty -Path $tcpPath -Name "Enabled" -Value 1
            Write-Host "  ✅ TCP/IP habilitado" -ForegroundColor Green
            
            # Configurar puerto 1433
            $ipAllPath = Join-Path $tcpPath "IPAll"
            if (Test-Path $ipAllPath) {
                Set-ItemProperty -Path $ipAllPath -Name "TcpPort" -Value "1433"
                Set-ItemProperty -Path $ipAllPath -Name "TcpDynamicPorts" -Value ""
                Write-Host "  ✅ Puerto 1433 configurado" -ForegroundColor Green
            }
        }
    }
} else {
    Write-Host "  ⚠️  No se encontró instancia INFOMED en el registro" -ForegroundColor Yellow
    Write-Host "  Intentando método alternativo..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Paso 2: Configurando Firewall de Windows..." -ForegroundColor Yellow

# Verificar si la regla ya existe
$ruleName = "SQL Server Remote Access (QABot)"
$existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue

if ($existingRule) {
    Write-Host "  ℹ️  Regla de firewall ya existe" -ForegroundColor Cyan
} else {
    # Crear regla de firewall
    try {
        New-NetFirewallRule -DisplayName $ruleName `
            -Direction Inbound `
            -LocalPort 1433 `
            -Protocol TCP `
            -Action Allow `
            -Enabled True `
            -Profile Any | Out-Null
        
        Write-Host "  ✅ Regla de firewall creada" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Error creando regla: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Paso 3: Reiniciando SQL Server..." -ForegroundColor Yellow

# Reiniciar servicio SQL Server
$serviceName = "MSSQL`$$instanceName"
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service) {
    try {
        Write-Host "  ⏸️  Deteniendo SQL Server..." -ForegroundColor Cyan
        Stop-Service -Name $serviceName -Force -ErrorAction Stop
        Start-Sleep -Seconds 3
        
        Write-Host "  ▶️  Iniciando SQL Server..." -ForegroundColor Cyan
        Start-Service -Name $serviceName -ErrorAction Stop
        Start-Sleep -Seconds 5
        
        Write-Host "  ✅ SQL Server reiniciado exitosamente" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Error reiniciando servicio: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "  Reinicia manualmente desde Services.msc" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️  Servicio SQL Server no encontrado" -ForegroundColor Yellow
    Write-Host "  Nombre esperado: $serviceName" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Paso 4: Obteniendo IP del servidor..." -ForegroundColor Yellow

# Obtener IP
$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -notlike "127.*" -and 
    $_.IPAddress -notlike "169.254.*" 
}

Write-Host ""
Write-Host "  📡 Direcciones IP disponibles:" -ForegroundColor Cyan
foreach ($ip in $ipAddresses) {
    $adapter = Get-NetAdapter | Where-Object { $_.ifIndex -eq $ip.InterfaceIndex }
    Write-Host "    • $($ip.IPAddress) ($($adapter.Name))" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Configuración completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "SIGUIENTE PASO EN TU MAC:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Copia una de las IPs de arriba (probablemente la de Ethernet)" -ForegroundColor White
Write-Host ""
Write-Host "2. Edita config.py:" -ForegroundColor White
Write-Host '   DB_SERVER: str = "TU_IP_AQUI\INFOMED"' -ForegroundColor Gray
Write-Host ""
Write-Host "3. Ejecuta el test:" -ForegroundColor White
Write-Host "   cd qabot" -ForegroundColor Gray
Write-Host "   ./test_connectivity.sh" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Si todo OK, ejecuta QABot:" -ForegroundColor White
Write-Host "   python3 cli.py" -ForegroundColor Gray
Write-Host ""

# Test de conectividad local
Write-Host "Verificando conectividad local..." -ForegroundColor Yellow
$port = 1433
$timeout = 1000

foreach ($ip in $ipAddresses) {
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    try {
        $connection = $tcpClient.BeginConnect($ip.IPAddress, $port, $null, $null)
        $wait = $connection.AsyncWaitHandle.WaitOne($timeout, $false)
        
        if ($wait) {
            $tcpClient.EndConnect($connection)
            Write-Host "  ✅ Puerto 1433 accesible en $($ip.IPAddress)" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Puerto 1433 no responde en $($ip.IPAddress)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  ❌ No se pudo conectar a $($ip.IPAddress):1433" -ForegroundColor Red
    } finally {
        $tcpClient.Close()
    }
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
