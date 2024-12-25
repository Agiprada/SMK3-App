import prisma from '@/libs/prisma'
import TableDataPendaftar from '@/components/admin/table-pendaftaran'

async function getPendaftar() {
  const pendaftar = await prisma.pendaftaran.findMany({
    select: {
      id: true,
      namaLengkap: true,
      email: true,
      noHp: true,
      jurusanUtama: true,
      jurusanCadangan: true,
      createdAt: true,
      status: true,
      nilaitotal: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return JSON.parse(JSON.stringify(pendaftar))
}

export default async function DataPendaftarPage() {
  const dataPendaftar = await getPendaftar()
  return <TableDataPendaftar dataPendaftar={dataPendaftar} />
}