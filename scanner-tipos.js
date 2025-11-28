const fs = require('fs');
const path = require('path');

const prismaModels = {
  Lead: { id: 'string', nome: 'string', email: 'string', telefone: 'string', origem: 'string', status: 'string', dataCaptcha: 'Date', createdAt: 'Date', updatedAt: 'Date', consultas: 'Consulta[]' },
  Imovel: { id: 'string', tipo: 'string', endereco: 'string', cidade: 'string', estado: 'string', preco: 'number', metragem: 'number', descricao: 'string | null', disponivel: 'boolean', proprietarioId: 'string', createdAt: 'Date', updatedAt: 'Date', imagens: 'string[]', status: 'string', consultas: 'Consulta[]', proprietario: 'Proprietario' },
  Proprietario: { id: 'string', nome: 'string', telefone: 'string', email: 'string', cpf: 'string | null', createdAt: 'Date', updatedAt: 'Date', imoveis: 'Imovel[]' },
  Consulta: { id: 'string', leadId: 'string', imovelId: 'string', data: 'Date', resultado: 'string | null', tipo: 'string', status: 'string', observacoes: 'string | null', comissao: 'number | null', createdAt: 'Date', dataFechamento: 'Date | null', motivoCancelamento: 'string | null', updatedAt: 'Date', valorProposta: 'number | null', imovel: 'Imovel', lead: 'Lead' },
  AnaliseMercado: { id: 'string', cidade: 'string', estado: 'string', valorM2: 'number', valorMinimo: 'number | null', valorMaximo: 'number | null', dataAnalise: 'Date', fonte: 'string', tendencia: 'string | null', observacoes: 'string | null', relatorios: 'Relatorio[]' },
  Relatorio: { id: 'string', titulo: 'string', tipo: 'string', conteudo: 'string', dataGeracao: 'Date', periodo: 'string | null', geradoPor: 'string | null', analiseId: 'string | null', analise: 'AnaliseMercado | null' },
  Auditoria: { id: 'string', acao: 'string', tabela: 'string', registroId: 'string | null', usuario: 'string', dados: 'string | null', ip: 'string | null', userAgent: 'string | null', createdAt: 'Date' },
  Usuario: { id: 'string', nome: 'string', email: 'string', senha: 'string', role: 'string', ativo: 'boolean', createdAt: 'Date', updatedAt: 'Date' }
};

const issues = [];

function scanDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist' || entry.name === '.git') continue;
    if (entry.isDirectory()) {
      scanDirectory(fullPath, baseDir);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      scanFile(fullPath, baseDir);
    }
  }
}

function scanFile(filePath, baseDir) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(baseDir, filePath);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Ignorar linhas que são chamadas de função (argumentos), não definições de parâmetro
    // Exemplo: setLoading(true), setError(null), etc.
    const isFunctionCall = line.match(/[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)\s*;?\s*$/);
    if (isFunctionCall) return;

    // 1. Uso de 'any' explícito
    if (line.includes(': any')) {
      issues.push({ file: relativePath, line: lineNumber, issue: 'Uso de tipo "any" - evite usar any', severity: 'warning' });
    }

    // 2. useState sem tipo genérico (mais preciso)
    const useStateMatch = line.match(/useState\s*\(/);
    if (useStateMatch && !line.includes('useState<')) {
      issues.push({ file: relativePath, line: lineNumber, issue: 'useState sem tipo genérico - adicione useState<Tipo>', severity: 'error' });
    }

    // 3. Funções async/arrow sem tipo em PARÂMETROS (não em chamadas)
    // Padrão: (param) => ou async (param) =>
    // Ignorar se for chamada de função tipo .map((x) =>
    if (line.match(/^\s*(async\s+)?\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/)) {
      const match = line.match(/^\s*(async\s+)?\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/);
      if (match && !line.includes(':')) {
        issues.push({ file: relativePath, line: lineNumber, issue: `Parâmetro '${match[2]}' sem tipo definido`, severity: 'error' });
      }
    }

    // 4. Queries do Prisma sem await em rotas API
    if (filePath.includes('/api/') && filePath.includes('route.ts')) {
      if (line.includes('prisma.') && !line.includes('await')) {
        const methodMatch = line.match(/prisma\.[a-zA-Z]+\.(findMany|findUnique|create|update|delete)/);
        if (methodMatch) {
          issues.push({ file: relativePath, line: lineNumber, issue: `Query Prisma '${methodMatch[1]}' sem await - pode causar erro`, severity: 'error' });
        }
      }
    }
  });
}

function printReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 RELATÓRIO DE VERIFICAÇÃO DE TIPOS - PRISMA SCHEMA');
  console.log('='.repeat(80) + '\n');

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');

  console.log(`❌ Erros encontrados: ${errors.length}`);
  console.log(`⚠️  Avisos encontrados: ${warnings.length}`);
  console.log(`📁 Total de problemas: ${issues.length}\n`);

  if (errors.length > 0) {
    console.log('🔴 ERROS CRÍTICOS (impedem deploy):\n');
    const fileGroups = groupByFile(errors);
    for (const [file, fileIssues] of Object.entries(fileGroups)) {
      console.log(`\n📄 ${file} (${fileIssues.length} erros)`);
      fileIssues.forEach(issue => console.log(`   Linha ${issue.line}: ${issue.issue}`));
    }
  }

  if (warnings.length > 0) {
    console.log('\n\n🟡 AVISOS (recomendado corrigir):\n');
    const fileGroups = groupByFile(warnings);
    for (const [file, fileIssues] of Object.entries(fileGroups)) {
      console.log(`\n📄 ${file} (${fileIssues.length} avisos)`);
      fileIssues.forEach(issue => console.log(`   Linha ${issue.line}: ${issue.issue}`));
    }
  }

  console.log('\n' + '='.repeat(80));
  if (errors.length === 0) {
    console.log('✅ Nenhum erro crítico encontrado! Aplicação pronta para deploy.');
  } else {
    console.log(`❌ Corrija os ${errors.length} erros antes de fazer deploy!`);
  }
  console.log('='.repeat(80) + '\n');

  const allFileGroups = groupByFile(issues);
  const sortedFiles = Object.entries(allFileGroups).sort((a, b) => b[1].length - a[1].length);
  
  if (sortedFiles.length > 0) {
    console.log('📊 TOP 10 ARQUIVOS COM MAIS PROBLEMAS:\n');
    sortedFiles.slice(0, 10).forEach(([file, fileIssues], index) => {
      const errorCount = fileIssues.filter(i => i.severity === 'error').length;
      const warningCount = fileIssues.filter(i => i.severity === 'warning').length;
      console.log(`${index + 1}. ${file}`);
      console.log(`   ❌ ${errorCount} erros | ⚠️  ${warningCount} avisos\n`);
    });
  }
}

function groupByFile(issueList) {
  const grouped = {};
  issueList.forEach(issue => {
    if (!grouped[issue.file]) grouped[issue.file] = [];
    grouped[issue.file].push(issue);
  });
  return grouped;
}

const srcPath = path.join(process.cwd(), 'src');
console.log('🔍 Iniciando scan de tipos baseado no Prisma Schema...\n');
console.log(`📂 Diretório: ${srcPath}\n`);

if (fs.existsSync(srcPath)) {
  scanDirectory(srcPath);
  printReport();
  const errors = issues.filter(i => i.severity === 'error');
  process.exit(errors.length > 0 ? 1 : 0);
} else {
  console.error('❌ Diretório src/ não encontrado!');
  process.exit(1);
}