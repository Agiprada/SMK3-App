import React from 'react';
import prisma from '@/libs/prisma';
import ChartJurusan from '@/components/admin/chart-jurusan';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DiagramChart from './diagramChart';

export default function AdminDashboard() {
  
  return (
    <div className='m-4'>
      <h1 className='text-center text-2xl font-bold'>Dashboard Page</h1>
      <hr />\
      <DiagramChart />
    </div>
  );
}