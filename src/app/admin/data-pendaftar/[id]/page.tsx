import prisma from '@/libs/prisma'
import { notFound } from 'next/navigation'

async function getPendaftarDetail(id: string) {
  const pendaftar = await prisma.pendaftaran.findUnique({
    where: { id: parseInt(id) },
    select: {
      nisn: true,
      namaLengkap: true,
      jenisKelamin: true,
      tempatLahir: true,
      tanggalLahir: true,
      noHp: true,
      email: true,
      agama: true,
      alamatDomisili: true,
      alamatKK: true,
      jurusanUtama: true,
      jurusanCadangan: true,
      nilaitotal: true,
      status: true,
      tinggiBadan: true,
      kondisiMata: true,
      riwayatPenyakit: true,
      raporFile: true,
      fotoFile: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  
  if (!pendaftar) {
    notFound()
  }

  return JSON.parse(JSON.stringify(pendaftar))
}

export default async function DetailPendaftarPage({ params }: { params: { id: string } }) {
  const pendaftar = await getPendaftarDetail(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detail Pendaftar</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Data Pribadi</h2>
          <p><strong>Nama Lengkap:</strong> {pendaftar.namaLengkap || 'Tidak ada data'}</p>
          <p><strong>NISN:</strong> {pendaftar.nisn || 'Tidak ada data'}</p>
          <p><strong>Jenis Kelamin:</strong> {pendaftar.jenisKelamin || 'Tidak ada data'}</p>
          <p><strong>Tempat Lahir:</strong> {pendaftar.tempatLahir || 'Tidak ada data'}</p>
          <p><strong>Tanggal Lahir:</strong> {pendaftar.tanggalLahir ? new Date(pendaftar.tanggalLahir).toLocaleDateString() : 'Tidak ada data'}</p>
          <p><strong>Agama:</strong> {pendaftar.agama || 'Tidak ada data'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Kontak</h2>
          <p><strong>Email:</strong> {pendaftar.email || 'Tidak ada data'}</p>
          <p><strong>No. HP:</strong> {pendaftar.noHp || 'Tidak ada data'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Alamat</h2>
          <p><strong>Alamat Domisili:</strong> {pendaftar.alamatDomisili || 'Tidak ada data'}</p>
          <p><strong>Alamat KK:</strong> {pendaftar.alamatKK || 'Tidak ada data'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Data Pendaftaran</h2>
          <p><strong>Jurusan Utama:</strong> {pendaftar.jurusanUtama || 'Tidak ada data'}</p>
          <p><strong>Jurusan Cadangan:</strong> {pendaftar.jurusanCadangan || 'Tidak ada data'}</p>
          <p><strong>Nilai Total:</strong> {pendaftar.nilaitotal ? pendaftar.nilaitotal.toFixed(2) : 'Belum ada'}</p>
          <p><strong>Status:</strong> {pendaftar.status || 'Tidak ada data'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Data Fisik</h2>
          <p><strong>Tinggi Badan:</strong> {pendaftar.tinggiBadan || 'Tidak ada data'} cm</p>
          <p><strong>Kondisi Mata:</strong> {pendaftar.kondisiMata || 'Tidak ada data'}</p>
          <p><strong>Riwayat Penyakit:</strong> {pendaftar.riwayatPenyakit || 'Tidak ada'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Berkas</h2>
          <a href={`/uploads/${pendaftar.raporFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Lihat File Rapor
          </a>

          <p><img src={`/uploads/${pendaftar.fotoFile}`} alt="Foto Pendaftar" className="max-w-xs rounded shadow-md" />
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Informasi Tambahan</h2>
          <p><strong>Tanggal Pendaftaran:</strong> {pendaftar.createdAt ? new Date(pendaftar.createdAt).toLocaleString() : 'Tidak ada data'}</p>
          <p><strong>Terakhir Diperbarui:</strong> {pendaftar.updatedAt ? new Date(pendaftar.updatedAt).toLocaleString() : 'Tidak ada data'}</p>
        </div>
      </div>
    </div>
  )
}
