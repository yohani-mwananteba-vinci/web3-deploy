const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const expenses = await prisma.expense.createManyAndReturn({
    // We use the date by default, no need to change it
    data: [
      { id: 1, description: "Example expense #1 from Alice", payer: "Alice", amount: 25.5 },
      { id: 2, description: "Example expense #2 from Bob", payer: "Bob", amount: 35 },
      { id: 3, description: "Example expense #3 from Alice", payer: "Alice", amount: 2 }
    ],
    skipDuplicates: true, // Skip expenses with the same primary key
  });
  console.log(expenses);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });