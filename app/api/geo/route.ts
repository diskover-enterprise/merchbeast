// Visitor country from Vercel's geo header, so client storefronts can show USD prices to US visitors
export async function GET(request: Request) {
  return Response.json(
    { country: request.headers.get('x-vercel-ip-country') },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}
