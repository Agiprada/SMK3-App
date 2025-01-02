"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaTachometerAlt } from 'react-icons/fa';
import { BsClipboardData } from 'react-icons/bs';
import { FaRankingStar } from 'react-icons/fa6';

const Sidebar = () => {
  const [isDataPendaftarOpen, setIsDataPendaftarOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsDataPendaftarOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white  w-48 min-h-screen p-4 fixed">
      <div className="">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <ul>
        {/* Dashboard */}
        <li className="mb-4">
          <Link href="/admin/dashboard" className="hover:text-gray-300 pl-2">
          <div className='flex items-center'>
            <FaHome size={20}/>
            <span className="ml-2">Dashboard</span>
          </div>
          </Link>
        </li>
        <li className="flex mb-4 items-center">
          <BsClipboardData />
          <Link href="/admin/data-pendaftar" className="block hover:text-gray-300 pl-2">
            Data Pendaftar
          </Link>
        </li>

        <li className="flex mb-4 items-center">
          <FaRankingStar />
          <Link href="/admin/perangkingan" className="block hover:text-gray-300 pl-2">
            Ranking
          </Link>
        </li>

        {/* Data Pendaftar */}
        {/* <li className="mb-4">
          <button
            onClick={toggleSubmenu}
            className="w-full text-left flex items-center justify-between hover:text-gray-300"
          >
            <span>Data Pendaftar</span>
            <span>{isDataPendaftarOpen ? '▼' : '▶'}</span>
          </button>
          {isDataPendaftarOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link href="/admin/data-pendaftar" className="block hover:text-gray-300">
                  Semua Pendaftar
                </Link>
              </li>
              <li>
                <Link href="/admin/perangkingan" className="block hover:text-gray-300">
                  Perangkingan
                </Link>
              </li>
            </ul>
          )}
        </li> */}

        {/* Data Siswa */}
        <li className="flex mb-4 items-center">
          <FaTachometerAlt />
          <Link href="/admin/data-siswa" className="block hover:text-gray-300 pl-2">
            Data Siswa
          </Link>
        </li>

        {/* Data Tempat Magang */}
        <li className="flex mb-4 items-center">
          <FaTachometerAlt />
          <Link href="/admin/magang" className="block hover:text-gray-300 pl-2">
            Tempat Magang
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
