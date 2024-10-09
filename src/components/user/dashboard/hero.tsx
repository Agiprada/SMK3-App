import Image from "next/image"

export default function Hero() {
  return (
    <div className='w-full m-auto bg-white px-5'>
        <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0">
            <div className='flex flex-col bg-gray-200 justify-start gap-4 px-6 '>
                <p className='text-4xl font-bold mt-4'>SMK Negeri 3 Palu</p>
                <p className="text-xl">Pelopor SMK Pusat Keunggulan Bidang Teknologi dan Informatika di Sulawesi Tengah</p>
                <button className="p-3 w-1/2 text-center text-white items-center rounded-3xl bg-red-500">Gabung Sekarang</button>
            </div>
            <div className='flex justify-center items-center bg-gray-200'>
                <Image src="/images/banner-1.png" alt="gambar1" width={800} height={200}></Image>
            </div>
        </div>
    </div>
  )
}
