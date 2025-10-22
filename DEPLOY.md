# Guia de Deploy - GoldICQ

Este documento descreve o processo de deploy do sistema GoldICQ em ambiente de produção.

## 📋 Pré-requisitos

Antes de iniciar o deploy, certifique-se de ter:

- [ ] Servidor configurado conforme [INSTALL.md](INSTALL.md)
- [ ] Certificado SSL válido
- [ ] Credenciais de banco de dados
- [ ] Credenciais de APIs (PayPal, Google Analytics, etc.)
- [ ] Backup do ambiente atual (se aplicável)
- [ ] Acesso SSH/RDP ao servidor
- [ ] Permissões de administrador

## 🚀 Processo de Deploy

### 1. Preparação

#### 1.1 Backup Completo
```powershell
# Backup do banco de dados
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "C:\Backups\pre-deploy_$date"
New-Item -ItemType Directory -Force -Path $backupPath

# Backup SQL Server
sqlcmd -S localhost -Q "BACKUP DATABASE GoldICQ TO DISK='$backupPath\database.bak'"

# Backup de arquivos
Compress-Archive -Path "C:\inetpub\wwwroot\goldicq" -DestinationPath "$backupPath\files.zip"
```

#### 1.2 Verificar Ambiente
```powershell
# Verificar versão do IIS
Get-WindowsFeature -Name Web-Server

# Verificar ASP habilitado
Get-WindowsFeature -Name Web-Asp-Net45

# Verificar espaço em disco
Get-PSDrive C | Select-Object Used,Free
```

### 2. Deploy de Código

#### 2.1 Método 1: Git Pull (Recomendado)
```bash
# No servidor, navegue até o diretório
cd C:\inetpub\wwwroot\goldicq

# Faça backup da branch atual
git branch backup-$(date +%Y%m%d)

# Atualize o código
git fetch origin
git checkout main
git pull origin main
```

#### 2.2 Método 2: FTP/SFTP
```powershell
# Usando WinSCP ou FileZilla
# 1. Conecte ao servidor
# 2. Navegue até C:\inetpub\wwwroot\goldicq
# 3. Faça upload dos arquivos atualizados
# 4. Mantenha arquivos de configuração existentes
```

#### 2.3 Método 3: Web Deploy
```powershell
# Usando msdeploy
msdeploy.exe `
  -verb:sync `
  -source:contentPath="C:\Deploy\goldicq" `
  -dest:contentPath="C:\inetpub\wwwroot\goldicq",computerName=servidor,userName=admin,password=senha
```

### 3. Configuração

#### 3.1 Atualizar Configurações
```vbscript
' Edite config.asp com configurações de produção
Const ENVIRONMENT = "production"
Const DEBUG_MODE = False
Const SITE_URL = "https://www.goldicq.com"

' Configurações de banco de dados
Const DB_SERVER = "prod-db-server"
Const DB_NAME = "GoldICQ_Prod"

' Configurações de email
Const SMTP_SERVER = "smtp.goldicq.com"

' Chaves de API de produção
Const PAYPAL_MODE = "live"
Const GOOGLE_ANALYTICS_ID = "UA-XXXXXXXX-X"
```

#### 3.2 Atualizar Banco de Dados
```sql
-- Execute scripts de migração se necessário
-- Exemplo: adicionar nova coluna
ALTER TABLE users ADD COLUMN last_login DATETIME;

-- Atualizar versão do schema
UPDATE system_config SET value = '1.0.0' WHERE key = 'schema_version';
```

### 4. Verificações Pós-Deploy

#### 4.1 Testes Funcionais
```powershell
# Script de teste automatizado
$tests = @(
    @{Name="Homepage"; URL="https://www.goldicq.com"; Expected=200},
    @{Name="Login"; URL="https://www.goldicq.com/login.asp"; Expected=200},
    @{Name="Products"; URL="https://www.goldicq.com/aion_gold.html"; Expected=200}
)

foreach ($test in $tests) {
    try {
        $response = Invoke-WebRequest -Uri $test.URL -UseBasicParsing
        if ($response.StatusCode -eq $test.Expected) {
            Write-Host "✓ $($test.Name) - OK" -ForegroundColor Green
        } else {
            Write-Host "✗ $($test.Name) - FAIL (Status: $($response.StatusCode))" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ $($test.Name) - ERROR: $_" -ForegroundColor Red
    }
}
```

#### 4.2 Checklist de Verificação
- [ ] Homepage carrega corretamente
- [ ] Sistema de login funciona
- [ ] Carrinho de compras funciona
- [ ] Processo de checkout funciona
- [ ] Emails são enviados
- [ ] Uploads funcionam
- [ ] Busca funciona
- [ ] Links de navegação funcionam
- [ ] Imagens carregam
- [ ] CSS/JS carregam
- [ ] SSL está ativo
- [ ] Redirecionamento HTTPS funciona
- [ ] Analytics está rastreando
- [ ] Logs estão sendo gerados

#### 4.3 Testes de Performance
```powershell
# Teste de carga básico
$url = "https://www.goldicq.com"
$requests = 100
$concurrent = 10

Measure-Command {
    1..$requests | ForEach-Object -Parallel {
        Invoke-WebRequest -Uri $using:url -UseBasicParsing
    } -ThrottleLimit $concurrent
}
```

### 5. Monitoramento

#### 5.1 Configurar Alertas
```powershell
# Exemplo de script de monitoramento
$url = "https://www.goldicq.com"
$email = "admin@goldicq.com"

while ($true) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -ne 200) {
            Send-MailMessage -To $email -Subject "Site Down!" -Body "Status: $($response.StatusCode)"
        }
    } catch {
        Send-MailMessage -To $email -Subject "Site Down!" -Body "Error: $_"
    }
    Start-Sleep -Seconds 300 # Verificar a cada 5 minutos
}
```

#### 5.2 Verificar Logs
```powershell
# Verificar logs do IIS
Get-Content "C:\inetpub\logs\LogFiles\W3SVC1\*.log" -Tail 100

# Verificar logs de erro da aplicação
Get-Content "C:\inetpub\wwwroot\goldicq\logs\error.log" -Tail 50
```

### 6. Rollback (Se Necessário)

#### 6.1 Rollback de Código
```bash
# Voltar para versão anterior
cd C:\inetpub\wwwroot\goldicq
git log --oneline -10  # Ver últimos commits
git checkout <commit-hash>  # Voltar para commit específico

# Ou voltar para branch de backup
git checkout backup-20241022
```

#### 6.2 Rollback de Banco de Dados
```sql
-- Restaurar backup
RESTORE DATABASE GoldICQ
FROM DISK = 'C:\Backups\pre-deploy_20241022\database.bak'
WITH REPLACE;
```

#### 6.3 Rollback de Arquivos
```powershell
# Restaurar arquivos do backup
$backupPath = "C:\Backups\pre-deploy_20241022\files.zip"
$restorePath = "C:\inetpub\wwwroot\goldicq"

# Remover arquivos atuais
Remove-Item -Path "$restorePath\*" -Recurse -Force

# Restaurar backup
Expand-Archive -Path $backupPath -DestinationPath $restorePath
```

## 🔄 Deploy Automatizado

### Script de Deploy Completo
```powershell
# deploy.ps1
param(
    [string]$Environment = "production",
    [switch]$SkipBackup = $false,
    [switch]$SkipTests = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GoldICQ Deploy Script" -ForegroundColor Cyan
Write-Host "  Environment: $Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Backup
if (-not $SkipBackup) {
    Write-Host "`n[1/6] Creating backup..." -ForegroundColor Yellow
    & .\scripts\backup.ps1
}

# 2. Stop Application Pool
Write-Host "`n[2/6] Stopping application pool..." -ForegroundColor Yellow
Stop-WebAppPool -Name "GoldICQ"

# 3. Deploy Code
Write-Host "`n[3/6] Deploying code..." -ForegroundColor Yellow
cd C:\inetpub\wwwroot\goldicq
git pull origin main

# 4. Update Configuration
Write-Host "`n[4/6] Updating configuration..." -ForegroundColor Yellow
Copy-Item "config.$Environment.asp" "config.asp" -Force

# 5. Database Migration
Write-Host "`n[5/6] Running database migrations..." -ForegroundColor Yellow
& .\scripts\migrate-database.ps1

# 6. Start Application Pool
Write-Host "`n[6/6] Starting application pool..." -ForegroundColor Yellow
Start-WebAppPool -Name "GoldICQ"

# Wait for warmup
Start-Sleep -Seconds 10

# Run Tests
if (-not $SkipTests) {
    Write-Host "`n[Tests] Running post-deploy tests..." -ForegroundColor Yellow
    & .\scripts\test-deployment.ps1
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Deploy completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
```

### Uso do Script
```powershell
# Deploy normal
.\deploy.ps1

# Deploy sem backup (não recomendado)
.\deploy.ps1 -SkipBackup

# Deploy sem testes
.\deploy.ps1 -SkipTests

# Deploy para staging
.\deploy.ps1 -Environment staging
```

## 📊 Ambientes

### Desenvolvimento
- **URL**: http://dev.goldicq.local
- **Banco**: GoldICQ_Dev
- **Debug**: Habilitado
- **Logs**: Verbose

### Staging
- **URL**: https://staging.goldicq.com
- **Banco**: GoldICQ_Staging
- **Debug**: Habilitado
- **Logs**: Detalhado

### Produção
- **URL**: https://www.goldicq.com
- **Banco**: GoldICQ_Prod
- **Debug**: Desabilitado
- **Logs**: Apenas erros

## 🔐 Segurança no Deploy

### Checklist de Segurança
- [ ] Credenciais não estão no código
- [ ] Arquivos de configuração não estão no Git
- [ ] Debug mode está desabilitado
- [ ] Logs não contêm informações sensíveis
- [ ] Permissões de arquivo estão corretas
- [ ] SSL está configurado
- [ ] Headers de segurança estão ativos
- [ ] Firewall está configurado

### Variáveis de Ambiente
```powershell
# Definir variáveis de ambiente sensíveis
[Environment]::SetEnvironmentVariable("DB_PASSWORD", "senha_segura", "Machine")
[Environment]::SetEnvironmentVariable("PAYPAL_SECRET", "secret_key", "Machine")
```

## 📝 Documentação do Deploy

### Registro de Deploy
Mantenha um log de todos os deploys:

```
Data: 2024-10-22 14:30:00
Versão: 1.0.0
Ambiente: Produção
Responsável: João Silva
Mudanças:
  - Adicionada funcionalidade X
  - Corrigido bug Y
  - Atualizada biblioteca Z
Testes: Passou
Rollback: Não necessário
Observações: Deploy sem problemas
```

## 🆘 Suporte

Em caso de problemas durante o deploy:

1. **Não entre em pânico**
2. **Verifique os logs**
3. **Execute rollback se necessário**
4. **Contate a equipe**:
   - Email: devops@goldicq.com
   - Slack: #deploys
   - Telefone: +XX (XX) XXXX-XXXX

## 📚 Recursos Adicionais

- [INSTALL.md](INSTALL.md) - Guia de instalação
- [SECURITY.md](SECURITY.md) - Políticas de segurança
- [README.md](README.md) - Visão geral do projeto

---

**Última atualização**: 22 de Outubro de 2024
