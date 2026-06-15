export async function POST(request: Request) {
  const { password } = await request.json()
  const correct = process.env.DASHBOARD_PASSWORD || 'MerchBeast2026!'

  console.log('[dashboard/auth] password attempt, correct length:', correct.length)

  if (password !== correct) {
    console.log('[dashboard/auth] wrong password')
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  console.log('[dashboard/auth] correct password, setting cookie')

  const maxAge = 60 * 60 * 24 * 7 // 7 days
  const cookieValue = `mb-dashboard-auth=true; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieValue,
    },
  })
}

export async function DELETE() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'mb-dashboard-auth=; Path=/; HttpOnly; Max-Age=0',
    },
  })
}
