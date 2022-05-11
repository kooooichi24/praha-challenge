-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pairs" (
    "id" TEXT NOT NULL,
    "name" CHAR(1) NOT NULL,

    CONSTRAINT "Pairs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
