# Política de Segurança

## 🔒 Versões Suportadas

Atualmente, as seguintes versões do GoldICQ recebem atualizações de segurança:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |
| < 1.0  | :x:                |

## 🚨 Reportando uma Vulnerabilidade

A segurança dos nossos usuários é nossa prioridade máxima. Se você descobrir uma vulnerabilidade de segurança, por favor, siga estas diretrizes:

### Como Reportar

1. **NÃO** crie uma issue pública no GitHub
2. Envie um email para: **security@goldicq.com**
3. Inclua as seguintes informações:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir o problema
   - Versão afetada
   - Impacto potencial
   - Sugestões de correção (se houver)

### O Que Esperar

- **Confirmação**: Responderemos em até 48 horas
- **Avaliação**: Avaliaremos a vulnerabilidade em até 7 dias
- **Correção**: Trabalharemos em uma correção prioritária
- **Divulgação**: Coordenaremos a divulgação pública com você

### Programa de Recompensas

Atualmente não oferecemos recompensas monetárias, mas:
- Reconhecimento público (se desejar)
- Crédito no changelog
- Agradecimento especial na documentação

## 🛡️ Práticas de Segurança

### Autenticação e Autorização

#### Senhas
- Mínimo de 8 caracteres
- Deve conter letras maiúsculas e minúsculas
- Deve conter números
- Deve conter caracteres especiais
- Hash usando algoritmo seguro (bcrypt recomendado)
- Salt único por usuário

#### Sessões
```vbscript
' Configurações de sessão seguras
Session.Timeout = 30 ' minutos
Response.Cookies("SessionID").Secure = True
Response.Cookies("SessionID").HttpOnly = True
Response.Cookies("SessionID").SameSite = "Strict"
```

#### Tokens CSRF
```html
<!-- Incluir em todos os formulários -->
<input type="hidden" name="csrf_token" value="<%=Session("csrf_token")%>">
```

### Validação de Entrada

#### SQL Injection
```vbscript
' NUNCA faça isso:
sql = "SELECT * FROM users WHERE username = '" & Request.Form("username") & "'"

' SEMPRE use prepared statements:
Set cmd = Server.CreateObject("ADODB.Command")
cmd.CommandText = "SELECT * FROM users WHERE username = ?"
cmd.Parameters.Append cmd.CreateParameter("username", adVarChar, adParamInput, 50, Request.Form("username"))
```

#### XSS (Cross-Site Scripting)
```vbscript
' Função para sanitizar output
Function HTMLEncode(str)
    str = Replace(str, "&", "&amp;")
    str = Replace(str, "<", "&lt;")
    str = Replace(str, ">", "&gt;")
    str = Replace(str, """", "&quot;")
    str = Replace(str, "'", "&#39;")
    HTMLEncode = str
End Function

' Uso:
Response.Write HTMLEncode(Request.Form("comment"))
```

#### Upload de Arquivos
```vbscript
' Validar tipo de arquivo
Dim allowedExtensions
allowedExtensions = Array("jpg", "jpeg", "png", "gif")

' Validar tamanho
Const MAX_FILE_SIZE = 5242880 ' 5MB

' Renomear arquivo
filename = GenerateUniqueFilename() & "." & extension

' Salvar fora do webroot se possível
uploadPath = "C:\SecureUploads\"
```

### Proteção de Dados

#### Dados Sensíveis
```vbscript
' Criptografar dados sensíveis
Function EncryptData(data, key)
    ' Implementar criptografia AES-256
    ' Usar biblioteca de criptografia confiável
End Function

' Nunca armazenar:
' - Números completos de cartão de crédito
' - CVV
' - Senhas em texto plano
```

#### Logs
```vbscript
' NÃO logar informações sensíveis
' NUNCA:
LogMessage "User password: " & password

' SIM:
LogMessage "User login attempt: " & username
```

### Comunicação Segura

#### HTTPS
```xml
<!-- Forçar HTTPS em web.config -->
<system.webServer>
  <rewrite>
    <rules>
      <rule name="Force HTTPS" stopProcessing="true">
        <match url="(.*)" />
        <conditions>
          <add input="{HTTPS}" pattern="off" />
        </conditions>
        <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
```

#### Headers de Segurança
```xml
<httpProtocol>
  <customHeaders>
    <!-- Prevenir clickjacking -->
    <add name="X-Frame-Options" value="SAMEORIGIN" />
    
    <!-- Prevenir MIME sniffing -->
    <add name="X-Content-Type-Options" value="nosniff" />
    
    <!-- XSS Protection -->
    <add name="X-XSS-Protection" value="1; mode=block" />
    
    <!-- Content Security Policy -->
    <add name="Content-Security-Policy" value="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline';" />
    
    <!-- HSTS -->
    <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
    
    <!-- Referrer Policy -->
    <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
  </customHeaders>
</httpProtocol>
```

### Controle de Acesso

#### Permissões de Arquivo
```powershell
# Princípio do menor privilégio
# Apenas leitura para arquivos de código
icacls "C:\inetpub\wwwroot\goldicq\*.asp" /grant "IIS_IUSRS:(R)"

# Leitura/escrita apenas para pastas de upload
icacls "C:\inetpub\wwwroot\goldicq\upfile" /grant "IIS_IUSRS:(M)"
```

#### Segregação de Funções
```vbscript
' Verificar permissões antes de ações sensíveis
If Not IsAdmin(Session("UserID")) Then
    Response.Redirect "unauthorized.asp"
    Response.End
End If
```

### Proteção contra Ataques

#### Rate Limiting
```vbscript
' Limitar tentativas de login
Const MAX_LOGIN_ATTEMPTS = 5
Const LOCKOUT_DURATION = 900 ' 15 minutos

If Session("LoginAttempts") >= MAX_LOGIN_ATTEMPTS Then
    If DateDiff("s", Session("LockoutTime"), Now()) < LOCKOUT_DURATION Then
        Response.Write "Conta temporariamente bloqueada"
        Response.End
    End If
End If
```

#### Proteção DDoS
```xml
<!-- Configurar no IIS -->
<system.webServer>
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="52428800" maxUrl="4096" maxQueryString="2048" />
    </requestFiltering>
    <dynamicIpSecurity>
      <denyByConcurrentRequests enabled="true" maxConcurrentRequests="20" />
      <denyByRequestRate enabled="true" maxRequests="30" requestIntervalInMilliseconds="300" />
    </dynamicIpSecurity>
  </security>
</system.webServer>
```

#### Proteção CSRF
```vbscript
' Gerar token CSRF
Function GenerateCSRFToken()
    Dim token
    token = GenerateRandomString(32)
    Session("csrf_token") = token
    GenerateCSRFToken = token
End Function

' Validar token CSRF
Function ValidateCSRFToken(token)
    ValidateCSRFToken = (token = Session("csrf_token"))
End Function
```

## 🔍 Auditoria e Monitoramento

### Logs de Segurança
```vbscript
' Logar eventos de segurança
Sub LogSecurityEvent(eventType, details)
    ' Registrar:
    ' - Timestamp
    ' - IP do usuário
    ' - User Agent
    ' - Tipo de evento
    ' - Detalhes
    ' - Resultado (sucesso/falha)
End Sub

' Eventos a logar:
' - Tentativas de login (sucesso e falha)
' - Mudanças de senha
' - Acessos a áreas administrativas
' - Modificações de dados sensíveis
' - Erros de validação
' - Tentativas de acesso não autorizado
```

### Monitoramento em Tempo Real
- Alertas para múltiplas tentativas de login falhadas
- Alertas para acessos de IPs suspeitos
- Alertas para padrões de tráfego anormais
- Alertas para erros críticos

### Revisões Regulares
- [ ] Revisão de código mensal
- [ ] Auditoria de segurança trimestral
- [ ] Testes de penetração semestrais
- [ ] Atualização de dependências mensal
- [ ] Revisão de logs semanal

## 📋 Checklist de Segurança

### Antes do Deploy
- [ ] Todas as senhas padrão foram alteradas
- [ ] Certificado SSL válido instalado
- [ ] HTTPS forçado em todo o site
- [ ] Headers de segurança configurados
- [ ] Validação de entrada implementada
- [ ] Proteção CSRF implementada
- [ ] Rate limiting configurado
- [ ] Logs de segurança habilitados
- [ ] Backups configurados
- [ ] Plano de resposta a incidentes documentado

### Manutenção Regular
- [ ] Atualizar sistema operacional
- [ ] Atualizar IIS
- [ ] Atualizar banco de dados
- [ ] Revisar logs de segurança
- [ ] Testar backups
- [ ] Revisar permissões de acesso
- [ ] Atualizar documentação de segurança

## 🚑 Resposta a Incidentes

### Em Caso de Violação

1. **Contenção Imediata**
   - Isolar sistemas afetados
   - Bloquear acessos suspeitos
   - Preservar evidências

2. **Avaliação**
   - Determinar escopo da violação
   - Identificar dados comprometidos
   - Avaliar impacto

3. **Notificação**
   - Notificar equipe de segurança
   - Notificar usuários afetados (se necessário)
   - Notificar autoridades (se necessário)

4. **Recuperação**
   - Corrigir vulnerabilidade
   - Restaurar sistemas
   - Implementar medidas preventivas

5. **Análise Pós-Incidente**
   - Documentar incidente
   - Identificar lições aprendidas
   - Atualizar procedimentos

## 📞 Contatos de Segurança

- **Email de Segurança**: security@goldicq.com
- **Emergências**: emergency@goldicq.com
- **PGP Key**: [Link para chave pública]

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Microsoft Security Best Practices](https://docs.microsoft.com/en-us/security/)

## 🔄 Atualizações desta Política

Esta política de segurança é revisada e atualizada regularmente. Última atualização: 22 de Outubro de 2024

---

**Nota**: A segurança é responsabilidade de todos. Se você identificar algo suspeito, reporte imediatamente.
