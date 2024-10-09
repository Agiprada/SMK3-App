import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <ul>
        <li className="mb-4">
          <Link href="/admin/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/data-pendaftar" className="block hover:text-gray-300">
            Data Pendaftar
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/data-siswa" className="block hover:text-gray-300">
            Data Siswa
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/magang" className="block hover:text-gray-300">
            Data Tempat Magang
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;