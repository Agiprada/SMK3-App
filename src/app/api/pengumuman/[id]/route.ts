// app/api/pengumuman/[id]/route.ts
import { NextResponse } from 'next/server'
import  prisma  from '@/libs/prisma'

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