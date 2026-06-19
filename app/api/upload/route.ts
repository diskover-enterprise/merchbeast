import { getAuthSession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: Request) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  // Allow dashboard cookie auth
  const cookieStore = await cookies()
  const dashboardAuth = cookieStore.get('mb-dashboard-auth')?.value === 'true'

  if (!dashboardAuth) {
    const session = await getAuthSession()
    if (!session?.user?.shopId && session?.user?.role !== 'admin')
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const folder = session.user.shopId
      ? `afterdessert/${session.user.shopId}`
      : 'afterdessert/admin'

    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (err, res) => {
        if (err || !res) return reject(err)
        resolve(res as { secure_url: string })
      })
      .end(buffer)
  })

  return Response.json({ url: result.secure_url })
}
