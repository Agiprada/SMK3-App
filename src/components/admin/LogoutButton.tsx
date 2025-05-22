"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { VscSignOut } from "react-icons/vsc";
import Swal from 'sweetalert2'

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure want to logout?",
      text: "You will need to login again to access this page",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel"
    });

     // Jika user mengkonfirmasi logout
     if (result.isConfirmed) {
      try {
        await signOut({ redirect: false });
        
        // Tampilkan notifikasi sukses
        await Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        
        // Redirect setelah notifikasi
        router.push("/auth/admin/login");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to logout. Please try again.",
          icon: "error"
        });
      }
    }
  };


  return (
    <button
      onClick={handleLogout}
      className="flex items-center hover:bg-gray-500 rounded-md p-2"
    >
        <VscSignOut size={20} />
      <p className="ml-2">Logout</p>
    </button>
  );
}