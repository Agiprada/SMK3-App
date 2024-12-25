'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { BsInfoSquareFill } from "react-icons/bs";

type Pendaftar = {
    id: number
    namaLengkap: string
    email: string
    noHp: string
    jurusanUtama: string
    jurusanCadangan: string
    createdAt: string  // Ubah ini dari Date menjadi string
    status: string
    nilaitotal: number
  }

type TableDataPendaftarProps = {
  dataPendaftar: Pendaftar[]
}

export default function TableDataPendaftar({ dataPendaftar }: TableDataPendaftarProps) {
    // console.log('data pendaftar:', dataPendaftar)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredData = dataPendaftar.filter((pendaftar) => {
    // Filter data berdasarkan pencarian dan status
    const matchesSearch =
      pendaftar.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) || // Cocokkan nama lengkap
      pendaftar.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Cocokkan email
      pendaftar.jurusanUtama.toLowerCase().includes(searchTerm.toLowerCase()) || // Cocokkan jurusan utama
      pendaftar.jurusanCadangan.toLowerCase().includes(searchTerm.toLowerCase()) // Cocokkan jurusan cadangan
  
    const matchesStatus =
      statusFilter === 'All' || // Jika filter status 'All', tampilkan semua data
      pendaftar.status.toLowerCase() === statusFilter.toLowerCase() // Cocokkan status
  
    return matchesSearch && matchesStatus
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-1">
        <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold leading-tight">Data Pendaftar</h1>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none h-full border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Menunggu</option>
                  <option>Verified</option>
              </select>
            </div>
          </div>

          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
              </svg>
            </span>
            <input
              placeholder="Cari"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        </div>
        
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    J. Utama
                  </th>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    J. Cadangan
                  </th>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nilai Total
                  </th>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                  <th className="px-5 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>    
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pendaftar) => (
                  <tr key={pendaftar.id}>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {pendaftar.namaLengkap}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {pendaftar.jurusanUtama}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {pendaftar.jurusanCadangan}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {pendaftar.nilaitotal.toFixed(2)}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <Link
                        href={`/admin/data-pendaftar/${pendaftar.id}`}
                        className="text-blue-500 hover:text-blue-700"
                       ><BsInfoSquareFill size={25} />
                      </Link>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {pendaftar.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Menampilkan {indexOfFirstItem + 1} sampai {Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} Data
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                >
                  Prev
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastItem >= filteredData.length}
                  className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}