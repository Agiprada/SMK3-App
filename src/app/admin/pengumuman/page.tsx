'use client'

import React, { useEffect, useState } from 'react'
import { FaEye, FaTrashAlt, FaPenFancy } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

interface Pengumuman {
  id: number
  judul: string
  isi: string
  dokumen: string | null
  createAt: string
  updatedAt: string
}

export default function Pengumuman() {
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPengumuman()
  }, [])

  const fetchPengumuman = async () => {
    try {
      const response = await fetch('/api/pengumuman')
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengumuman')
      }
      const data = await response.json()
      setPengumumanList(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal memuat data pengumuman')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    })
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/pengumuman/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('gagal menghapus')
        }
        await Swal.fire({
          title: "Dihapus!",
          text: "Pengumuman telah berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })
        fetchPengumuman()
      } catch (error) {
        console.error('Error:', error)
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus pengumuman.",
          icon: "error",
      })
    }
  }
}

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }


  return (
    <>
      <div className='flex justify-between items-center px-4 py-2 mt-4'>
        <div className='text-2xl font-bold text-center'>Pengumuman</div>
        <div className='flex justify-end'>
          <Link 
            href={'/admin/pengumuman/tambah'} 
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors'
          >
            Buat Pengumuman
          </Link>
        </div>
      </div>
      
      <div className='px-2 py-4 m-4 max-width bg-white rounded-md shadow'>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : pengumumanList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada pengumuman
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className='w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-2 text-left'>No</th>
                  <th className='px-4 py-2 text-left'>Judul</th>
                  <th className='px-4 py-2 text-left'>Tanggal</th>
                  <th className='px-4 py-2 text-center'>Aksi</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {pengumumanList.map((item, index) => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-3'>{index + 1}</td>
                    <td className='px-4 py-3'>{item.judul}</td>
                    <td className='px-4 py-3'>{formatDate(item.createAt)}</td>
                    <td className='px-4 py-3 flex justify-center gap-2'>
                      <Link 
                        href={`/admin/pengumuman/${item.id}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors'
                        title='Detail'
                      >
                        <FaEye />
                      </Link>
                      <Link 
                        href={`/admin/pengumuman/edit/${item.id}`}
                        className='bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition-colors'
                        title='Edit'
                      >
                        <FaPenFancy />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors'
                        title='Hapus'
                        disabled={isLoading}
                      >
                        <FaTrashAlt />
                      </button>   
                    </td>
                  </tr>
                ))}
              </tbody> 
            </table>
          </div>
        )}
      </div>
    </>
  )
}