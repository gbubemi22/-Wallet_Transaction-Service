import { BadRequestError, NotFoundError } from "../../utils/error.js";
import { prisma } from "../prisma/prisma.js";
export const getUserWallet = async (userId) => {
    const wallet = await prisma.wallet.findFirst({
        where: {
            userId: userId,
        },
    });
    if (!wallet)
        throw new NotFoundError(`User dose nit have wallet`);
    return {
        status: true,
        message: `Fetched successfully`,
        wallet,
    };
};
export const topUpWallet = async (userId, amount) => {
    const wallet = await prisma.wallet.findFirst({
        where: {
            userId: userId,
        },
    });
    if (!wallet)
        throw new NotFoundError(`User dose nit have wallet`);
    const updatedWallet = await prisma.wallet.update({
        where: {
            id: wallet.id,
        },
        data: {
            balance: wallet.balance + amount,
        },
    });
    return {
        status: true,
        message: `Top up successfully`,
        updatedWallet,
    };
};
export const transferToUser = async (senderId, receiverId, amount) => {
    console.log(senderId, receiverId, amount);
    if (senderId === receiverId) {
        throw new BadRequestError("Sender and receiver cannot be the same user.");
    }
    if (amount <= 0) {
        throw new BadRequestError("Transfer amount must be greater than 0.");
    }
    return await prisma.$transaction(async (tx) => {
        const sender = await tx.wallet.findFirst({
            where: { userId: senderId },
        });
        if (!sender)
            throw new NotFoundError("Sender wallet not found");
        const receiver = await tx.wallet.findFirst({
            where: { userId: receiverId },
        });
        if (!receiver)
            throw new NotFoundError("Receiver wallet not found");
        if (sender.balance < amount) {
            throw new BadRequestError("Insufficient balance");
        }
        // Update sender
        await tx.wallet.update({
            where: { id: sender.id },
            data: { balance: sender.balance - amount },
        });
        // Update receiver
        await tx.wallet.update({
            where: { id: receiver.id },
            data: { balance: receiver.balance + amount },
        });
        const senderBalanceBefore = sender.balance;
        const senderBalanceAfter = sender.balance - amount;
        const receiverBalanceBefore = receiver.balance;
        const receiverBalanceAfter = receiver.balance + amount;
        await Promise.all([
            tx.transaction.create({
                data: {
                    userId: senderId,
                    amount,
                    transactionType: "DR",
                    balanceBefore: senderBalanceBefore,
                    balanceAfter: senderBalanceAfter,
                    description: `Transfer to user ${receiverId}`,
                    status: "SUCCESS",
                },
            }),
            tx.transaction.create({
                data: {
                    userId: receiverId,
                    amount,
                    transactionType: "CR",
                    balanceBefore: receiverBalanceBefore,
                    balanceAfter: receiverBalanceAfter,
                    description: `Transfer from user ${senderId}`,
                    status: "SUCCESS",
                },
            }),
        ]);
        return {
            status: true,
            message: "Transfer successful",
            data: {
                from: senderId,
                to: receiverId,
                amount,
            },
        };
    });
};
