-- CreateTable
CREATE TABLE "New_Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "New_Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "New_Pairs" (
    "id" TEXT NOT NULL,
    "name" CHAR(1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "New_Pairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Pair_Belonging" (
    "userId" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Pair_Belonging_pkey" PRIMARY KEY ("userId","pairId")
);

-- AddForeignKey
ALTER TABLE "User_Pair_Belonging" ADD CONSTRAINT "User_Pair_Belonging_userId_fkey" FOREIGN KEY ("userId") REFERENCES "New_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Pair_Belonging" ADD CONSTRAINT "User_Pair_Belonging_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "New_Pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
