"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { VscSignOut } from "react-icons/vsc";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Logout tanpa redirect otomatis
    router.push("/auth/admin/login"); // Redirect ke halaman login
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