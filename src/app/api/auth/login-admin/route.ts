import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Cek apakah admin ada di database
  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return NextResponse.json({ message: 'Admin tidak ditemukan' }, { status: 404 });
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Password salah' }, { status: 401 });
  }

  // Jika berhasil, kembalikan respons sukses
  return NextResponse.json({ message: 'Login berhasil', admin }, { status: 200 });
}