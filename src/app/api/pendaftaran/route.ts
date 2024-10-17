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
