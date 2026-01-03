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
  // C: Dans la solution, le schéma inclut aussi payerId (string) et une date optionnelle,
  // C: alors qu'ici payerId n'est pas validé par Zod et la date n'existe pas dans le schéma.
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .min(3, "Description must be at least 3 characters long")
    .or(z.literal("")),
  amount: z.coerce.number<number>().gt(0, "Amount must be a positive number"),
  // C: La solution attend participantIds: string[] (ids sous forme de chaîne) ;
  // C: ici le schéma valide un tableau de number, ce qui ne correspond pas exactement au contrat de l'API ni au mapping de la solution.
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
      // C: Dans la solution, payerId est dans les valeurs par défaut (id de l'utilisateur courant)
      // C: et date est initialisée à la date du jour ; ici ces champs ne sont pas gérés par le formulaire.
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
    // C: La solution récupère toutes les valeurs validées par le formulaire (description, amount, date, payerId, participantIds)
    // C: et les transforme (Number(...)) avant de les envoyer. Ici, payerId et date sont fixés "en dur" dans l'objet payload.
    const newExpenseForm: NewExpensePayload = {
      description,
      payerId: currentUser!.id!,
      amount,
      // C: La solution permet de choisir la date via un champ <Input type="date" /> et la convertit en ISO ;
      // C: ici la date est toujours "maintenant", sans saisie par l'utilisateur.
      date: new Date().toISOString(),
      participantIds: participantsIds,
    };
    // C: Dans la solution, l'appel API est entouré d'un try/catch et form.setError('root', ...)
    // C: est utilisé pour afficher un message d'erreur global en cas d'échec ; ici aucune gestion d'erreur n'est présente.
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
          {/* C: Dans la solution, la page est structurée comme une vraie section de layout
              avec un titre de page "New Expense" et un sous-titre explicatif. */}
          <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>

          {/* C: Il manque un bloc d'erreur global basé sur form.formState.errors.root,
              comme dans la solution (AlertCircle, message au-dessus du formulaire). */}

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
                            // C: Dans la solution, tous les utilisateurs sont proposés, le payer étant choisi via payerId ;
                            // C: ici tu exclus l'utilisateur courant de la liste, ce qui peut créer un décalage
                            // C: entre participantIds et le payer réel.
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
                  // C: Le message fait référence à "transfer" au lieu de "expense",
                  // C: ce qui indique probablement un copier/coller depuis la page de transfert.
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
