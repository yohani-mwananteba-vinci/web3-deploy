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
  // C: Dans la solution, le schéma valide les champs sourceId et targetId (string) qui sont envoyés à l'API,
  // C: alors qu'ici on valide source et target (noms) : ce ne sont pas les bons champs par rapport au contrat backend.
  // C: En plus, le choix d'un z.enum sur des noms "Alice/Bob/Charlie" rend le formulaire fragile si on change les utilisateurs côté backend.
  source: z.enum(["Alice", "Bob", "Charlie"], {
    error: "Source must be either Alice, Bob, or Charlie",
  }),
  // C: Le schéma définit un champ "target" mais dans le formulaire, il n'y a pas de champ séparé pour choisir la cible,
  // C: et l'API attend un targetId numérique, pas un nom : ce mapping n'est donc pas aligné avec le modèle de données attendu.
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
    // C: La solution initialise les valeurs par défaut en fonction du currentUser (sourceId = id de l'utilisateur courant).
    resolver: zodResolver(transferSchema),
    defaultValues: { source: "Alice", target: "Bob", amount: 0 },
  });

  const onSubmit = async ({ target, amount }: FormData) => {
    // C: Dans la solution, on envoie directement les ids (sourceId/targetId) issus du formulaire,
    // C: alors qu'ici on recherche l'utilisateur par son nom, ce qui couple la logique à la valeur du champ "name".
    const newTransferForm: NewTransferPayload = {
      sourceId: currentUser!.id!,
      targetId: users.find((user) => user.name === target)!.id!,
      amount,
      // C: La solution ne gère pas la date côté frontend ; elle laisse le backend gérer la date/createdAt.
      date: new Date().toISOString(),
    };

    // C: Dans la solution, on entoure l'appel API d'un try/catch et on utilise form.setError('root', ...)
    // C: pour afficher un message d'erreur global en cas d'échec ; ici, aucune gestion d'erreur n'est prévue.
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
          {/* C: Dans la solution, il y a un titre de page plus riche (section, sous-titre) et une mise en page plus structurée
              qui reprennent les patterns de la page Transactions (container, heading, texte secondaire). */}
          <h3 className="text-lg font-semibold mb-4">Add New Transfer</h3>

          {/* C: La solution affiche, au-dessus du formulaire, un bloc visuel d'erreur global basé sur formState.errors.root. */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      {/* C: Ici le label "Target" ne correspond pas au nom du champ ("source"), ce qui rend le formulaire confus. */}
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

                {/* C: Dans la solution, il y a un second Select pour choisir explicitement le destinataire (targetId) ;
                    ici un seul Select est rendu, donc le champ "target" du schéma n'est jamais saisi par l'utilisateur. */}

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
                  // C: Dans la solution, les erreurs sont gérées via formState.errors.root et affichées dans un bloc visuel dédié.
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
