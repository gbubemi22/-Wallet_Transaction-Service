import { prisma } from "../prisma/prisma.js";

export const list = async (userId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return {
    status: true,
    message: "Fetched transactions",
    transactions,
  };
};
