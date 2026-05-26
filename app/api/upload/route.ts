import { getAuthSession } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session?.user?.restaurantId && session?.user?.role !== 'admin')
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const folder = session.user.restaurantId
      ? `afterdessert/${session.user.restaurantId}`
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
