import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function getAllUsers() {
  return prisma.user.findMany({
    include: {
      paidExpenses: true,
      // C: Il fallait juste garder les paidExpenses (utile pour récupérer l'id des dépenses payées par l'utilisateur pour les transactions (front))
      transfersOut: true,
      transfersIn: true,
      participatedExpenses: true,
    },
  });
}
