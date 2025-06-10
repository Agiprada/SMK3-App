'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

import Link from 'next/link'
import path from 'path'



interface Pengumuman {
  id: number
  judul: string
  isi: string
  dokument: string | null
  createdAt: string
  updatedAt: string
}

export default function EditPengumuman({ params }: { params: { id: string } }) {
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [existingFile, setExistingFile] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const response = await fetch(`/api/pengumuman/${params.id}`)
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengumuman')
        }
        const data: Pengumuman = await response.json()
        setJudul(data.judul)
        setIsi(data.isi)
        setExistingFile(data.dokument)    
      } catch (error) {
        console.error('Error:', error)
        Swal.fire({
          title: 'Error!',
          text: 'Gagal memuat data pengumuman',
          icon: 'error'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPengumuman()
  }, [params.id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validasi ukuran file (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Ukuran file terlalu besar',
          text: 'Maksimal ukuran file adalah 5MB',
          icon: 'warning'
        })
        e.target.value = ''
        return
      }
      
      // Validasi tipe file
      if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
        setFile(selectedFile)
        setExistingFile(null) // Reset existing file jika upload file baru
      } else {
        Swal.fire({
          title: 'Format file tidak didukung',
          text: 'Hanya file PDF atau gambar yang diperbolehkan',
          icon: 'warning'
        })
        e.target.value = ''
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setExistingFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('judul', judul)
      formData.append('isi', isi)
      
      // Jika ada file baru, tambahkan ke formData
      if (file) {
        formData.append('dokument', file)
      } else if (existingFile === null) {
        // Jika tidak ada file baru dan existingFile di-set null (artinya ingin menghapus file lama)
        formData.append('removeFile', 'true')
      }

      const response = await fetch(`/api/pengumuman/${params.id}`, {
        method: 'PUT',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Pengumuman berhasil diperbarui',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })

      router.push('/admin/pengumuman')
    } catch (error) {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memperbarui pengumuman',
        icon: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Pengumuman</h2>
        <Link 
          href="/admin/pengumuman" 
          className="text-gray-500 hover:text-gray-700"
        >
          &larr; Kembali
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Judul*</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul pengumuman"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Isi*</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis isi pengumuman..."
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Dokument (PDF/Gambar, maks 5MB)
          </label>
          
        {existingFile && !file ? (
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-2">
            <div className="flex items-center">
              <a 
                href={`/uploads/pengumuman/${path.basename(existingFile)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lihat dokumen saat ini
              </a>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
              disabled={isSubmitting}
            >
              Hapus
            </button>
          </div>
        ) : null}

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-sm text-gray-500">
            Biarkan kosong jika tidak ingin mengubah dokument
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/pengumuman')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}