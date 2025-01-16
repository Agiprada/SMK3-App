const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Generate unique NISN
  const generateUniqueNISN = (count) => {
    const nisnSet = new Set();
    while (nisnSet.size < count) {
      const nisn = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
      nisnSet.add(nisn);
    }
    return Array.from(nisnSet);
  };

  const nisnList = generateUniqueNISN(1000); // Adjust the number of records as needed

  const fakeData = nisnList.map((nisn) => {
    const jurusanUtama = faker.helpers.arrayElement([
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
    "Pengembangan Perangkat Lunak dan Gim"]);
    let jurusanCadangan;

    // Ensure jurusan cadangan is different from jurusan utama
    do {
      jurusanCadangan = faker.helpers.arrayElement([
    "Desain Pemodelan dan Informasi Bangunan",
    "Bisnis Konstruksi dan Properti",
    "Teknik Geospasial",
    "Teknik Mesin",
    "Teknik Pengelasan dan Fabrikasi Logam",
    "Teknik Audio Video",
    "Teknik Elektronika Industri",
    "Pengembangan Perangkat Lunak dan Gim"]);
    } while (jurusanCadangan === jurusanUtama);

    return {
    nisn,
    namaLengkap: faker.person.fullName(),
    jenisKelamin: faker.helpers.arrayElement(['Laki-Laki', 'Perempuan']),
    tempatLahir: faker.location.city(),
    tanggalLahir: faker.date.birthdate({ min: 10, max: 18, mode: 'age' }),
    noHp: faker.phone.number('081#########'),
    email: faker.internet.email(),
    agama: faker.helpers.arrayElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha']),
    tinggiBadan: faker.number.int({ min: 140, max: 190 }),
    kondisiMata: faker.helpers.arrayElement(['Normal', 'Minus', 'Silinder']),
    riwayatPenyakit: faker.helpers.arrayElement([null, 'Asma', 'Diabetes', 'Hipertensi']),
    alamatDomisili: faker.location.streetAddress(),
    alamatKK: faker.location.streetAddress(),
    jurusanUtama,
    jurusanCadangan,
    raporFile: faker.system.filePath(),
    fotoFile: faker.image.avatarGitHub(), // Random GitHub user avatar
    nilaitotal: faker.number.float({ min: 60, max: 100, precision: 0.01 }), // 2 decimal places
    status: faker.helpers.arrayElement(['Verified']),
  }
});

  // Insert fake data into the database
  for (const data of fakeData) {
    await prisma.pendaftaran.createMany({
      data: fakeData,
    });
  }

  console.log('Fake data generated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
