// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) { // Sesuaikan jumlah data yang ingin dibuat
    await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        nisn: faker.string.numeric(10), // Menghasilkan angka dengan panjang 10 karakter
        // tambahkan fields lain sesuai skema
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
