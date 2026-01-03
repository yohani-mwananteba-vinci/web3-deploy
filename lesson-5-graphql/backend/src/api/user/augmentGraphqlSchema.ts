import SchemaBuilder from "../../graphql/builder";
import * as userRepository from "./userRepository";

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const UserRef = builder.prismaObject("User", {
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeFloat("email"),
      bankAccount: t.exposeString("bankAccount"),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      user: t.field({
        type: UserRef,
        args: {
          id: t.arg.int({ required: true }),
        },
        resolve: async (_root, args, _ctx, _info) => {
          return userRepository.getAllUsers();
        },
      }),
    }),
  });
};

export default augmentSchema;
