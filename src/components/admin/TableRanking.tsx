// /app/admin/components/TableRangking.tsx
'use client'

import React from 'react'

type RankedPendaftar = {
  id: number
  namaLengkap: string
  jurusanUtama: string
  nilaitotal: number
}

type TableRangkingProps = {
  dataRangking: RankedPendaftar[]
}

export default function TableRangking({ dataRangking }: TableRangkingProps) {
  return (
    <table className="min-w-full border-collapse block md:table">
      <thead className="block md:table-header-group">
        <tr className="border border-gray-300 block md:table-row">
          <th className="p-2 text-left md:table-cell">#</th>
          <th className="p-2 text-left md:table-cell">Nama Lengkap</th>
          <th className="p-2 text-left md:table-cell">Jurusan</th>
          <th className="p-2 text-left md:table-cell">Nilai Total</th>
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {dataRangking.map((pendaftar, index) => (
          <tr key={pendaftar.id} className="border border-gray-300 block md:table-row">
            <td className="p-2 text-left md:table-cell">{index + 1}</td>
            <td className="p-2 text-left md:table-cell">{pendaftar.namaLengkap}</td>
            <td className="p-2 text-left md:table-cell">{pendaftar.jurusanUtama}</td>
            <td className="p-2 text-left md:table-cell">{pendaftar.nilaitotal.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
