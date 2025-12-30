import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <tr className="table-row border hover:bg-blue-400">
      <td className="px-6 py-3 font-medium">#{expense.id}</td>
      <td className="px-6 py-3 font-medium ">{expense.date}</td>
      <td className="px-6 py-3 font-medium ">{expense.description}</td>
      <td className="px-6 py-3 font-medium ">
        Paid by <span>{expense.payer}</span>
      </td>
      <td className="text-right p-2 ">${expense.amount.toFixed(2)}</td>
    </tr>
  );
}
