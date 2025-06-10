// app/api/pengumuman/[id]/route.ts
import { NextResponse } from 'next/server'
import  prisma  from '@/libs/prisma'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id }
    })

    if (!pengumuman) {
      return NextResponse.json(
        { error: 'Pengumuman tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(pengumuman)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const formData = await request.formData()
    
    const judul = formData.get('judul') as string
    const isi = formData.get('isi') as string
    const dokumenFile = formData.get('dokumen') as File | null
    const removeFile = formData.get('removeFile') === 'true'

    // Dapatkan data pengumuman saat ini
    const currentPengumuman = await prisma.pengumuman.findUnique({
      where: { id }
    })

    let dokumenPath = currentPengumuman?.dokument || null
    
    // Handle penghapusan file
    if ((removeFile || dokumenFile) && currentPengumuman?.dokument) {
      const filePath = path.join(process.cwd(), 'public', currentPengumuman.dokument)
      try {
        await unlink(filePath)
        dokumenPath = null
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }

    // Handle upload file baru
    if (dokumenFile) {
      const buffer = Buffer.from(await dokumenFile.arrayBuffer())
      const filename = Date.now() + '_' + dokumenFile.name.replace(/\s+/g, '_')
      const uploadDir = path.join(process.cwd(), 'public/uploads/pengumuman')
      
      try {
        await writeFile(`${uploadDir}/${filename}`, buffer)
        dokumenPath = `/uploads/pengumuman/${filename}`
      } catch (error) {
        console.error('Error saving file:', error)
        return NextResponse.json(
          { error: 'Gagal mengunggah file' },
          { status: 500 }
        )
      }
    }

    // Pada bagian penghapusan file:
    if ((removeFile || dokumenFile) && currentPengumuman?.dokument) {
      const filePath = path.join(
        process.cwd(), 
        'public', 
        currentPengumuman.dokument
      )
      try {
        await unlink(filePath)
        dokumenPath = null
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }

    // Update data di database
    const updatedPengumuman = await prisma.pengumuman.update({
      where: { id },
      data: {
        judul,
        isi,
        dokument: dokumenPath,
      },
    })

    return NextResponse.json(updatedPengumuman)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // Hapus file terkait jika ada (opsional)
    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id }
    })
    
    if (pengumuman?.dokument) {
      // Tambahkan logika penghapusan file di sini jika diperlukan
    }

    await prisma.pengumuman.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}