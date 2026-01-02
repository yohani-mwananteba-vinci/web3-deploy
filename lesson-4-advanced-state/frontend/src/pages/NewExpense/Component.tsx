import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import ApiClient from "@/lib/api";
import { useCurrentUser } from "../Layout/hooks";
import type { LoaderData } from "./loader";
import { useEffect, useState } from "react";
import type { NewExpensePayload } from "@/types/Expense";
import { Label } from "@/components/ui/label";

const expenseSchema = z.object({
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .min(3, "Description must be at least 3 characters long")
    .or(z.literal("")),
  amount: z.coerce.number<number>().gt(0, "Amount must be a positive number"),
  participantIds: z
    .array(z.number())
    .min(1, "At least one participant must be selected"),
});

type FormData = z.infer<typeof expenseSchema>;

const NewExpense = () => {
  const currentUser = useCurrentUser();
  const { users } = useLoaderData<LoaderData>();
  const [participantsIds, setParticipantsIds] = useState<number[]>(
    currentUser?.id ? [currentUser!.id] : []
  );

  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      participantIds: currentUser?.id ? [currentUser!.id] : [],
    },
  });

  useEffect(() => {
    if (!currentUser?.id) return;

    const currentValues = form.getValues("participantIds") ?? [];

    if (!currentValues.includes(currentUser.id)) {
      const newValue = [...currentValues, currentUser.id];
      form.setValue("participantIds", newValue, { shouldValidate: true });
      setParticipantsIds(newValue);
    }
  }, [currentUser, form]);

  const onSubmit = async ({ description, amount }: FormData) => {
    const newExpenseForm: NewExpensePayload = {
      description,
      payerId: currentUser!.id!,
      amount,
      date: new Date().toISOString(),
      participantIds: participantsIds,
    };
    await ApiClient.createExpense(newExpenseForm);
    toast("Expense has been created.");
    navigate("/transactions");
  };

  const isSubmitDisabled =
    form.formState.isSubmitting ||
    !form.formState.isValid ||
    currentUser == null;

  return (
    <div>
      <div>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participantIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant(s)</FormLabel>
                      <FormControl>
                        <div>
                          {users
                            .filter((user) => user.id !== currentUser?.id)
                            .map((user) => {
                              const isChecked = field.value?.includes(user.id!);

                              return (
                                <Label key={user.id}>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      const isNowChecked = checked === true;
                                      let newValue = isNowChecked
                                        ? [...(field.value ?? []), user.id!]
                                        : (field.value ?? []).filter(
                                            (id: number) => id !== user.id!
                                          );

                                      if (currentUser?.id) {
                                        if (
                                          !newValue.includes(currentUser.id)
                                        ) {
                                          newValue = [
                                            ...newValue,
                                            currentUser.id,
                                          ];
                                        }
                                      }

                                      field.onChange(newValue);
                                      setParticipantsIds(newValue);
                                    }}
                                  />
                                  {user.name}
                                </Label>
                              );
                            })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          step={0.01}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                {currentUser ? (
                  <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                    variant="default"
                  >
                    {form.formState.isSubmitting ? "Adding..." : "Add"}
                  </Button>
                ) : (
                  <p>Please log in to create a transfer.</p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
