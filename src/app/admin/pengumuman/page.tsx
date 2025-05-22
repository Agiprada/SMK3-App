'use client'

import React from 'react'
import { FaEye, FaTrashAlt } from 'react-icons/fa'
import { FaPenFancy } from 'react-icons/fa6'

export default function Pengumuman() {
  return (
    <>
    <div className='flex justify-between items-center px-4 py-2 mt-4'>
        <div className='text-2xl font-bold text-center'>Pengumuman</div>
        <div className='flex justify-end'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Buat Pengumuman</button>
        </div>
    </div>
    <div className='px-2 py-4 m-4 max-width bg-slate-300 rounded-md'>
        <table className='w-full '>
            <thead className=' '>
                <tr className='px-2 py-2 rounded-md'>
                    <th className='text-center'>No</th>
                    <th className='text-center' colSpan={2}>Judul</th>
                    <th className='text-center'>tanggal</th>
                    <th className='text-center'>Aksi</th>
                </tr>
            </thead>
            <tbody className=''>
                <tr>
                    <td className='text-center'>1</td>
                    <td className='text-center' colSpan={2}>Pengumuman 1</td>
                    <td className='text-center'>12/12/2024</td>
                    <td className='flex justify-center gap-2'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'><FaEye /></button>
                        <button className='bg-yellow-500 text-white px-4 py-2 rounded-md'><FaPenFancy /></button>
                        <button className='bg-red-500 text-white px-4 py-2 rounded-md'><FaTrashAlt /></button>   
                    </td>
                </tr>
                
            </tbody> 
        </table>
    </div>
    </>
  )
}