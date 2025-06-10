'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

interface Pengumuman {
  id: number
  judul: string
  isi: string
  dokument: string | null
  createAt: string
  updatedAt: string
}

export default function PengumumanUser() {
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
      

  return (
    <div className='w-full my-10 mt-10'>
      <div className='m-4 bg-slate-100 p-4 rounded-md shadow-md'>
        <div className='text-center font-semibold text-xl'>Papan Pengumuman</div>
        <hr className='' />

        <div className='flex flex-col gap-4'>
          {pengumumanList.map((item) => (
            <div key={item.id} className='bg-white p-4 rounded-md shadow-md'>
              <div className='font-semibold'>{item.judul}</div>
              <div className='text-sm text-gray-500'>{formatDate(item.createAt)}</div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

