import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()
  const correct = process.env.DASHBOARD_PASSWORD || 'MerchBeast2026!'

  if (password !== correct) {
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('mb-dashboard-auth', 'true', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return Response.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('mb-dashboard-auth')
  return Response.json({ ok: true })
}
