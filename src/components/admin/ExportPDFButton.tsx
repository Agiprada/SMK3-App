'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type RankedPendaftar = {
  id: number
  namaLengkap: string
  jurusanUtama: string
  nilaitotal: number
}

type ExportPDFButtonProps = {
  dataRangking: { [jurusan: string]: RankedPendaftar[] }
}

export default function ExportPDFButton({ dataRangking }: ExportPDFButtonProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF()
    const jurusanNames = Object.keys(dataRangking)

    jurusanNames.forEach((jurusan, index) => {
      const data = dataRangking[jurusan]
      if (index > 0) doc.addPage() // Tambahkan halaman baru untuk jurusan berikutnya

      // Header halaman
      doc.setFontSize(16)
      doc.text(`Ranking Jurusan: ${jurusan}`, 14, 20)

      // Buat tabel menggunakan `autoTable`
      autoTable(doc, {
        startY: 30,
        head: [['#', 'Nama Lengkap', 'Jurusan Utama', 'Nilai Total']],
        body: data.map((pendaftar, i) => [
          i + 1,
          pendaftar.namaLengkap,
          pendaftar.jurusanUtama,
          pendaftar.nilaitotal.toFixed(2),
        ]),
      })
    })

    // Simpan file PDF
    doc.save('RankingData.pdf')
  }

  return (
    <button
      onClick={handleExportPDF}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Export PDF
    </button>
  )
}
