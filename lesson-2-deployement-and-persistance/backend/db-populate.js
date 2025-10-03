const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const expenses = await prisma.expense.findMany();
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

const createMany = await prisma.expense.createMany({
    data: [
        { id: "1", date: "2025-01-16", description: "Example expense #1 from Alice", payer: "Alice", amount: 25.5 },
        { id: "2", date: "2025-01-15", description: "Example expense #2 from Bob", payer: "Bob", amount: 35 },
        { id: "3", date: "2025-01-15", description: "Example expense #3 from Alice", payer: "Alice", amount: 2 }
    ],
      skipDuplicates: true, // Skip 'Bobo'
})