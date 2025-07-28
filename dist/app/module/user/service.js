import { ConflictError, UnauthenticatedError } from "../../utils/error.js";
import { prisma } from "../prisma/prisma.js";
import { compare, hash } from "../../utils/bcryptiUtils.js";
import { generateJWT } from "../../utils/constant.js";
export const create = async (fullName, email, password) => {
    const checkUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (checkUser)
        throw new ConflictError("Email already exists");
    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
        data: {
            fullName: fullName,
            email: email,
            password: hashedPassword,
        },
    });
    await prisma.wallet.create({
        data: {
            userId: user.id,
        },
    });
    return {
        data: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        },
        message: "User created successfully",
    };
};
export const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user)
        throw new UnauthenticatedError("Invalid email or password");
    const validatePassword = await compare(password, user.password);
    if (!validatePassword)
        throw new UnauthenticatedError("Invalid email or password");
    const token = await generateJWT(user.id, user.email);
    return {
        status: true,
        message: `Welcome Back ${user.fullName}`,
        data: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token: token,
        },
    };
};
