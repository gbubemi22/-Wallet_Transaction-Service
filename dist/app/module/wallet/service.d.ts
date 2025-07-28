export declare const getUserWallet: (userId: number) => Promise<{
    status: boolean;
    message: string;
    wallet: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
    };
}>;
export declare const topUpWallet: (userId: number, amount: number) => Promise<{
    status: boolean;
    message: string;
    updatedWallet: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
    };
}>;
export declare const transferToUser: (senderId: number, receiverId: number, amount: number) => Promise<{
    status: boolean;
    message: string;
    data: {
        from: number;
        to: number;
        amount: number;
    };
}>;
