import { StatusCodes } from "http-status-codes";
import { create, login } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        res
            .status(StatusCodes.CREATED)
            .json(await create(fullName, email, password));
    }
    catch (error) {
        next(error);
    }
};
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        res.status(StatusCodes.OK).json(await login(email, password));
    }
    catch (error) {
        next(error);
    }
};
