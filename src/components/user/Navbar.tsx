import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed w-full border-b z-[1000]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/user/dashboard" className="flex items-center py-4 px-2">
                <span className="font-semibold text-lg">PSB Online</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard" className="py-4 px-2 hover:text-blue-200 transition duration-300">Dashboard</Link>
              <Link href="/berita" className="py-4 px-2 hover:text-blue-200 transition duration-300">Berita</Link>
              <Link href="/pendaftaran" className="py-4 px-2 hover:text-blue-200 transition duration-300">Pendaftaran</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="py-2 px-2 font-medium text-white rounded hover:bg-blue-500 transition duration-300">Log Out</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;