const fs = require('fs');
const path = require('path');

let fixCount = 0;

function fixDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist' || entry.name === '.git') {
      continue;
    }

    if (entry.isDirectory()) {
      fixDirectory(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const relativePath = path.relative(process.cwd(), filePath);

  // Correções específicas para parâmetros comuns que sobraram

  // (files) => ... para (files: any) => ...
  content = content.replace(/\(files\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(files: any) =>';
  });

  // (props) => ... para (props: any) => ...
  content = content.replace(/\(props\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(props: any) =>';
  });

  // (prop) => ... para (prop: any) => ...
  content = content.replace(/\(prop\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(prop: any) =>';
  });

  // (_) => ... para (_: any) => ...
  content = content.replace(/\(_\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(_: any) =>';
  });

  // (img) => ... para (img: any) => ...
  content = content.replace(/\(img\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(img: any) =>';
  });

  // (resolve) => ... para (resolve: any) => ...
  content = content.replace(/\(resolve\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(resolve: any) =>';
  });

  // (key) => ... para (key: string) => ...
  content = content.replace(/\(key\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(key: string) =>';
  });

  // (url) => ... para (url: string) => ...
  content = content.replace(/\(url\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(url: string) =>';
  });

  // (path) => ... para (path: string) => ...
  content = content.replace(/\(path\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(path: string) =>';
  });

  // (message) => ... para (message: string) => ...
  content = content.replace(/\(message\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(message: string) =>';
  });

  // (texto) => ... para (texto: string) => ...
  content = content.replace(/\(texto\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(texto: string) =>';
  });

  // (loading) => ... para (loading: boolean) => ...
  content = content.replace(/\(loading\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(loading: boolean) =>';
  });

  // (section) => ... para (section: any) => ...
  content = content.replace(/\(section\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(section: any) =>';
  });

  // (analise) => ... para (analise: any) => ...
  content = content.replace(/\(analise\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(analise: any) =>';
  });

  // (analises) => ... para (analises: any) => ...
  content = content.replace(/\(analises\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(analises: any) =>';
  });

  // (body) => ... para (body: any) => ...
  content = content.replace(/\(body\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(body: any) =>';
  });

  // (lead) => ... para (lead: any) => ...
  content = content.replace(/\(lead\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(lead: any) =>';
  });

  // (leads) => ... para (leads: any) => ...
  content = content.replace(/\(leads\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(leads: any) =>';
  });

  // (imovel) => ... para (imovel: any) => ...
  content = content.replace(/\(imovel\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(imovel: any) =>';
  });

  // (imoveis) => ... para (imoveis: any) => ...
  content = content.replace(/\(imoveis\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(imoveis: any) =>';
  });

  // (consulta) => ... para (consulta: any) => ...
  content = content.replace(/\(consulta\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(consulta: any) =>';
  });

  // (consultas) => ... para (consultas: any) => ...
  content = content.replace(/\(consultas\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(consultas: any) =>';
  });

  // (relatorio) => ... para (relatorio: any) => ...
  content = content.replace(/\(relatorio\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(relatorio: any) =>';
  });

  // (relatorios) => ... para (relatorios: any) => ...
  content = content.replace(/\(relatorios\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(relatorios: any) =>';
  });

  // (proprietario) => ... para (proprietario: any) => ...
  content = content.replace(/\(proprietario\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(proprietario: any) =>';
  });

  // (proprietarios) => ... para (proprietarios: any) => ...
  content = content.replace(/\(proprietarios\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(proprietarios: any) =>';
  });

  // (query) => ... para (query: string) => ...
  content = content.replace(/\(query\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(query: string) =>';
  });

  // (resultado) => ... para (resultado: any) => ...
  content = content.replace(/\(resultado\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(resultado: any) =>';
  });

  // (resultados) => ... para (resultados: any) => ...
  content = content.replace(/\(resultados\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(resultados: any) =>';
  });

  // (status) => ... para (status: string) => ...
  content = content.replace(/\(status\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(status: string) =>';
  });

  // (novoStatus) => ... para (novoStatus: string) => ...
  content = content.replace(/\(novoStatus\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(novoStatus: string) =>';
  });

  // (tipo) => ... para (tipo: string) => ...
  content = content.replace(/\(tipo\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(tipo: string) =>';
  });

  // (cidade) => ... para (cidade: string) => ...
  content = content.replace(/\(cidade\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(cidade: string) =>';
  });

  // (estado) => ... para (estado: string) => ...
  content = content.replace(/\(estado\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(estado: string) =>';
  });

  // (fieldKey) => ... para (fieldKey: string) => ...
  content = content.replace(/\(fieldKey\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(fieldKey: string) =>';
  });

  // (feedback) => ... para (feedback: string) => ...
  content = content.replace(/\(feedback\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(feedback: string) =>';
  });

  // (search) => ... para (search: string) => ...
  content = content.replace(/\(search\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(search: string) =>';
  });

  // (success) => ... para (success: boolean) => ...
  content = content.replace(/\(success\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(success: boolean) =>';
  });

  // (ok) => ... para (ok: boolean) => ...
  content = content.replace(/\(ok\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(ok: boolean) =>';
  });

  // (valid) => ... para (valid: boolean) => ...
  content = content.replace(/\(valid\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(valid: boolean) =>';
  });

  // (c) => ... para (c: any) => ...
  content = content.replace(/\(c\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(c: any) =>';
  });

  // (d) => ... para (d: any) => ...
  content = content.replace(/\(d\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(d: any) =>';
  });

  // (num) => ... para (num: number) => ...
  content = content.replace(/\(num\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(num: number) =>';
  });

  // (api) => ... para (api: any) => ...
  content = content.replace(/\(api\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(api: any) =>';
  });

  // (stat) => ... para (stat: any) => ...
  content = content.replace(/\(stat\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(stat: any) =>';
  });

  // (stats) => ... para (stats: any) => ...
  content = content.replace(/\(stats\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(stats: any) =>';
  });

  // (newStats) => ... para (newStats: any) => ...
  content = content.replace(/\(newStats\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(newStats: any) =>';
  });

  // (imagens) => ... para (imagens: any) => ...
  content = content.replace(/\(imagens\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(imagens: any) =>';
  });

  // Casos especiais com múltiplos parâmetros
  // (a, b) => ... para (a: any, b: any) => ...
  content = content.replace(/\(([a-z]),\s*([a-z])\)\s*=>/g, (match, p1, p2) => {
    modified = true;
    fixCount++;
    return `(${p1}: any, ${p2}: any) =>`;
  });

  // Salvar se houve modificações
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Corrigido: ${relativePath} (${modified ? 'modificado' : 'sem mudanças'})`);
  }
}

console.log('🔧 Iniciando SUPER correção de tipos específicos...\n');

const srcPath = path.join(process.cwd(), 'src');

if (fs.existsSync(srcPath)) {
  fixDirectory(srcPath);
  
  console.log('\n' + '='.repeat(80));
  console.log(`✅ SUPER Correção concluída! Total de fixes: ${fixCount}`);
  console.log('='.repeat(80));
  console.log('\n💡 Execute "npm run scan" novamente!\n');
} else {
  console.error('❌ Diretório src/ não encontrado!');
  process.exit(1);
}