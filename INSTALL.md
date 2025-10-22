# Guia de Instalação - GoldICQ

Este guia fornece instruções detalhadas para instalar e configurar o sistema GoldICQ.

## 📋 Requisitos do Sistema

### Servidor Web
- **Windows Server** 2012 R2 ou superior (recomendado)
- **IIS (Internet Information Services)** 7.5 ou superior
- **ASP Classic** habilitado
- **SSL/TLS** certificado válido

### Banco de Dados
- **Microsoft Access** 2010 ou superior, OU
- **Microsoft SQL Server** 2012 ou superior (recomendado para produção)

### Software Adicional
- **.NET Framework** 4.5 ou superior
- **URL Rewrite Module** para IIS
- **SMTP Server** para envio de emails

### Requisitos de Hardware (Mínimo)
- **CPU**: 2 cores, 2.0 GHz
- **RAM**: 4 GB
- **Disco**: 50 GB de espaço livre
- **Rede**: Conexão de internet estável

### Requisitos de Hardware (Recomendado)
- **CPU**: 4+ cores, 3.0+ GHz
- **RAM**: 8+ GB
- **Disco**: 100+ GB SSD
- **Rede**: Conexão de alta velocidade

## 🔧 Instalação Passo a Passo

### 1. Preparação do Servidor

#### 1.1 Instalar IIS
```powershell
# Execute no PowerShell como Administrador
Install-WindowsFeature -name Web-Server -IncludeManagementTools
Install-WindowsFeature -name Web-Asp-Net45
Install-WindowsFeature -name Web-ASP
```

#### 1.2 Habilitar ASP Classic
1. Abra o **Gerenciador do Servidor**
2. Vá para **Funções** → **Servidor Web (IIS)**
3. Em **Serviços de Função**, marque:
   - ASP
   - Conteúdo Estático
   - Documento Padrão
   - Navegação de Diretório
   - Erros HTTP
   - Filtragem de Solicitações

### 2. Configuração do Banco de Dados

#### Opção A: Microsoft Access (Desenvolvimento)
```
1. Localize o arquivo database.mdb na pasta /database/
2. Configure permissões de leitura/escrita para o usuário IIS
3. Atualize a string de conexão em config.asp
```

#### Opção B: SQL Server (Produção)
```sql
-- 1. Crie um novo banco de dados
CREATE DATABASE GoldICQ;
GO

-- 2. Execute o script de schema
-- (Localize schema.sql na pasta /database/)

-- 3. Crie um usuário para a aplicação
CREATE LOGIN goldicq_user WITH PASSWORD = 'SuaSenhaSegura123!';
CREATE USER goldicq_user FOR LOGIN goldicq_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE::GoldICQ TO goldicq_user;
```

### 3. Deploy dos Arquivos

#### 3.1 Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/goldicq.git
cd goldicq
```

#### 3.2 Copiar Arquivos para o Servidor
```powershell
# Copie todos os arquivos para o diretório do IIS
# Exemplo: C:\inetpub\wwwroot\goldicq\
Copy-Item -Path .\* -Destination C:\inetpub\wwwroot\goldicq\ -Recurse
```

#### 3.3 Configurar Permissões
```powershell
# Conceda permissões ao usuário IIS
$path = "C:\inetpub\wwwroot\goldicq"
$acl = Get-Acl $path
$permission = "IIS_IUSRS","FullControl","ContainerInherit,ObjectInherit","None","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl $path $acl
```

### 4. Configuração do IIS

#### 4.1 Criar Novo Site
1. Abra o **Gerenciador do IIS**
2. Clique com botão direito em **Sites** → **Adicionar Site**
3. Configure:
   - **Nome do Site**: GoldICQ
   - **Caminho Físico**: C:\inetpub\wwwroot\goldicq
   - **Tipo**: https
   - **Porta**: 443
   - **Nome do Host**: www.goldicq.com

#### 4.2 Configurar SSL
1. Importe seu certificado SSL
2. Vincule o certificado ao site
3. Force redirecionamento HTTPS:
```xml
<!-- Adicione ao web.config -->
<system.webServer>
  <rewrite>
    <rules>
      <rule name="HTTP to HTTPS redirect" stopProcessing="true">
        <match url="(.*)" />
        <conditions>
          <add input="{HTTPS}" pattern="off" ignoreCase="true" />
        </conditions>
        <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
```

#### 4.3 Configurar ASP
1. No IIS Manager, selecione seu site
2. Clique em **ASP**
3. Configure:
   - **Enable Parent Paths**: True
   - **Script Language**: VBScript
   - **Session Timeout**: 30 minutos

### 5. Configuração da Aplicação

#### 5.1 Arquivo de Configuração
Edite `config.asp`:
```vbscript
' Configurações do Banco de Dados
Const DB_TYPE = "SQLSERVER" ' ou "ACCESS"
Const DB_SERVER = "localhost"
Const DB_NAME = "GoldICQ"
Const DB_USER = "goldicq_user"
Const DB_PASS = "SuaSenhaSegura123!"

' Configurações do Site
Const SITE_URL = "https://www.goldicq.com"
Const SITE_NAME = "GoldICQ"
Const ADMIN_EMAIL = "admin@goldicq.com"

' Configurações de Email
Const SMTP_SERVER = "smtp.seuservidor.com"
Const SMTP_PORT = 587
Const SMTP_USER = "noreply@goldicq.com"
Const SMTP_PASS = "SuaSenhaEmail123!"

' Configurações de Pagamento
Const PAYPAL_MODE = "live" ' ou "sandbox"
Const PAYPAL_CLIENT_ID = "seu_client_id"
Const PAYPAL_SECRET = "seu_secret"

' Chaves de API
Const GOOGLE_ANALYTICS_ID = "UA-XXXXXXXX-X"
Const FACEBOOK_APP_ID = "seu_app_id"
```

#### 5.2 Configurar Pastas de Upload
```powershell
# Crie e configure permissões para pastas de upload
$uploadFolders = @("upfile", "up_files", "reports")
foreach ($folder in $uploadFolders) {
    $path = "C:\inetpub\wwwroot\goldicq\$folder"
    New-Item -ItemType Directory -Force -Path $path
    $acl = Get-Acl $path
    $permission = "IIS_IUSRS","Modify","ContainerInherit,ObjectInherit","None","Allow"
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
    $acl.SetAccessRule($accessRule)
    Set-Acl $path $acl
}
```

### 6. Configurações de Segurança

#### 6.1 Web.config
Crie ou atualize `web.config`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <security>
      <requestFiltering>
        <requestLimits maxAllowedContentLength="52428800" />
        <fileExtensions>
          <add fileExtension=".mdb" allowed="false" />
          <add fileExtension=".config" allowed="false" />
        </fileExtensions>
      </requestFiltering>
    </security>
    <httpProtocol>
      <customHeaders>
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

#### 6.2 Configurar Firewall
```powershell
# Permitir tráfego HTTP/HTTPS
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

### 7. Testes Pós-Instalação

#### 7.1 Verificar Conectividade
```
1. Acesse https://www.goldicq.com
2. Verifique se a página inicial carrega corretamente
3. Teste o sistema de login
4. Teste o carrinho de compras
5. Verifique os logs de erro
```

#### 7.2 Testes de Funcionalidade
- [ ] Registro de novo usuário
- [ ] Login/Logout
- [ ] Adicionar item ao carrinho
- [ ] Processo de checkout
- [ ] Envio de email
- [ ] Upload de arquivos
- [ ] Sistema de busca
- [ ] Páginas de produtos

#### 7.3 Testes de Performance
```powershell
# Use ferramentas como:
# - Apache Bench
# - JMeter
# - LoadRunner
```

### 8. Configuração de Backup

#### 8.1 Backup do Banco de Dados
```sql
-- SQL Server
BACKUP DATABASE GoldICQ
TO DISK = 'C:\Backups\GoldICQ_backup.bak'
WITH FORMAT, MEDIANAME = 'GoldICQ_Backup', NAME = 'Full Backup of GoldICQ';
```

#### 8.2 Backup de Arquivos
```powershell
# Script de backup automático
$source = "C:\inetpub\wwwroot\goldicq"
$destination = "C:\Backups\goldicq_" + (Get-Date -Format "yyyyMMdd") + ".zip"
Compress-Archive -Path $source -DestinationPath $destination
```

### 9. Monitoramento

#### 9.1 Configurar Logs
```
1. Habilite logs do IIS
2. Configure log de erros da aplicação
3. Configure alertas de erro
4. Monitore uso de recursos
```

#### 9.2 Ferramentas Recomendadas
- **Application Insights** - Monitoramento de aplicação
- **New Relic** - Performance monitoring
- **Pingdom** - Uptime monitoring
- **Google Analytics** - Análise de tráfego

## 🔍 Solução de Problemas

### Problema: Erro 500 - Internal Server Error
**Solução**:
```
1. Verifique se ASP está habilitado
2. Verifique permissões de arquivo
3. Revise logs de erro do IIS
4. Verifique string de conexão do banco
```

### Problema: Erro de Conexão com Banco de Dados
**Solução**:
```
1. Verifique credenciais do banco
2. Teste conectividade com o servidor
3. Verifique firewall
4. Revise permissões do usuário do banco
```

### Problema: Uploads Não Funcionam
**Solução**:
```
1. Verifique permissões da pasta
2. Verifique limite de upload no IIS
3. Verifique espaço em disco
4. Revise configurações de segurança
```

## 📞 Suporte

Se encontrar problemas durante a instalação:

- **Email**: support@goldicq.com
- **Documentação**: https://docs.goldicq.com
- **Issues**: https://github.com/seu-usuario/goldicq/issues

## 📚 Próximos Passos

Após a instalação:

1. Leia o [README.md](README.md) para visão geral do projeto
2. Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir
3. Revise [SECURITY.md](SECURITY.md) para práticas de segurança
4. Configure backups automáticos
5. Implemente monitoramento
6. Configure CDN para assets estáticos

---

**Última atualização**: 22 de Outubro de 2024
