# Como Fazer Upload do Projeto para o GitHub

Este guia passo a passo mostra como criar um repositório no GitHub e fazer upload deste projeto.

## 📋 Pré-requisitos

1. **Conta no GitHub**
   - Se não tiver, crie em: https://github.com/join

2. **Git Instalado**
   - Windows: https://git-scm.com/download/win
   - Verifique a instalação: `git --version`

3. **Acesso ao Terminal**
   - Windows: CMD, PowerShell ou Git Bash
   - Abra na pasta do projeto

## 🚀 Passo a Passo

### 1. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Preencha os dados:
   - **Repository name**: `goldicq` (ou nome de sua escolha)
   - **Description**: `E-commerce platform for virtual game currencies and items`
   - **Visibility**: 
     - ✅ **Private** (recomendado para código proprietário)
     - ⬜ Public (apenas se quiser código aberto)
   - **NÃO** marque "Initialize this repository with a README"
   - **NÃO** adicione .gitignore ou license (já temos)
3. Clique em **"Create repository"**

### 2. Configurar Git Local

Abra o terminal na pasta do projeto e execute:

```bash
# Configurar seu nome (se ainda não configurou)
git config --global user.name "Seu Nome"

# Configurar seu email (use o mesmo do GitHub)
git config --global user.email "seu-email@exemplo.com"
```

### 3. Inicializar Repositório Local

#### Opção A: Usando o Script Automático (Windows)
```cmd
init-git.bat
```

#### Opção B: Manualmente
```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "Initial commit: GoldICQ E-commerce Platform"

# Renomear branch para main
git branch -M main
```

### 4. Conectar ao GitHub

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/goldicq.git
```

### 5. Fazer Upload (Push)

```bash
# Enviar código para o GitHub
git push -u origin main
```

**Nota**: Você será solicitado a fazer login no GitHub. Use suas credenciais ou token de acesso pessoal.

### 6. Verificar Upload

1. Acesse: `https://github.com/SEU-USUARIO/goldicq`
2. Você deve ver todos os arquivos do projeto
3. O README.md será exibido automaticamente na página inicial

## 🔐 Autenticação

### Método 1: HTTPS com Token (Recomendado)

1. Crie um Personal Access Token:
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token (classic)"
   - Selecione escopo: `repo` (acesso completo a repositórios)
   - Copie o token gerado

2. Use o token como senha quando solicitado:
   ```
   Username: seu-usuario
   Password: ghp_seu_token_aqui
   ```

### Método 2: SSH (Alternativo)

1. Gere uma chave SSH:
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
   ```

2. Adicione a chave ao GitHub:
   - Copie a chave pública: `cat ~/.ssh/id_ed25519.pub`
   - Acesse: https://github.com/settings/keys
   - Clique em "New SSH key"
   - Cole a chave e salve

3. Use URL SSH:
   ```bash
   git remote set-url origin git@github.com:SEU-USUARIO/goldicq.git
   ```

## 📝 Comandos Git Úteis

### Verificar Status
```bash
git status
```

### Ver Histórico de Commits
```bash
git log --oneline
```

### Adicionar Mais Arquivos
```bash
git add arquivo.txt
git commit -m "Adiciona novo arquivo"
git push
```

### Atualizar do GitHub
```bash
git pull origin main
```

### Ver Repositórios Remotos
```bash
git remote -v
```

### Criar Nova Branch
```bash
git checkout -b feature/nova-funcionalidade
```

## 🎨 Personalizar Repositório no GitHub

### 1. Adicionar Descrição
- Vá para o repositório no GitHub
- Clique em ⚙️ (Settings)
- Adicione descrição e tags

### 2. Adicionar Topics (Tags)
Sugestões de tags:
- `ecommerce`
- `gaming`
- `virtual-currency`
- `asp-classic`
- `mmorpg`
- `payment-gateway`
- `multilingual`

### 3. Configurar GitHub Pages (Opcional)
Se quiser hospedar documentação:
1. Vá em Settings → Pages
2. Selecione branch `main`
3. Pasta: `/docs` ou `/ (root)`
4. Salve

### 4. Adicionar Proteção de Branch
1. Settings → Branches
2. Add rule
3. Branch name pattern: `main`
4. Marque:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass

## 📊 Estrutura Recomendada de Branches

```
main (produção)
  ├── develop (desenvolvimento)
  │   ├── feature/nova-funcionalidade
  │   ├── feature/outro-recurso
  │   └── bugfix/correcao-bug
  └── hotfix/correcao-urgente
```

### Criar Branch de Desenvolvimento
```bash
git checkout -b develop
git push -u origin develop
```

## 🔄 Workflow Recomendado

### Para Novas Funcionalidades
```bash
# 1. Criar branch
git checkout -b feature/minha-funcionalidade

# 2. Fazer mudanças
# ... editar arquivos ...

# 3. Commit
git add .
git commit -m "Adiciona minha funcionalidade"

# 4. Push
git push -u origin feature/minha-funcionalidade

# 5. Criar Pull Request no GitHub
# 6. Após aprovação, fazer merge
```

### Para Correções Rápidas
```bash
# 1. Criar hotfix
git checkout -b hotfix/correcao-urgente

# 2. Corrigir
# ... editar arquivos ...

# 3. Commit e push
git add .
git commit -m "Corrige bug urgente"
git push -u origin hotfix/correcao-urgente

# 4. Merge direto na main após testes
```

## 📁 Arquivos Importantes no Repositório

Certifique-se de que estes arquivos estão presentes:

- ✅ `README.md` - Documentação principal
- ✅ `LICENSE` - Termos de uso
- ✅ `.gitignore` - Arquivos a ignorar
- ✅ `CONTRIBUTING.md` - Guia de contribuição
- ✅ `CHANGELOG.md` - Histórico de mudanças
- ✅ `SECURITY.md` - Política de segurança
- ✅ `INSTALL.md` - Guia de instalação
- ✅ `DEPLOY.md` - Guia de deploy

## 🚫 Arquivos a NÃO Incluir

Verifique se estes arquivos/pastas estão no `.gitignore`:

- ❌ Arquivos de configuração com senhas
- ❌ Banco de dados (.mdb, .accdb)
- ❌ Logs (.log)
- ❌ Uploads de usuários
- ❌ Arquivos temporários
- ❌ Chaves de API
- ❌ Certificados SSL

## 🔍 Verificar Antes do Push

```bash
# Ver o que será enviado
git status

# Ver diferenças
git diff

# Ver arquivos ignorados
git status --ignored
```

## 🆘 Solução de Problemas

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/goldicq.git
```

### Erro: "failed to push some refs"
```bash
# Puxar mudanças primeiro
git pull origin main --rebase
git push origin main
```

### Erro: "Permission denied"
```bash
# Verificar autenticação
git config --list | grep user

# Reconfigurar remote com token
git remote set-url origin https://TOKEN@github.com/SEU-USUARIO/goldicq.git
```

### Desfazer Último Commit (Local)
```bash
git reset --soft HEAD~1
```

### Remover Arquivo do Git (Mas Manter Local)
```bash
git rm --cached arquivo.txt
git commit -m "Remove arquivo do Git"
```

## 📞 Suporte

Se tiver problemas:

1. **Documentação do Git**: https://git-scm.com/doc
2. **GitHub Docs**: https://docs.github.com
3. **GitHub Community**: https://github.community
4. **Stack Overflow**: https://stackoverflow.com/questions/tagged/git

## ✅ Checklist Final

Antes de considerar o setup completo:

- [ ] Repositório criado no GitHub
- [ ] Git configurado localmente
- [ ] Código enviado com sucesso
- [ ] README.md visível no GitHub
- [ ] .gitignore funcionando (arquivos sensíveis não enviados)
- [ ] Descrição e tags adicionadas
- [ ] Branches configuradas (se aplicável)
- [ ] Colaboradores adicionados (se aplicável)
- [ ] Proteção de branch configurada (se aplicável)

## 🎉 Próximos Passos

Após o upload bem-sucedido:

1. ⭐ Adicione uma estrela ao seu próprio repositório
2. 📝 Mantenha o CHANGELOG.md atualizado
3. 🔄 Configure CI/CD (GitHub Actions)
4. 📊 Configure GitHub Projects para gerenciar tarefas
5. 🐛 Use GitHub Issues para rastrear bugs
6. 📖 Considere adicionar Wiki para documentação adicional

---

**Parabéns!** Seu projeto agora está no GitHub! 🎊

Para mais informações, consulte a [documentação oficial do GitHub](https://docs.github.com).
