import type { Transaction } from "@/types/Transaction";

interface TransferTransactionItemProps {
  transaction: Transaction;
}

export default function TransferTransactionItem({
  transaction,
}: TransferTransactionItemProps) {
  const recipientUsers = transaction.participants.filter(
    (user) => user.id !== transaction.payer.id
  );

  const recipientNamesList = recipientUsers.map((user) => user.name).join(", ");
  const transferDate = new Date(transaction.date).toLocaleDateString();
  return (
    <div>
      <p>
        {transaction.payer.name} transferred €{transaction.amount} to {recipientNamesList} on {transferDate}.
      </p>
    </div>
  );
}
