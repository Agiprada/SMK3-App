import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed w-full border-b z-[1000]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/user/dashboard" className="flex items-center py-2 px-2">
              <Image src="/images/logo-smkn3palu.png" width="70" alt="logo smk" height="10"></Image>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard" className="py-4 px-2 hover:text-blue-200 transition duration-300">Dashboard</Link>
              <Link href="/berita" className="py-4 px-2 hover:text-blue-200 transition duration-300">Berita</Link>
              <Link href="/pendaftaran" className="py-4 px-2 hover:text-blue-200 transition duration-300">Pendaftaran</Link>
              <Link href="/pengumuman" className="py-4 px-2 hover:text-blue-200 transition duration-300">Pengumuman</Link>
            </div>
          </div>
          {/* <div className="hidden md:flex items-center space-x-3">
            <Link href="auth/users/login" className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300">Login</Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;