import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "./auth/[...nextauth]/route";

export async function GET(request: Request) {
    const session = await getServerSession(authOption)
    console.log('GET API', session)
    return NextResponse.json({ authenticated: !!session });
}
