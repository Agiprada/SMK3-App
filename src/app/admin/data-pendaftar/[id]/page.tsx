'use client'
import prisma from '@/libs/prisma'
import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react';
import ApprovalButton from '@/components/admin/AprovalButton';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
async function getPendaftarDetail(id: string) {
  const response = await fetch(`/api/pendaftaran?id=${id}`);
  if (!response.ok) {
    throw new Error('Gagal mengambil data pendaftar');
  }
  return response.json();
}


export default function DetailPendaftarPage({ params }: { params: { id: string } }) {
  // const {data : pendaftar} = await getPendaftarDetail(params.id); // Ganti dengan NISN yang sesuai
  const [pendaftar, setPendaftar] = useState<any>(null); // State untuk menyimpan data pendaftar
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPendaftarDetail(params.id);
        setPendaftar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleApprove = async () => {
    const response = await fetch(`${baseUrl}/api/pendaftaran`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: params.id, status: 'Verified' }),
    });

    const data = await response.json();
    if (response.ok) {
      setPendaftar((prev: any) => ({ ...prev, status: 'Verified' })); // Update status locally
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleCancel = async () => {
    const response = await fetch(`${baseUrl}/api/pendaftaran`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: params.id, status: 'Menunggu' }), // Kirim status 'Menunggu'
    });

    const data = await response.json();
    if (response.ok) {
      setPendaftar((prev: any) => ({ ...prev, status: 'Menunggu' })); // Update status locally
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-6">Detail Pendaftar</h1>
        <h1 className="text-xl font-bold mb-6">Status : {pendaftar.status}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">NISN</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.nisn || 'tidak ada data'}</td>
              <td className="px-4 py-2 text-center text-gray-800">Foto</td>
            </tr>
      
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Nama</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.namaLengkap || 'tidak ada data'}</td>
              <td rowSpan={6}  className="p-1 text-gray-800">
                <div className='flex justify-center'>
                  <img src={`/uploads/${pendaftar.fotoFile}`} alt="Foto Pendaftar" width={250} className="max-w-xs rounded shadow-md" />
                </div>
              </td>
            </tr>
          
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Jenis Kelamin</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.jenisKelamin}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Tempat/tgl lahir</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.tempatLahir} - {pendaftar.tanggalLahir ? new Date(pendaftar.tanggalLahir).toLocaleDateString() : 'Tidak ada data'}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Agama</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.agama}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Tinggi Badan</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.tinggiBadan}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Riwayat Penyakit</th>
              <td className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.riwayatPenyakit}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Alamat Domisili</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.alamatDomisili}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Alamat KK</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.alamatKK}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700">Kondisi Mata</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.kondisiMata}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='overflow-x-auto py-4'>
        <table className='min-w-full border-collapse border border-gray-300'>
          <tbody>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700'>Jurusan Utama</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.jurusanUtama}</td>
            </tr>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700'>Jurusan Cadangan</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.jurusanCadangan}</td>
            </tr>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700'>Nilai Raport</th>
              <td colSpan={2} className="px-4 py-2 bg-gray-100 text-gray-800">{pendaftar.nilaitotal}</td>
            </tr>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left bg-gray-100 border-r font-medium text-gray-700'>Raport</th>
              <td colSpan={2} className="px-4 my-1 bg-gray-100 text-gray-800">
                <a href={`/uploads/${pendaftar.raporFile}`} target="_blank" rel="noopener noreferrer" className="text-white px-2 py-2 rounded-md bg-blue-500 hover:underline">
                    Show Raport
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ApprovalButton status={pendaftar.status} onApprove={handleApprove} onCancel={handleCancel} />
    </div>
  )
}     