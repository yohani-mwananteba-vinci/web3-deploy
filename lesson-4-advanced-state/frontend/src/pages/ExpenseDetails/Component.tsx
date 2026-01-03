import { useLoaderData } from "react-router";
import type { LoaderData } from "./loader";

export default function ExpenseDetail() {
  const { expense } = useLoaderData<LoaderData>();

  if (!expense) {
    return <div>Expense not found</div>;
  } else {
    const shareAmount = expense.amount / expense.participants.length;

    return (
      <div>
        <h1>Expense Details</h1>
        <div>
          <h2>Payer Information:</h2>
          <p>Name: {expense.payer.name}</p>
          <p>Email: {expense.payer.email}</p>
          <p>Bank Account: {expense.payer.bankAccount ?? "/"}</p>
        </div>

        <div>
          <h2>Participants:</h2>
          <ul>
            {expense.participants
              .filter((participant) => participant.id !== expense.payer.id)
              .map((participant) => (
                <li key={participant.id}>
                  {participant.name} - {participant.email} -{" "}
                  {participant.bankAccount ?? "/"}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2>Share Information:</h2>
          <ul>
            {expense.participants.map((participant) => (
              <li key={participant.id}>
                {participant.name} : ${shareAmount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
