'use client';

import { useEffect } from 'react';

export default function SitePublicoPage() {
  useEffect(() => {
    window.location.href = '/site/index.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Redirecionando para a vitrine...</h2>
        <p className="text-gray-600">
          Se não redirecionar automaticamente,{' '}
          <a href="/site/index.html" className="text-blue-600 underline hover:text-blue-700">
            clique aqui
          </a>
        </p>
      </div>
    </div>
  );
}