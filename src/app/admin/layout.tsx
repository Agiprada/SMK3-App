import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}:{
    children : React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-4 ml-52">{children}</main>
        </div>
    )
}