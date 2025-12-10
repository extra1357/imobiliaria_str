# fix-edge-runtime.ps1 - Muda runtime de nodejs para edge

$routes = @(
    "src\app\api\analise-mercado\route.ts",
    "src\app\api\analises\route.ts",
    "src\app\api\auth\route.ts",
    "src\app\api\busca\route.ts",
    "src\app\api\consultas\route.ts",
    "src\app\api\imoveis\publico\route.ts",
    "src\app\api\imoveis\route\route.ts",
    "src\app\api\imoveis\route.ts",
    "src\app\api\leads\route.ts",
    "src\app\api\proprietarios\route.ts",
    "src\app\api\relatorios\route.ts"
)

foreach ($route in $routes) {
    if (Test-Path $route) {
        $content = Get-Content $route -Raw
        
        # Substitui nodejs por edge
        $newContent = $content -replace "export const runtime = 'nodejs';", "export const runtime = 'edge';"
        
        Set-Content -Path $route -Value $newContent -NoNewline
        Write-Host "✅ Atualizado: $route" -ForegroundColor Green
    } else {
        Write-Host "⏭️  Não encontrado: $route" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ Todos os runtimes alterados para 'edge'!" -ForegroundColor Green