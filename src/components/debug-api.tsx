'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export function DebugAPI() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.get('/students/')
      console.log('API Response:', result)
      console.log('Type:', typeof result)
      console.log('Is Array:', Array.isArray(result))
      setData(result)
    } catch (err: any) {
      console.error('API Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-4">API Debug</h3>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Students API'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {data && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          <strong>Success!</strong>
          <pre className="mt-2 text-xs overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
