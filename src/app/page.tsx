'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setResult({ ok: true, message: 'Reservation confirmed! We look forward to seeing you.' })
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' })
      } else {
        setResult({ ok: false, message: data.error || 'Something went wrong.' })
      }
    } catch {
      setResult({ ok: false, message: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field: string, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }))

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservations</h1>
        <p className="text-gray-600">Book your table — fast and easy</p>
      </div>

      {result && (
        <div
          className={`mb-6 p-4 rounded-lg text-center ${
            result.ok
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {result.message}
          <button
            className="block mx-auto mt-2 text-sm underline"
            onClick={() => setResult(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
            <input
              type="time"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests *</label>
            <input
              type="number"
              required
              min={1}
              max={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={form.guests}
              onChange={(e) => update('guests', parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows={3}
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Allergies, special requests..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Booking...' : 'Book Now'}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-6">
        <a href="/admin" className="text-blue-600 hover:underline mr-4">View bookings →</a>
        Powered by Reinvent Labs
      </p>
    </main>
  )
}