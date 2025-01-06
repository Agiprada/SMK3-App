import React from 'react';
import prisma from '@/libs/prisma';
import ChartJurusan from '@/components/admin/chart-jurusan';

async function getPendaftar() {
  const pendaftar = await prisma.pendaftaran.findMany({
    select: {
      jurusanUtama: true,
      jurusanCadangan: true,
    },
  });
  return JSON.parse(JSON.stringify(pendaftar));
}

export default async function DiagramChart() {
  const dataPendaftar = await getPendaftar();
  const countJurusan = (jurusanList: string[], data: any[], key: string) => {
    return jurusanList.map((jurusan) => {
      return data.filter((pendaftar) => pendaftar[key] === jurusan).length;
    });
  };

  const jurusanList = [
    "Desain Pemodelan dan Informasi Bangunan",
    "Bisnis Konstruksi dan Properti",
    "Teknik Geospasial",
    "Teknik Mesin",
    "Teknik Pengelasan dan Fabrikasi Logam",
    "Teknik Kendaraan Ringan Otomotif",
    "Teknik dan Bisnis Sepeda Motor",
    "Teknik Audio Video",
    "Teknik Elektronika Industri",
    "Teknik Jaringan Komputer dan Telekomunikasi",
    "Pengembangan Perangkat Lunak dan Gim",
  ];

  const jurusanListShort = [
    "DPIB", // Desain Pemodelan dan Informasi Bangunan
    "BKP",  // Bisnis Konstruksi dan Properti
    "TG",   // Teknik Geospasial
    "TM",   // Teknik Mesin
    "TPFL", // Teknik Pengelasan dan Fabrikasi Logam
    "TKRO", // Teknik Kendaraan Ringan Otomotif
    "TBSM", // Teknik dan Bisnis Sepeda Motor
    "TAV",  // Teknik Audio Video
    "TEI",  // Teknik Elektronika Industri
    "TJKT", // Teknik Jaringan Komputer dan Telekomunikasi
    "PPLG", // Pengembangan Perangkat Lunak dan Gim
  ];

  const dataJurusanUtama = {
    labels: jurusanListShort,
    datasets: [
      {
        label: 'Jurusan Utama',
        data: countJurusan(jurusanList, dataPendaftar, 'jurusanUtama'),
        backgroundColor: 'rgba(83, 102, 255, 0.6)',
      },
    ],
  };

  const dataJurusanCadangan = {
    labels: jurusanListShort,
    datasets: [
      {
        label: 'Jurusan Cadangan',
        data: countJurusan(jurusanList, dataPendaftar, 'jurusanCadangan'),
        backgroundColor: 'rgba(220, 53, 69, 0.6)',
      },
    ],
  };

  return (
    <div className='m-4'>
      <div className='items-center'>
        <div style={{ marginBottom: '20px' }}>
          <ChartJurusan data={dataJurusanUtama} title="Diagram Jumlah Pendaftar Jurusan Utama" />
        </div>
        <div>
          <ChartJurusan data={dataJurusanCadangan} title="Diagram Jumlah Pendaftar Jurusan Cadangan" />
        </div>
      </div>
      
    </div>
  );
}