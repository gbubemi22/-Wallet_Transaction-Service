export declare const list: (userId: number) => Promise<{
    status: boolean;
    message: string;
    transactions: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        description: string | null;
        transactionType: string;
        balanceBefore: number;
        balanceAfter: number;
        userId: number;
    }[];
}>;
