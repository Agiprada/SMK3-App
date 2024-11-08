'use client'
import { useState } from 'react';
import { jurusanList } from '@/libs/jurusanList'
import { useRouter } from 'next/navigation';


export default function PendaftaranForm() {
  const [jurusanUtama, setJurusanUtama] = useState('');
  const [jurusanCadangan, setJurusanCadangan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    nisn: '',
    namaLengkap: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    noHp: '',
    email: '',
    agama: '',
    tinggiBadan: '',
    kondisiMata: '',
    riwayatPenyakit: '',
    alamatDomisili: '',
    alamatKK: '',
    jurusanUtama: '',
    jurusanCadangan: '',
    nilaitotal: '',
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [raporFile, setRaporFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.name === 'fotoFile') {
        setFotoFile(e.target.files[0]);
      } else if (e.target.name === 'raporFile') {
        setRaporFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    const submitData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    if (fotoFile) submitData.append('fotoFile', fotoFile);
    if (raporFile) submitData.append('raporFile', raporFile);

    try {
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        alert('Pendaftaran berhasil!');
        router.push('/dashboard'); // Redirect ke halaman utama atau halaman sukses
      } else {
        const errorData = await response.json();
        alert(`Pendaftaran gagal: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat mengirim formulir.');
    }
  };

  return (
    <div className='w-full my-10 mt-20'>
    <form onSubmit={handleSubmit} className="bg-gray-100 shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-32">
      <h1 className='text-center uppercase text-2xl font-bold font-serif'>biodata diri</h1>
      <div className="relative z-0 w-full mb-5 group">
      <input
          type="number"
          id="nisn"
          name="nisn"
          value={formData.nisn}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
          <label htmlFor="nisn" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NISN</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={formData.namaLengkap} onChange={handleChange} name="namaLengkap" id="namaLengkap" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="namaLengkap" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama Lengkap</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          id="jenisKelamin"
          name="jenisKelamin"
          value={formData.jenisKelamin} // Menggunakan value dari state
          onChange={handleChange} // Menggunakan handleChange untuk mengupdate state
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
        >
          <option value="" >Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 mt-7 group">
            <input type="text" value={formData.tempatLahir} onChange={handleChange} name="tempatLahir" id="tempatLahir" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="tempatLahir" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tempat Lahir</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
          <input 
            type="date"
            id="tanggalLahir"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
            <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={formData.noHp} onChange={handleChange} name="noHp" id="noHp" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="noHp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No HP (aktif)</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">gmail (aktif)</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 mt-2"> 
        <div className="relative z-0 w-full mb-5 group">
          <select id="agama" value={formData.agama} onChange={handleChange} name="agama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option defaultValue="">Agama</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Katolik">Protestan</option>
            <option value="Katolik">hindu</option>
            <option value="Katolik">Budha</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="number" name="tinggiBadan" id="tinggiBadan" value={formData.tinggiBadan} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="tinggiBadan" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tinggi badan (cm)</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 mt-2">
        <div className="relative z-0 w-full mb-5 group">
          <select id="kondisiMata" value={formData.kondisiMata} onChange={handleChange} name="kondisiMata" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="" >Kondisi Mata</option>
            <option value="Buta Warna">Buta Warna</option>
            <option value="Tidak Buta Warna">Tidak Buta Warna</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={formData.riwayatPenyakit} onChange={handleChange} name="riwayatPenyakit" id="riwayatPenyakit" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="riwayatPenyakit" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Riwayat Penyakit</label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={formData.alamatDomisili} onChange={handleChange} name="alamatDomisili" id="alamatDomisili" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="alamatDomisili" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat Domisili</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={formData.alamatKK} onChange={handleChange} name="alamatKK" id="alamatKK" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="alamatKK" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat KK</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={formData.nilaitotal} onChange={handleChange} name="nilaitotal" id="nilaitotal" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="nilaitotal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nilai Semester 4</label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select 
            id="jurusanUtama" 
            name="jurusanUtama" 
            value={formData.jurusanUtama}
            onChange={handleChange}
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
            id="jurusanCadangan" 
            name="jurusanCadangan" 
            value={formData.jurusanCadangan}
            onChange={handleChange}
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
              id="raporFile"
              name="raporFile"
              onChange={handleFileChange}
              accept=".pdf"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900">
              Pas Foto (max 2MB)
            </label>
            <input
              type="file"
              id="fotoFile"
              name="fotoFile"
              onChange={handleFileChange}
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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
