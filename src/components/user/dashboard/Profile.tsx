import React from 'react'
import { BsPersonVideo3 } from 'react-icons/bs'
import { FaHandshake, FaSchool } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'

export default function Profile() {
  return (
    <div className='flex w-full py-10 px-5'>
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0 text-center">
        <h1 className='text-2xl font-bold mb-8'>Alasan kenapa kalian harus bergabung dengan SMK Negeri 3 Palu</h1>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {[
            { icon: <FaComputer size={90} color='aqua' />, title: 'Fasilitas Lengkap', desc: 'Fasilitas setara dengan standart Industri' },
            { icon: <FaSchool size={90} color='orange' />, title: 'Lingkungan Nyaman', desc: 'Berada di lingkungan yang asri, aman, dan kondusif.' },
            { icon: <BsPersonVideo3 size={90} color='red' />, title: 'Pengajar Kompeten', desc: 'Guru yang up-to-date dengan perkembangan industri.' },
            { icon: <FaHandshake size={90} color='lightgreen' />, title: 'Kerjasama Luas', desc: 'Memperbesar kesempatan bekerja sebelum lulus.' },
          ].map((item, index) => (
            <div key={index} className='flex flex-col items-center py-6 p-4 rounded-xl'>
              {item.icon}
              <h2 className='text-xl font-bold mt-4'>{item.title}</h2>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}