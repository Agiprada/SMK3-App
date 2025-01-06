'use client'
import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return <button className="bg-green-700 p-2" onClick={() => signIn()}>Login</button>
}
export const LogoutButton = () => {
    return <button className="bg-red-600 p-2 " onClick={() => signOut()}>Logout</button>
}