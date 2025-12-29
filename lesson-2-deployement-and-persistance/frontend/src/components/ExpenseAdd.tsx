import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseInput>();

  const onSubmit = (data: ExpenseInput) => {
    console.log(data);
    addExpense({
      date: data.date,
      description: data.description,
      payer: data.payer,
      amount: data.amount,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Payer :
          <select
            {...register("payer", { required: "Payer field is required" })}
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
          {errors.payer && <span>{errors.payer.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Date :
          <input
            type="date"
            {...register("date", {
              required: "Date field is required",
            })}
            placeholder="Enter date"
          />
          {errors.date && <span>{errors.date.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Amount field is required",
              min: { value: 0.01, message: "Amount must be at least $0.01" },
              valueAsNumber: true,
            })}
            placeholder="Enter amount"
          />
          {errors.amount && <span>{errors.amount.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Description :
          <textarea
            {...register("description", {
              required: "Description field is required",
            })}
            placeholder="Enter description"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
      </div>

      <button type="submit">Ajouter</button>
    </form>
  );
}
