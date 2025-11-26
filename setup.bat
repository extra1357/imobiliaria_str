@echo off
echo Criando estrutura Imobiliaria STR...

mkdir prisma\migrations
mkdir src\app\api\leads src\app\api\imoveis src\app\api\analises src\app\api\busca src\app\api\relatorios src\app\api\auth
mkdir src\app\dashboard src\app\imoveis src\app\leads
mkdir src\components\ui src\components\leads src\components\imoveis src\components\dashboard src\components\busca src\components\graficos src\components\relatorios
mkdir src\services\__tests__
mkdir src\database\__tests__
mkdir src\hooks
mkdir src\utils\__tests__
mkdir src\types
mkdir public\images public\icons
mkdir __tests__\integration __tests__\e2e
mkdir docs

echo Estrutura criada!
pause