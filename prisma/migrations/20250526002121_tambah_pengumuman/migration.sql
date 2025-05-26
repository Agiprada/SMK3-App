-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "dokument" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id")
);
