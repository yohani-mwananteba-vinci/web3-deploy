import type { Transaction } from "@/types/Transaction";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

interface ExpenseTransactionItemProps {
  transaction: Transaction;
}

export default function ExpenseTransactionItem({
  transaction,
}: ExpenseTransactionItemProps) {
  const participantsCount = transaction.participants.length;
  const expenseDate = new Date(transaction.date).toLocaleDateString();
  const expenseId = transaction.id.replace("expense-", "");

  return (
    <div className="flex text-red-500">
      <div>
        {transaction.payer.name} paid ${transaction.amount} for{" "}
        {participantsCount} people on {expenseDate} : {transaction.description}
      </div>
      <Button className="bg-green-900">
        <NavLink to={`/expenses/${expenseId}`}>See details</NavLink>
      </Button>
    </div>
  );
}
