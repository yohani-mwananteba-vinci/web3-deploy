const express = require('express');
const router = express.Router();
const expensesService = require('../services/expenses.js');

router.get('/', async (req, res) => {
  try {
    const expenses = await expensesService.getAllExpenses();
    //console.log(expenses);
    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
});

router.post('/', async (req, res) => {
  try {
    // if (
    //   (!req.body.description || !String(req.body.description).trim()) &&
    //   (req.body.payer || !String(req.body.payer).trim()) &&
    //   (parseFloat(req.body.amount) <= 0)
    // ) throw new Error("Missing expense")
    
    const newExpense = {
      // id: Date.now(),
      date: req.body.date ?? null,
      description: req.body.description,
      payer: req.body.payer,
      amount: parseFloat(req.body.amount),
    };

    const addedExpense = await expensesService.addExpense(newExpense);
    res.status(201).json(addedExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.post('/reset', (req, res) => {
  try {
    const resetData = expensesService.resetExpenses();
    res.json({
      message: 'Expenses reset successfully',
      data: resetData,
    });
  } catch (error) {
    console.error('Error resetting expenses:', error);
    res.status(500).json({ error: 'Failed to reset expenses' });
  }
});

module.exports = router;
