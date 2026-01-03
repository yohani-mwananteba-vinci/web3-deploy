import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function getAllUsers() {
  return prisma.user.findMany({
    include: {
      paidExpenses: true,
    },
  });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      // payer: true,
      // participants: true,
    },
  });
}