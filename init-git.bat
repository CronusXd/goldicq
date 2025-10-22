@echo off
echo ========================================
echo Inicializando Repositorio Git - GoldICQ
echo ========================================
echo.

REM Verificar se Git esta instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Git nao esta instalado!
    echo Por favor, instale o Git em: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Inicializando repositorio Git...
git init

echo.
echo [2/6] Configurando usuario Git (se necessario)...
git config user.name >nul 2>&1
if errorlevel 1 (
    set /p username="Digite seu nome de usuario Git: "
    git config user.name "%username%"
)

git config user.email >nul 2>&1
if errorlevel 1 (
    set /p email="Digite seu email Git: "
    git config user.email "%email%"
)

echo.
echo [3/6] Adicionando arquivos ao staging...
git add .

echo.
echo [4/6] Criando commit inicial...
git commit -m "Initial commit: GoldICQ E-commerce Platform

- Complete project structure
- HTML/CSS/JavaScript frontend
- ASP Classic backend
- Support for 300+ online games
- Multi-language support (EN, DE, FR)
- Shopping cart system
- Payment integration
- User authentication
- VIP program
- News system
- Live chat support
- Complete documentation in Portuguese"

echo.
echo [5/6] Criando branch main...
git branch -M main

echo.
echo [6/6] Pronto para adicionar remote e push!
echo.
echo ========================================
echo Proximos passos:
echo ========================================
echo.
echo 1. Crie um repositorio no GitHub:
echo    https://github.com/new
echo.
echo 2. Adicione o remote:
echo    git remote add origin https://github.com/seu-usuario/goldicq.git
echo.
echo 3. Faca o push:
echo    git push -u origin main
echo.
echo ========================================
echo.
pause
