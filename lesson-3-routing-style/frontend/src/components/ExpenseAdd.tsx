import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

const expenseSchema = z.object({
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .min(3, "Description must be at least 3 characters long")
    .or(z.literal("")),
  payer: z.enum(["Alice", "Bob"], {
    error: "Payer must be either Alice or Bob",
  }),
  amount: z.coerce.number<number>().gt(0, "Amount must be a positive number"),
});

type FormData = z.infer<typeof expenseSchema>;

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = ({ description, payer, amount }: FormData) => {
    addExpense({
      description,
      payer,
      amount,
      date: new Date().toISOString(),
    });
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Description"
        {...register("description")}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
      />
      {errors.description && <span> {errors.description.message}</span>}

      <select
        {...register("payer")}
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
      </select>
      {errors.payer && <span>{errors.payer.message}</span>}

      <input
        type="number"
        {...register("amount")}
        placeholder="Enter amount"
        step={0.01}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
      />
      {errors.amount && <span>{errors.amount.message}</span>}

      <button type="submit" disabled={isSubmitDisabled} className={"bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
