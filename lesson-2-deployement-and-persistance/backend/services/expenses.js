const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// C: Il fallait une fonction qui effectue la query et nous déconnecte direct de la BD (après chaque opération, pour éviter les fuites de connexion) => queryDatabaseAndDisconnect(operation)
// Ex:
// const queryDatabaseAndDisconnect = (operation) => {
//   return operation().finally(() => {
//     prisma.$disconnect();
//   });
// };

// C: async/await inutile ici
async function getAllExpenses() {
  const data = await prisma.expense.findMany();
  // console.log(data);
  return data; // C: Il fallait nous déconnecter de la BD après chaque opération (return queryDatabaseAndDisconnect(data);)
}

// C: async/await inutile ici
async function addExpense(expense) {
  const newExpense = await prisma.expense.create({
    // C: On pouvait directement passer l'objet expense ({data: expense})
    data: {
      date: expense.date,
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount
    }
    // Rem: You can still use the property name of a any js object
    // (properties name's are defined when you create the param expense)
  });
  return expense; // C: Il fallait nous déconnecter de la BD après chaque opération (return queryDatabaseAndDisconnect(newExpense);)
}

async function resetExpenses() {
  await prisma.expense.deleteMany({});
  const initialExpenses =
    [
      { "id": 1, "date": new Date("2025-01-16"), "description": "Example expense #1 from Alice", "payer": "Alice", "amount": 25.5 },
      { "id": 2, "date": new Date("2025-01-15"), "description": "Example expense #2 from Bob", "payer": "Bob", "amount": 35 },
      { "id": 3, "date": new Date("2025-01-15"), "description": "Example expense #3 from Alice", "payer": "Alice", "amount": 2 }
    ]
  // C: createMany suffisant ici
  const resetdata = await prisma.expense.createManyAndReturn({
    data: initialExpenses,
    skipDuplicates: true,
  });
  return resetdata; // C: Il fallait nous déconnecter de la BD après chaque opération (return queryDatabaseAndDisconnect(resetdata);)
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
