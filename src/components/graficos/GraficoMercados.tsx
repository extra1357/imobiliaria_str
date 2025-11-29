'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function GraficoMercado({ dados }: { dados: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Evolução do Mercado</h3>
      <LineChart width={600} height={300} data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valorM2" stroke="#0ea5e9" />
      </LineChart>
    </div>
  )
}