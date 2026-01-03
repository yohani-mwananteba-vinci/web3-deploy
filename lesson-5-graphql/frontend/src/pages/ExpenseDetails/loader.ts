import type { Expense } from "@/types/Expense";
import type { LoaderFunctionArgs } from "react-router";
import { gql } from "@apollo/client";
import graphqlClient from "@/lib/graphql-client";

// C: Dans la solution, le backend GraphQL attend un Int pour l'argument id
// et renvoie aussi le champ date. Ici, la query utilise $id: ID! et ne demande
// pas date, ce qui peut créer des divergences avec le schéma et le type Expense.
const EXPENSE_QUERY = gql`
  query ExpenseDetail($id: ID!) {
    expense(id: $id) {
      id
      description
      amount
      payer {
        name
        bankAccount
      }
      participants {
        name
      }
    }
  }
`;

export interface LoaderData {
  expense: Expense;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { data, error } = await graphqlClient.query<{ expense: Expense }>({
    query: EXPENSE_QUERY,
    // C: params.id est une string issue de l'URL. Dans la solution, on utilise
    // parseInt(params.id!) car le backend attend un Int pour id.
    variables: { id: params.id },
  });

  if (!data?.expense || error) {
    throw new Error(
      "Error while retrieving expense details from the server: " + error
    );
  }

  return { expense: data.expense };
}
