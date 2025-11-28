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

  // 1. Corrigir useState sem tipo genérico
  // useState(true) -> useState<boolean>(true)
  content = content.replace(/useState\((true|false)\)/g, (match, value) => {
    modified = true;
    fixCount++;
    return `useState<boolean>(${value})`;
  });

  // useState(null) -> useState<any>(null)
  content = content.replace(/useState\(null\)/g, () => {
    modified = true;
    fixCount++;
    return 'useState<any>(null)';
  });

  // useState([]) -> useState<any[]>([])
  content = content.replace(/useState\(\[\]\)/g, () => {
    modified = true;
    fixCount++;
    return 'useState<any[]>([])';
  });

  // useState('') -> useState<string>('')
  content = content.replace(/useState\(['"]{2}\)/g, () => {
    modified = true;
    fixCount++;
    return "useState<string>('')";
  });

  // 2. Corrigir parâmetros comuns sem tipo
  // (e) => ... para (e: any) => ...
  content = content.replace(/\(e\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(e: any) =>';
  });

  // (error) => ... para (error: any) => ...
  content = content.replace(/\(error\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(error: any) =>';
  });

  // (err) => ... para (err: any) => ...
  content = content.replace(/\(err\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(err: any) =>';
  });

  // (data) => ... para (data: any) => ...
  content = content.replace(/\(data\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(data: any) =>';
  });

  // (item) => ... para (item: any) => ...
  content = content.replace(/\(item\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(item: any) =>';
  });

  // (value) => ... para (value: any) => ...
  content = content.replace(/\(value\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(value: any) =>';
  });

  // (file) => ... para (file: any) => ...
  content = content.replace(/\(file\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(file: any) =>';
  });

  // (index) => ... para (index: number) => ...
  content = content.replace(/\(index\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(index: number) =>';
  });

  // (id) => ... para (id: string) => ...
  content = content.replace(/\(id\)\s*=>/g, () => {
    modified = true;
    fixCount++;
    return '(id: string) =>';
  });

  // .map((item) => ... para .map((item: any) => ...
  content = content.replace(/\.map\(\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/g, (match, param) => {
    modified = true;
    fixCount++;
    return `.map((${param}: any) =>`;
  });

  // .filter((item) => ... para .filter((item: any) => ...
  content = content.replace(/\.filter\(\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/g, (match, param) => {
    modified = true;
    fixCount++;
    return `.filter((${param}: any) =>`;
  });

  // .forEach((item) => ... para .forEach((item: any) => ...
  content = content.replace(/\.forEach\(\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/g, (match, param) => {
    modified = true;
    fixCount++;
    return `.forEach((${param}: any) =>`;
  });

  // .reduce((acc, item) => ... para .reduce((acc: any, item: any) => ...
  content = content.replace(/\.reduce\(\(([a-zA-Z_][a-zA-Z0-9_]*),\s*([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/g, (match, p1, p2) => {
    modified = true;
    fixCount++;
    return `.reduce((${p1}: any, ${p2}: any) =>`;
  });

  // async (param) => ... para async (param: any) => ...
  content = content.replace(/async\s+\(([a-zA-Z_][a-zA-Z0-9_]*)\)\s*=>/g, (match, param) => {
    if (!param.includes(':')) {
      modified = true;
      fixCount++;
      return `async (${param}: any) =>`;
    }
    return match;
  });

  // Salvar se houve modificações
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Corrigido: ${relativePath}`);
  }
}

console.log('🔧 Iniciando correção automática de tipos...\n');

const srcPath = path.join(process.cwd(), 'src');

if (fs.existsSync(srcPath)) {
  fixDirectory(srcPath);
  
  console.log('\n' + '='.repeat(80));
  console.log(`✅ Correção concluída! Total de fixes: ${fixCount}`);
  console.log('='.repeat(80));
  console.log('\n💡 Execute "npm run scan" novamente para ver o progresso!\n');
} else {
  console.error('❌ Diretório src/ não encontrado!');
  process.exit(1);
}