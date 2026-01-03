import ApiClient from "@/lib/api";
import type { Expense } from "@/types/Expense";
import type { LoaderFunctionArgs } from "react-router";

export interface LoaderData {
  expense: Expense;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // C: Il fallait faire une var {id} = params et convertir en number avant de passer à l'API mais ok !
  const expense = await ApiClient.getExpenseById(Number(params.id));
  return { expense };
}
