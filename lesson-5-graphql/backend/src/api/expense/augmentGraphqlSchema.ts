import SchemaBuilder from "../../graphql/builder";
import * as expenseRepository from "./expenseRepository";

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const ExpenseRef = builder.prismaObject("Expense", {
    fields: (t) => ({
      id: t.exposeID("id"),
      description: t.exposeString("description"),
      amount: t.exposeFloat("amount"),
      // GraphQL retourne une String, Prisma stocke un Date
      date: t.string({
        resolve: (parent: any) => parent.date.toISOString(),
      }),
      payer: t.relation("payer"),
      participants: t.relation("participants"),
    }),
  });
  builder.queryType({
    fields: (t) => ({
      expense: t.field({
        type: ExpenseRef,
        args: {
          id: t.arg.int({ required: true }),
        },
        resolve: async (_root, args, _ctx, _info) => {
          return expenseRepository.getExpenseById(args.id as number);
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createExpense: t.field({
        type: ExpenseRef,
        args: {
          description: t.arg.string({ required: true }),
          amount: t.arg.float({ required: true }),
          // On accepte une String au format ISO côté GraphQL
          date: t.arg.string({ required: true }),
          payerId: t.arg.int({ required: true }),
          participantIds: t.arg({ type: ["Int"], required: true }),
        },
        resolve: async (_parent, args, _context, _info) => {
          const { description, amount, date, payerId, participantIds } = args;
          return expenseRepository.createExpense({
            description,
            amount,
            date,
            payerId,
            participantIds,
          });
        },
      }),
    }),
  });
};

export default augmentSchema;
