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

function resetExpenses() {
  const initData = fs.readFileSync(EXPENSES_INIT_FILE_PATH, 'utf8');
  fs.writeFileSync(EXPENSES_FILE_PATH, initData);
  return JSON.parse(initData);
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
