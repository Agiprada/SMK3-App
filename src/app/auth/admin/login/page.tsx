"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import  Swal  from "sweetalert2"
 
export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/admin/dashboard");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Sukses",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo-smkn3palu.png"
            width="150"
            alt="logo smk"
            height="10"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-sm rounded-md">
            <input
              id="username"
              className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="text"
              placeholder="Username or Email id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="password"
              className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="bg-red-500 p-1 rounded-sm mt-4 text-white text-sm mb-2">{error} :
             <br /> Username atau password salah</div>}
          <button
            className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-gray-600">
          <a href="#">Forgot password?</a>
        </div>
        <div className="mt-5 flex text-center text-sm text-gray-400">
          <p>
            This site is protected by reCAPTCHA and the Google <br />
            <a className="underline" href="">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a className="underline" href="">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}