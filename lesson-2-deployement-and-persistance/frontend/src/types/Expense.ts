import type { Identifiable } from "./Core";

interface Expense extends Identifiable, ExpenseInput {}

interface ExpenseInput {
  date: string;
  description: string;
  payer: string;
  amount: number;
}

export type { Expense, ExpenseInput };
