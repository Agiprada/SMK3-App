import React from 'react'

export default function DataSiswa() {
  return (
    <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300">
    <tbody>
      <tr className="border-b">
        <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Header 1</th>
        <td className="px-4 py-2 bg-gray-100 text-gray-800">Isi Kolom 1</td>
        <td className="px-4 py-2 text-center border-1 text-gray-800">Foto</td>
      </tr>
 
      <tr className="border-b">
        <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Header 2</th>
        <td className="px-4 py-2 bg-gray-100 text-gray-800">Isi Kolom 2</td>
        <td rowSpan={5} className="px-4 py-2 text-gray-800">lokasi foto</td>
      </tr>
    
      <tr>
        <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700 align-top">Header 3</th>
        <td className="px-4 py-2 bg-gray-100 text-gray-800">Isi Kolom 3</td>
      </tr>
      <tr>
        <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700 align-top">Header 3</th>
        <td className="px-4 py-2 bg-gray-100 text-gray-800">Isi Kolom 3</td>
      </tr>
    </tbody>
  </table>
</div>


  )
}
