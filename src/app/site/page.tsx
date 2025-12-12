// Crie este arquivo: app/site/page.tsx

import { redirect } from 'next/navigation';

export default function SitePublicoPage() {
  // Redireciona para o HTML estático
  redirect('/site/index.html');
}

// OU se quiser renderizar direto:

// 'use client';
// 
// import { useEffect } from 'react';
// 
// export default function SitePublicoPage() {
//   useEffect(() => {
//     window.location.href = '/site/index.html';
//   }, []);
//   
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Redirecionando para o site...</h2>
//         <p>Se não redirecionar automaticamente, <a href="/site/index.html" className="text-blue-500 underline">clique aqui</a></p>
//       </div>
//     </div>
//   );
// }