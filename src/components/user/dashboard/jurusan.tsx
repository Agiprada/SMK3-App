import React from 'react'

export default function Jurusan() {
  return (
    <div className='w-screen bg-red-500 mt-5'>
        <div className='grid grid-cols-2 pt-8 pb-8 '>
            <div className='px-5'>
                <h1 className='text-white text-4xl font-bold mb-5'>Program Keahlian</h1>
                <p className='text-white'>SMK Negeri 3 Palu memiliki 4 Bidang Keahlian dengan 10  Program Studi serta 4 Konsentrasi Keahlian yang didukung dengan fasilitas dan guru guru yang kompeten</p>
            </div>
            <div className=''>      
                <ul className="space-y-4 text-white list-disc list-inside">
                    <li>
                        Teknologi Konstruksi dan Properti
                        <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                            <li>Desain Pemodelan dan Informasi Bangunan</li>
                            <li>Bisnis Konstruksi dan Properti</li>
                        </ol>
                    </li>
                    <li>
                        Energi dan Pertambangan
                        <ul className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                            <li>Teknik Geospasial</li>
                            <li>Teknik Ketenagalistrikan</li>
                        </ul>
                    </li>
                    <li>
                        Teknologi Manufaktur dan Rekayasa
                        <ul className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                            <li>Teknik Mesin</li>
                            <li>Teknik Pengelasan dan Fabrikasi Logam</li>
                            <li>Teknik Otomotif
                                <ol className="ps-5 mt-2 space-y-1 list-[lower-alpha] list-inside">
                                    <li>Teknik Kendaraan Ringan Otomotif</li>
                                    <li>Teknik dan Bisnis Sepeda Motor</li>
                                </ol>
                            </li>
                            <li>Teknik Elektronika
                                <ol className="ps-5 mt-2 space-y-1 list-[lower-alpha] list-inside">
                                    <li>Teknik Audio Video</li>
                                    <li>Teknik Elektronika Industri</li>
                                </ol>
                            </li>
                            <li>Teknologi Informasi
                                <ol className="ps-5 mt-2 space-y-1 list-[lower-alpha] list-inside">
                                    <li>Teknik Jaringan Komputer dan Telekomunikasi</li>
                                    <li>Pengembangan Perangkat Lunak dan Gim</li>
                                </ol>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
