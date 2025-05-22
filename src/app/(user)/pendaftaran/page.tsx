import PendaftaranForm from '@/components/user/pendaftaranForm'
import React from 'react'
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/authOptions"; // Pastikan path sesuai
import { redirect } from "next/navigation";


export default async function Pendaftaran() {
  // const session = await getServerSession(authOptions);

  // if (!session || session.user.role !== "user") {
  //   redirect("/auth/users/login");
  // }
  return (
   <div>
        <PendaftaranForm/>
   </div>
  )
}
