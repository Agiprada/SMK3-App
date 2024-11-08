import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Ekstrak data dari formData
    const nisn = formData.get('nisn') as string;
    const namaLengkap = formData.get('namaLengkap') as string;
    const jenisKelamin = formData.get('jenisKelamin') as string;
    const tempatLahir = formData.get('tempatLahir') as string;
    const tanggalLahir = formData.get('tanggalLahir') as string | null;
    const formattedTanggalLahir = tanggalLahir ? new Date(tanggalLahir) : undefined;
    const noHp = formData.get('noHp') as string;
    const email = formData.get('email') as string;
    const agama = formData.get('agama') as string;
    const tinggiBadan = parseInt(formData.get('tinggiBadan') as string) || null;
    const kondisiMata = formData.get('kondisiMata') as string;
    const riwayatPenyakit = formData.get('riwayatPenyakit') as string;
    const alamatDomisili = formData.get('alamatDomisili') as string;
    const alamatKK = formData.get('alamatKK') as string;
    const jurusanUtama = formData.get('jurusanUtama') as string;
    const jurusanCadangan = formData.get('jurusanCadangan') as string;
    const nilaitotal = parseFloat(formData.get('nilaitotal') as string) || null;

    // Cek apakah NISN sudah ada
    const existingPendaftaran = await prisma.pendaftaran.findUnique({
      where: { nisn },
    });

    if (existingPendaftaran) {
      return NextResponse.json({ message: 'NISN sudah digunakan.' }, { status: 400 });
    }

    // Handle file uploads
    const fotoFile = formData.get('fotoFile') as File;
    const raporFile = formData.get('raporFile') as File;

    let fotoFileName = '';
    let raporFileName = '';

    if (fotoFile) {
      const fotoBytes = await fotoFile.arrayBuffer();
      const fotoBuffer = Buffer.from(fotoBytes);
      fotoFileName = `${Date.now()}_${fotoFile.name}`;
      const fotoPath = path.join(process.cwd(), 'public', 'uploads', fotoFileName);
      await writeFile(fotoPath, fotoBuffer);
    }

    if (raporFile) {
      const raporBytes = await raporFile.arrayBuffer();
      const raporBuffer = Buffer.from(raporBytes);
      raporFileName = `${Date.now()}_${raporFile.name}`;
      const raporPath = path.join(process.cwd(), 'public', 'uploads', raporFileName);
      await writeFile(raporPath, raporBuffer);
    }

    // Simpan data ke database
    const pendaftaran = await prisma.pendaftaran.create({
      data: {
        nisn,
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: formattedTanggalLahir,
        noHp,
        email,
        agama,
        tinggiBadan,
        kondisiMata,
        riwayatPenyakit,
        alamatDomisili,
        alamatKK,
        jurusanUtama,
        jurusanCadangan,
        fotoFile: fotoFileName,
        raporFile: raporFileName,
        nilaitotal,
        status: 'Menunggu', // Status awal
      },
    });

    return NextResponse.json({ message: 'Pendaftaran berhasil', data: pendaftaran }, { status: 201 });
  } catch (error) {
    console.error('Error in pendaftaran:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mendaftar' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json(); // Ambil ID dan status dari body permintaan

    // Tentukan status yang akan diperbarui
    const updatedStatus = status === 'Menunggu' ? 'Menunggu' : 'Verified';

    const updatedPendaftaran = await prisma.pendaftaran.update({
      where: { id: Number(id) },
      data: { status: updatedStatus },
    });

    return NextResponse.json({ message: `Status berhasil diubah menjadi ${updatedStatus}`, data: updatedPendaftaran }, { status: 200 });
  } catch (error) {
    console.error('Error in updating status:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengubah status' }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Ambil NISN dari query parameter

    if (!id) {
      return NextResponse.json({ message: 'id tidak diberikan.' }, { status: 400 });
    }

    const pendaftaran = await prisma.pendaftaran.findUnique({
      where: { id : Number(id) },
      select: {
        nisn: true,
        namaLengkap: true,
        jenisKelamin: true,
        tempatLahir: true,
        tanggalLahir: true,
        noHp: true,
        email: true,
        agama: true,
        alamatDomisili: true,
        alamatKK: true,
        jurusanUtama: true,
        jurusanCadangan: true,
        nilaitotal: true,
        status: true,
        tinggiBadan: true,
        kondisiMata: true,
        riwayatPenyakit: true,
        raporFile: true,
        fotoFile: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!pendaftaran) {
      return NextResponse.json({ message: 'Pendaftaran tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ data: pendaftaran }, { status: 200 });
  } catch (error) {
    console.error('Error in fetching pendaftaran:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengambil data pendaftaran' }, { status: 500 });
  }
}