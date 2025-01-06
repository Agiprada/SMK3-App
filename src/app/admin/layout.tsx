import Sidebar from "@/components/admin/sidebar";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}:{
    children : React.ReactNode;
}) {

    const session = await getServerSession(authOption)
    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-4 ml-44">{children}</main>
        </div>
    )
}