# fix-routes.ps1 - Adiciona configurações dinâmicas em todas as rotas API

$routes = @(
    "src\app\api\analise-mercado\route.ts",
    "src\app\api\analises\route.ts",
    "src\app\api\auth\route.ts",
    "src\app\api\busca\route.ts",
    "src\app\api\consultas\[id]\route.ts",
    "src\app\api\consultas\route.ts",
    "src\app\api\imoveis\publico\route.ts",
    "src\app\api\imoveis\route\route.ts",
    "src\app\api\imoveis\[id]\route.ts",
    "src\app\api\imoveis\route.ts",
    "src\app\api\leads\route.ts",
    "src\app\api\proprietarios\route.ts",
    "src\app\api\relatorios\route.ts"
)

$config = @"
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

"@

foreach ($route in $routes) {
    if (Test-Path $route) {
        $content = Get-Content $route -Raw
        
        # Verifica se já tem a configuração
        if ($content -notmatch "export const dynamic") {
            # Adiciona no início do arquivo, após comentários iniciais
            if ($content -match "^((?://.*\n)*)([\s\S]*)$") {
                $comments = $matches[1]
                $code = $matches[2]
                $newContent = $comments + "`n" + $config + $code
                Set-Content -Path $route -Value $newContent -NoNewline
                Write-Host "✅ Atualizado: $route" -ForegroundColor Green
            }
        } else {
            Write-Host "⏭️  Já configurado: $route" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Não encontrado: $route" -ForegroundColor Red
    }
}

Write-Host "`n✅ Script concluído!" -ForegroundColor Green