import React from 'react'
import Image from 'next/image'
import { DUMMY_PRODUCT } from '@/libs/dummy-berita'

export default function Berita() {
  return (
    <div>
        {DUMMY_PRODUCT.map((item) => (
        <div className='bg-gray-100 py-2 px-2 rounded-md mb-4' key={item.id}>
            <div className='flex gap-4'>
                <Image src='/images/banner-1.png' alt='' width={150} height={50}></Image>
                <div>
                    <div className='py-2 px-2'>
                        <p className='text-md font-bold'>{item.title}</p>
                        <p className='text-xs mt-4'>{item.date}</p>
                    </div>
                    <a href="" className='px-2 py-2 border-1 underline'>baca selengkapnya...</a>
                </div>
            </div>
        </div>
        ))}   
    </div>
  )
}
