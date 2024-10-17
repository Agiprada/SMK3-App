-- CreateTable
CREATE TABLE "Pendaftaran" (
    "id" SERIAL NOT NULL,
    "nisn" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "noHp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,
    "kondisiMata" TEXT NOT NULL,
    "riwayatPenyakit" TEXT,
    "alamatDomisili" TEXT NOT NULL,
    "alamatKK" TEXT NOT NULL,
    "jurusanUtama" TEXT NOT NULL,
    "jurusanCadangan" TEXT NOT NULL,
    "raporFile" TEXT NOT NULL,
    "fotoFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nilaitotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_nisn_key" ON "Pendaftaran"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_email_key" ON "Pendaftaran"("email");
