'use client'
import { useState } from 'react';
import { jurusanList } from '@/libs/jurusanList'


export default function PendaftaranForm() {
  const [jurusanUtama, setJurusanUtama] = useState('');
  const [jurusanCadangan, setJurusanCadangan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='w-full my-10 mt-20'>
    <form className="bg-gray-100 shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-32">
      <h1 className='text-center uppercase text-2xl font-bold font-serif'>biodata diri</h1>
      <div className="relative z-0 w-full mb-5 group">
          <input type="number" name="nisn" id="nisn" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="nisn" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NISN</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="nama" id="nama" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="nama" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama Lengkap</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          <option value="" disabled selected>Pilih jenis kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 mt-7 group">
            <input type="text" name="tempat_lahir" id="tempat_lahir" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="tempat_lahir" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tempat Lahir</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
          <input 
            type="date" 
            id="birthdate" 
            name="birthdate" 
            className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
            <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No HP (aktif)</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">gmail (aktif)</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 mt-2"> 
        <div className="relative z-0 w-full mb-5 group">
          <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="" disabled selected>Agama</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Katolik">Protestan</option>
            <option value="Katolik">hindu</option>
            <option value="Katolik">Budha</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="number" name="tbadan" id="tbadan" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="tbadan" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tinggi badan (cm)</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 mt-2">
        <div className="relative z-0 w-full mb-5 group">
          <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="" disabled selected>Kondisi Mata</option>
            <option value="Islam">Buta Warna</option>
            <option value="Katolik">Tidak Buta Warna</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="text"  name="rpenyakit" id="rpenyakit" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="rpenyakit" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Riwayat Penyakit</label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="alamat_domisili" id="alamat_domisili" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="alamat_domisili" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat Domisili</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="nama" id="nama" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="nama" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat KK</label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select 
            id="jurusan_utama" 
            name="jurusan_utama" 
            value={jurusanUtama}
            onChange={(e) => setJurusanUtama(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required
          >
            <option value="" disabled>Pilih Jurusan Utama</option>
            {jurusanList.map((jurusan) => (
              <option key={jurusan} value={jurusan}>{jurusan}</option>
            ))}
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select 
            id="jurusan_cadangan" 
            name="jurusan_cadangan" 
            value={jurusanCadangan}
            onChange={(e) => setJurusanCadangan(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required
          >
            <option value="" disabled>Pilih Jurusan Cadangan</option>
            {jurusanList
              .filter(jurusan => jurusan !== jurusanUtama)
              .map((jurusan) => (
                <option key={jurusan} value={jurusan}>{jurusan}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="mb-6 mt-2">
        <h3 className="text-xl text-center font-semibold mb-4 text-gray-700">Dokumen</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="rapor" className="block mb-2 text-sm font-medium text-gray-900">
              Nilai Rapor Semester 2 & 4 (PDF)
            </label>
            <input
              type="file"
              id="rapor"
              accept=".pdf"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900">
              Pas Foto (max 2MB)
            </label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
       <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={isSubmitting}
        >
         {isSubmitting ? 'Mengirim...' : 'Submit Pendaftaran'}
        </button>
      </div>
    </form>

  </div>
  )
}
