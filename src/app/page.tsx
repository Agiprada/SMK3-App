import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOption } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOption)

  return (
    <div className="">
      <h1>Hello World</h1>
      <LoginButton />
      <LogoutButton />

      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
