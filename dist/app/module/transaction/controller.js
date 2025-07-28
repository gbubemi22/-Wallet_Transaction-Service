import { StatusCodes } from "http-status-codes";
import { list } from "./service.js";
export const List = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.OK).json(await list(userId));
    }
    catch (error) {
        next(error);
    }
};
