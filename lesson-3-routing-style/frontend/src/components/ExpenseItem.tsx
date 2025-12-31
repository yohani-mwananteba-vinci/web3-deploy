import type { Expense } from "../types/Expense";
import { TableCell, TableRow } from "@/components/ui/table";

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <TableRow className="hover:bg-blue-400">
      <TableCell>#{expense.id}</TableCell>
      <TableCell>{expense.date}</TableCell>
      <TableCell>{expense.description}</TableCell>
      <TableCell>
        Paid by <span>{expense.payer}</span>
      </TableCell>
      <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
    </TableRow>
  );
}
