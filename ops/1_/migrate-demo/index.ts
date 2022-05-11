import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function initData() {
  await prisma.pairs.createMany({
    data: [
      {
        id: "1",
        name: "a",
      },
      {
        id: "2",
        name: "b",
      },
    ],
  });

  await prisma.users.createMany({
    data: [
      {
        id: "1",
        name: "user1",
        pairId: "1",
      },
      {
        id: "2",
        name: "user2",
        pairId: "1",
      },
      {
        id: "3",
        name: "user3",
        pairId: "2",
      },
      {
        id: "4",
        name: "user4",
        pairId: "2",
      },
    ],
  });
}

async function main() {
  initData();

  // create
  await prisma.pairs.create({
    data: {
      id: "3",
      name: "c",
    },
  });
  await prisma.users.create({
    data: {
      id: "5",
      name: "user5",
      pairId: "3",
    },
  });

  // read
  console.log("Pairs Table Read All Datas", await prisma.pairs.findMany());
  console.log("Users Table Read All Datas", await prisma.users.findMany());
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
