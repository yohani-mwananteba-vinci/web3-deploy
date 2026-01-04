import { GraphQLContext } from "@/types/GraphQLContext";
import SchemaBuilder from "../../graphql/builder";
import * as userRepository from "./userRepository";
import { requireAuth } from "@/graphql/authHelpers";

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const UserRef = builder.prismaObject("User", {
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeString("email"),
      bankAccount: t.exposeString("bankAccount"),
    }),
  });

  // Query test for getting all users (see 6.2 of the syllabus)
  try {
    builder.queryField("users", (t) =>
      t.field({
        type: [UserRef],
        resolve: async (_parent, _args, _context: GraphQLContext, _info) => {
          requireAuth(_context);
          return userRepository.getAllUsers();
        },
      })
    );
  } catch (error) {
    console.error("Error augmenting user schema:", error);
  }
};

export default augmentSchema;
