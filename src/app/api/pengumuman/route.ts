import { NextResponse } from 'next/server'
import  prisma  from '@/libs/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const judul = formData.get('judul') as string
    const isi = formData.get('isi') as string
    const dokumenFile = formData.get('dokumen') as File | null

    let dokumentPath = null
    
    // Handle file upload
    if (dokumenFile) {
      const buffer = Buffer.from(await dokumenFile.arrayBuffer())
      const filename = Date.now() + '_' + dokumenFile.name.replace(/\s+/g, '_')
      const uploadDir = path.join(process.cwd(), 'public/uploads/pengumuman')
      
      try {
        await writeFile(`${uploadDir}/${filename}`, buffer)
        dokumentPath = `/uploads/${filename}`
      } catch (error) {
        console.error('Error saving file:', error)
        return NextResponse.json(
          { error: 'Gagal mengunggah file' },
          { status: 500 }
        )
      }
    }

    // Simpan ke database
    const pengumuman = await prisma.pengumuman.create({
      data: {
        judul,
        isi,
        dokument: dokumentPath,
      },
    })

    return NextResponse.json(pengumuman)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const pengumuman = await prisma.pengumuman.findMany({
      orderBy: {
        createAt: 'desc'
      }
    })
    return NextResponse.json(pengumuman)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}