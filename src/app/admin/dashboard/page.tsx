
import React from 'react';
import prisma from '@/libs/prisma';
import ChartJurusan from '@/components/admin/chart-jurusan';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import DiagramChart from './diagramChart';
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminDashboard() {
  // const session = await getServerSession(authOption)
  // if (!session) {
  //   redirect('/login')
  // }

  
  return (
    <div className='m-4'>
      <h1 className='text-center text-2xl font-bold'>Dashboard Page</h1>
      <hr />
      <DiagramChart />
    </div>
  );
}