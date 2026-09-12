import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return Response.json({ error: 'Supabase not configured' }, { status: 500 })
    }

    const body = await req.json()
    const { name, email, phone, date, time, guests, notes } = body

    if (!name || !email || !phone || !date || !time || !guests) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert({ name, email, phone, date, time, guests, notes })
      .select()
      .single()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ ok: true, reservation: data }, { status: 201 })
  } catch (e) {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  if (!supabase) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}