// /app/admin/data-rangking/page.tsx
import prisma from '@/libs/prisma'
import TableRangking from '@/components/admin/TableRanking'
import ExportPDFButton from '@/components/admin/ExportPDFButton'

// Fungsi untuk mendapatkan dan memproses data perangkingan
async function getRankedData() {
  // Ambil data dari database dengan status 'Verified' dan urutkan berdasarkan nilai total secara descending
  const verifiedData = await prisma.pendaftaran.findMany({
    where: {
      status: 'Verified', // Hanya data dengan status Verified
    },
    orderBy: {
      nilaitotal: 'desc', // Urutkan berdasarkan nilai total tertinggi
    },
    select: {
      id: true,
      namaLengkap: true,
      jurusanUtama: true,
      jurusanCadangan: true,
      nilaitotal: true,
    },
  })

  // Inisialisasi struktur data untuk menampung hasil perangkingan
  const jurusanMap = new Map<string, any[]>() // Map untuk semua jurusan
  const tidakLolos: any[] = [] // Untuk peserta yang tidak lolos

  const maxSlot = 60 // Jumlah slot maksimum per jurusan

  // Proses setiap pendaftar yang lolos verifikasi
  verifiedData.forEach((pendaftar) => {
    const { jurusanUtama, jurusanCadangan } = pendaftar

    // Cek slot di jurusan utama
    if (!jurusanMap.has(jurusanUtama)) {
      jurusanMap.set(jurusanUtama, []) // Jika jurusan belum ada, inisialisasi dengan array kosong
    }
    if (jurusanMap.get(jurusanUtama)!.length < maxSlot) {
      jurusanMap.get(jurusanUtama)!.push(pendaftar) // Tambahkan pendaftar ke jurusan utama jika masih ada slot
      return // Berhenti jika pendaftar sudah ditempatkan
    }

    // Jika slot jurusan utama penuh, cek jurusan cadangan
    if (jurusanCadangan) {
      if (!jurusanMap.has(jurusanCadangan)) {
        jurusanMap.set(jurusanCadangan, []) // Jika jurusan cadangan belum ada, inisialisasi dengan array kosong
      }
      if (jurusanMap.get(jurusanCadangan)!.length < maxSlot) {
        jurusanMap.get(jurusanCadangan)!.push(pendaftar) // Tambahkan pendaftar ke jurusan cadangan jika masih ada slot
        return // Berhenti jika pendaftar sudah ditempatkan
      }
    }

    // Jika slot di jurusan utama dan cadangan penuh, masukkan ke daftar tidak lolos
    tidakLolos.push(pendaftar)
  })

  // Kembalikan hasil perangkingan dalam bentuk objek
  return {
    jurusan: Object.fromEntries(jurusanMap), // Ubah Map menjadi Object untuk kemudahan akses
    tidakLolos, // Daftar peserta yang tidak lolos
  }
}

// Komponen utama halaman Data Rangking
export default async function DataRangkingPage() {
  // Ambil data perangkingan
  const rankedData = await getRankedData()

  return (
    <div className="container mx-auto px-4 sm:px-8">
      {/* Header halaman */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-4">Hasil Perangkingan</h1>
        {/* Tombol untuk export PDF */}
        <div className="my-4">
          <ExportPDFButton dataRangking={rankedData.jurusan} />
        </div>
      </div>
      <hr className="mb-2" />

      {/* Tampilkan hasil perangkingan semua jurusan */}
      <div>
        <h2 className="text-xl font-semibold">Hasil Rangking Per Jurusan</h2>
        {Object.keys(rankedData.jurusan).map((jurusan) => (
          <div key={jurusan}>
            <h3 className="text-lg font-semibold">{jurusan}</h3>
            <TableRangking dataRangking={rankedData.jurusan[jurusan]} />
          </div>
        ))}
      </div>

      {/* Tampilkan daftar peserta yang tidak lolos */}
      <div>
        <h2 className="text-xl font-semibold">Tidak Lolos</h2>
        <TableRangking dataRangking={rankedData.tidakLolos} />
      </div>
    </div>
  )
}
