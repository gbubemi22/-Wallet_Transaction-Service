import { Controller } from "../../utils/constant.js";
import { getUserWallet, topUpWallet, transferToUser } from "./service.js";
import { StatusCodes } from "http-status-codes";

export const GetUserWallet: Controller = async (req, res, next) => {
  try {
    const { userId } = req.user.id;
    console.log("ID::::", userId);
    res.status(StatusCodes.OK).json(await getUserWallet(userId));
  } catch (error) {
    next(error);
  }
};

export const TopUpWallet: Controller = async (req, res, next) => {
  try {
    const { userId } = req.user.id;
    const { amount } = req.body;
    res.status(StatusCodes.OK).json(await topUpWallet(userId, amount));
  } catch (error) {
    next(error);
  }
};

export const TransferToUser: Controller = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    console.log("ID::::", senderId);
    const { receiverId, amount } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await transferToUser(senderId, receiverId, amount));
  } catch (error) {
    next(error);
  }
};
