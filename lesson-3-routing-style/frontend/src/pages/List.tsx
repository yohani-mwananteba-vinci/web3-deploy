import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseSorter from "../components/ExpenseSorter";
import type { Expense } from "../types/Expense";

import { Table, TableBody } from "@/components/ui/table";

const host = import.meta.env.VITE_API_URL || "http://localhost:3000"; // C: erreur – dans la solution, List ne connaît pas host, elle appelle PageContext.sendApiRequestandHandleError fourni par App.tsx

export default function List() {
  const [sortingAlgo, setSortingAlgo] = useState<
    (_a: Expense, _b: Expense) => number
  >(() => () => 0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // C: erreur – dans la solution, error est lu depuis PageContext et non redéclaré localement

  const sendApiRequestandHandleError = async (
    method: string = "GET",
    path: string,
    body?: unknown
  ) => {
    try {
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // C: erreur – même duplication de logique API que dans Add/Home, qui devrait être centralisée dans App.tsx
    } catch (error) {
      console.error("API request failed:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await sendApiRequestandHandleError("GET", "expenses");
      setExpenses(data); // C: erreur – si l'appel renvoie undefined, cela casse le typage implicite (la solution fait "... || []" pour garantir un tableau)
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleResetData = async () => {
    setExpenses([]); // Clear current expenses optimistically
    setLoading(true);

    const resetData = await sendApiRequestandHandleError(
      "POST",
      "expenses/reset"
    );
    setExpenses(resetData.data);
    setLoading(false);
    // C: erreur – dans la solution, la remise à zéro est gérée depuis Add (via PageContext), pas directement dans List
  };

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // Pay attention here, we're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = expenses.sort(sortingAlgo);

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">List Page</h1>
      <div>
        <h2 className="text-2xl">Expenses ({expenses.length})</h2>

        {error && <div>Error: {error}</div>}

        {expenses.length > 0 && (
          <ExpenseSorter setSortingAlgo={handleAlgoChange} />
        )}

        <div className={"bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"}>
          <button onClick={handleResetData}>Reset Data</button>
        </div>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          {sortedExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <Table>
              <TableBody className="text-left">
                {sortedExpenses.map((expense) => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
