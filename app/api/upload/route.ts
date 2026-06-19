import { cookies } from 'next/headers'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true')
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'merchbeast', resource_type: 'image' }, (err, res) => {
        if (err || !res) return reject(err)
        resolve(res as { secure_url: string })
      })
      .end(buffer)
  })

  return Response.json({ url: result.secure_url })
}
