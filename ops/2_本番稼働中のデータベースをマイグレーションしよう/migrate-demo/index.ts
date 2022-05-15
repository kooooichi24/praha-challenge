import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ENABLE_WRITE_NEW_SCHEMA = true;
const ENABLE_WRITE_BOTH_SCHEMA = false;
const ENABLE_READ_NEW_SCHEMA = false;

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

async function create() {
  // create
  if (ENABLE_WRITE_BOTH_SCHEMA) {
    // Pairs
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

    const task1 = prisma.new_Pairs.create({
      data: {
        id: "3",
        name: "c",
      },
    });
    const task2 = prisma.new_Users.create({
      data: {
        id: "5",
        name: "user5",
      },
    });
    const task3 = prisma.user_Pair_Belonging.create({
      data: {
        userId: "5",
        pairId: "3",
      },
    });
    await prisma.$transaction([task1, task2, task3]);
  } else if (ENABLE_WRITE_NEW_SCHEMA) {
    const task1 = prisma.new_Pairs.create({
      data: {
        id: "3",
        name: "c",
      },
    });
    const task2 = prisma.new_Users.create({
      data: {
        id: "5",
        name: "user5",
      },
    });
    const task3 = prisma.user_Pair_Belonging.create({
      data: {
        userId: "5",
        pairId: "3",
      },
    });
    await prisma.$transaction([task1, task2, task3]);
  } else {
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
  }
}

async function read() {
  if (ENABLE_READ_NEW_SCHEMA) {
    console.log(
      "New_Pairs Table Read All Datas",
      await prisma.new_Pairs.findMany()
    );
    console.log(
      "New_Users Table Read All Datas",
      await prisma.new_Users.findMany()
    );
    console.log(
      "user_Pair_Belonging Table Read All Datas",
      await prisma.user_Pair_Belonging.findMany()
    );
  } else {
    console.log("Pairs Table Read All Datas", await prisma.pairs.findMany());
    console.log("Users Table Read All Datas", await prisma.users.findMany());
  }
}

async function main() {
  initData();
  
  create();
  read();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
