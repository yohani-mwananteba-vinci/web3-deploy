import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import type { Expense, ExpenseInput } from "../types/Expense";
import { useNavigate } from "react-router-dom";

const host = import.meta.env.VITE_API_URL || "http://localhost:3000"; // C: erreur – dans la solution, Add ne connaît pas host, il passe par PageContext.sendApiRequestandHandleError défini dans App.tsx

export default function Add() {
  const [expenses, setExpenses] = useState<Expense[]>([]); // C: erreur – dans la solution, Add ne garde pas sa propre liste d'expenses, il se contente d'appeler l'API puis de rediriger
  const [error, setError] = useState<string | null>(null); // C: erreur – l'état error vient du PageContext dans la solution, pas d'un useState local du composant

  const navigate = useNavigate();

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
      return await response.json(); // C: erreur – même logique API que dans Home/List : elle devrait être factorisée dans App.tsx et partagée via PageContext
    } catch (error) {
      console.error("API request failed:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleAddExpense = async (newExpenseForm: ExpenseInput) => {
    const newExpenseOptimistic = {
      id: "optimistic",
      ...newExpenseForm,
    } as Expense; // C: erreur – dans la solution, il n'y a pas de mise à jour optimiste locale dans Add, l'écran se contente d'appeler l'API puis de naviguer vers la liste
    const newExpensesOptimistic = [newExpenseOptimistic, ...expenses];
    setExpenses(newExpensesOptimistic);
    const addedExpense = await sendApiRequestandHandleError(
      "POST",
      "expenses",
      newExpenseForm
    );
    const newExpensesActual = [addedExpense, ...expenses]; // C: erreur – dans la solution, Add ne remplace pas un state local, il laisse List relire les données via le contexte partagé
    setExpenses(newExpensesActual);
    navigate("/list");
  };

  return (
    <div>
      <h1>Add Page</h1>

      {error && <div>Error: {error}</div>}

      <div>
        <ExpenseAdd addExpense={handleAddExpense} />
      </div>
    </div>
  );
}
