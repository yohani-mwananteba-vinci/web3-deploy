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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { LoaderData } from "./loader";
import { useCurrentUser } from "../Layout/hooks";
import ApiClient from "@/lib/api";
import type { NewTransferPayload } from "@/types/Transfer";

const transferSchema = z.object({
  source: z.enum(["Alice", "Bob", "Charlie"], {
    error: "Source must be either Alice, Bob, or Charlie",
  }),
  target: z.enum(["Alice", "Bob", "Charlie"], {
    error: "Payer must be either Alice, Bob, or Charlie",
  }),
  amount: z.coerce.number<number>().gt(0, "Amount must be a positive number"),
});

type FormData = z.infer<typeof transferSchema>;

const NewTransfer = () => {
  const currentUser = useCurrentUser();
  const { users } = useLoaderData<LoaderData>();

  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: { source: "Alice", target: "Bob", amount: 0 },
  });

  const onSubmit = async ({ target, amount }: FormData) => {
    const newTransferForm: NewTransferPayload = {
      sourceId: currentUser!.id!,
      targetId: users.find((user) => user.name === target)!.id!,
      amount,
      date: new Date().toISOString(),
    };
    await ApiClient.createTransfer(newTransferForm);

    toast("Transfer has been created.");
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
          <h3 className="text-lg font-semibold mb-4">Add New Transfer</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Target" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users
                            .filter((user) => user.id !== currentUser?.id)
                            .map((user) => (
                              <SelectItem key={user.id} value={user.name}>
                                {user.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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

export default NewTransfer;
