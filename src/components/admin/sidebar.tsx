"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaTachometerAlt } from 'react-icons/fa';
import { BsClipboardData } from 'react-icons/bs';
import { FaRankingStar } from 'react-icons/fa6';
import { VscSignOut } from "react-icons/vsc";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutButton from './LogoutButton';
import { TfiAnnouncement } from 'react-icons/tfi';

const Sidebar = () => {
  const [isDataPendaftarOpen, setIsDataPendaftarOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsDataPendaftarOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white  w-48 min-h-screen p-4 fixed">
      <div className="">
      <Image src="/images/logo-smkn3palu.png" width="150" alt="logo smk" height="10"></Image>
      </div>
      <ul>
        {/* Dashboard */}
        <li className="pt-4">
          <Link href="/admin/dashboard" className="block hover:bg-gray-500 rounded-md p-2 ">
          <div className='flex items-center'>
            <FaHome size={20}/>
            <span className="ml-2">Dashboard</span>
          </div>
          </Link>
        </li>
        <li className="">
          <Link href="/admin/data-pendaftar" className="block hover:bg-gray-500 rounded-md p-2 ">
            <div className='flex items-center'>
              <BsClipboardData size={20} />
              <span className='ml-2'>Data Pendaftar</span>
            </div>
          </Link>
        </li>

        <li className="">
          <Link href="/admin/perangkingan" className="block hover:bg-gray-500 rounded-md p-2">
            <div className='flex items-center'>
              <FaRankingStar size={20} />
              <span className='ml-2'>Ranking</span>
            </div>
          </Link>
        </li>

        <li className="mb-4">
          <Link href="/admin/pengumuman" className="block hover:bg-gray-500 rounded-md p-2">
            <div className='flex items-center'>
              <TfiAnnouncement size={20} />
              <span className='ml-2'>Pengumuman</span>
            </div>
          </Link>
        </li>

        <li className="mb-4">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
