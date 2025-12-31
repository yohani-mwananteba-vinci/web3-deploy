import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const form = useForm<FormData>({
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm mx-auto space-y-6"
      >
        {/* Description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Description"
                  {...field}
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payer field */}
        <FormField
          control={form.control}
          name="payer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Select a payer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alice">Alice</SelectItem>
                    <SelectItem value="Bob">Bob</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Enter amount"
                  {...field}
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white"
          onClick={() => toast.success("Event has been created")}
        >
          {form.formState.isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </Form>
  );
}
