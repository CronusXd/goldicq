@echo off
echo ========================================
echo Upload para GitHub - GoldICQ
echo Usuario: CronusXd
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

echo [1/3] Adicionando remote do GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/CronusXd/goldicq.git

echo.
echo [2/3] Verificando conexao...
git remote -v

echo.
echo [3/3] Fazendo upload para GitHub...
echo.
echo IMPORTANTE: Voce precisara fazer login no GitHub
echo Use suas credenciais ou Personal Access Token
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERRO ao fazer push!
    echo ========================================
    echo.
    echo Possiveis causas:
    echo 1. Repositorio ainda nao foi criado no GitHub
    echo 2. Credenciais incorretas
    echo 3. Sem permissao de acesso
    echo.
    echo Solucao:
    echo 1. Crie o repositorio em: https://github.com/new
    echo 2. Nome: goldicq
    echo 3. Visibilidade: Private ou Public
    echo 4. NAO marque "Initialize with README"
    echo 5. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Upload concluido com sucesso!
echo ========================================
echo.
echo Acesse seu repositorio em:
echo https://github.com/CronusXd/goldicq
echo.
pause
