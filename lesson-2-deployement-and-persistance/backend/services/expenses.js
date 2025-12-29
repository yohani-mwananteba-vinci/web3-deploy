const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function getAllExpenses() {
  const data = await prisma.expense.findMany();
  // console.log(data);
  return data;
}

async function addExpense(expense) {
  const newExpense = await prisma.expense.create({
    data: {
      date: expense.date,
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount
    }
    // Rem: You can still use the property name of a any js object
    // (properties name's are defined when you create the param expense)
  });
  return expense;
}

async function resetExpenses() {
  await prisma.expense.deleteMany({});
  const initialExpenses =
    [
      { "id": 1, "date": new Date("2025-01-16"), "description": "Example expense #1 from Alice", "payer": "Alice", "amount": 25.5 },
      { "id": 2, "date": new Date("2025-01-15"), "description": "Example expense #2 from Bob", "payer": "Bob", "amount": 35 },
      { "id": 3, "date": new Date("2025-01-15"), "description": "Example expense #3 from Alice", "payer": "Alice", "amount": 2 }
    ]
  const resetdata = await prisma.expense.createManyAndReturn({
    data: initialExpenses,
    skipDuplicates: true,
  });
  console.log(resetdata);
  return resetdata;
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
