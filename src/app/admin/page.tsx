'use client'

import { useEffect, useState } from 'react'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const [list, setList] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/reservations')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setList(data)
        else setError(data.error || 'Failed to load')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
        <span className="text-sm text-gray-500">
          {loading ? '...' : `${list.length} total`}
        </span>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center py-12">{error}</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No reservations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-600">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Contact</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Time</th>
                <th className="pb-3 pr-4 font-medium">Guests</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 pr-4 font-medium text-gray-900">{r.name}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    <div>{r.email}</div>
                    <div className="text-xs">{r.phone}</div>
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{r.date}</td>
                  <td className="py-3 pr-4 text-gray-700">{r.time.slice(0, 5)}</td>
                  <td className="py-3 pr-4 text-gray-700">{r.guests}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      r.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 max-w-[200px] truncate">{r.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-10">
        <a href="/" className="text-blue-600 hover:underline">← Back to booking</a>
      </p>
    </main>
  )
}