'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoProprietario() {
  const router = useRouter()
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch('/api/proprietarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/proprietarios')
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Novo Proprietário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Nome</label>
          <input 
            className="w-full p-2 border rounded"
            value={form.nome}
            onChange={e => setForm({...form, nome: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input 
            type="email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Telefone</label>
          <input 
            className="w-full p-2 border rounded"
            value={form.telefone}
            onChange={e => setForm({...form, telefone: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Criar Proprietário
        </button>
      </form>
    </div>
  )
}