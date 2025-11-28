import { useState, useEffect } from 'react'

export function useLeads() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => {
        setLeads(d.data)
        setLoading(false)
      })
  }, [])

  return { leads, loading }
}