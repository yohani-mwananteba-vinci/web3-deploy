import SchemaBuilder from "../../graphql/builder";
import * as userRepository from "./userRepository";

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const UserRef = builder.prismaObject("User", {
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeString("email"),
      bankAccount: t.exposeString("bankAccount"),
    }),
  });

  // C: inutile ici, userRef était suffusant pour getAllUsers
  // Ceci est utilisé pour un ajout de query spécifique, or nous on a déjà une query générée automatiquement par Pothos pour getAllUsers
  builder.queryType({
    fields: (t) => ({
      user: t.field({
        type: UserRef,
        resolve: async (_root, _args, _ctx, _info) => {
          return userRepository.getAllUsers();
        },
      }),
    }),
  });
};

export default augmentSchema;
