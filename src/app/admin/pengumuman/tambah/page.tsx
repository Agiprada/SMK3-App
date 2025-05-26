'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
 
export default function TambahPengumuman() {
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validasi ukuran file (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB')
        e.target.value = ''
        return
      }
      
      // Validasi tipe file
      if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
        setFile(selectedFile)
      } else {
        alert('Hanya file PDF atau gambar yang diperbolehkan.')
        e.target.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('judul', judul)
      formData.append('isi', isi)
      if (file) {
        formData.append('dokumen', file)
      }

      const response = await fetch('/api/pengumuman', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      toast.success('Pengumuman berhasil ditambahkan!')
      router.push('/admin/pengumuman') // Redirect ke halaman pengumuman
      router.refresh() // Refresh data
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil Menambahkan",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal menambahkan pengumuman')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Tambah Pengumuman</h2>
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
            disabled={isLoading}
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
            disabled={isLoading}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Dokumen (PDF / Gambar, maks 5MB)</label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isLoading}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Pengumuman'}
          </button>
        </div>
      </form>
    </div>
  )
}