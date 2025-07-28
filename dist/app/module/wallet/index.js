import express from "express";
import { GetUserWallet, TopUpWallet, TransferToUser } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
const router = express.Router();
router
    .route("/")
    .get(joiValidator(validation.wallet), verifyToken, GetUserWallet);
router
    .route("/fund")
    .post(joiValidator(validation.topUpWallet), verifyToken, TopUpWallet);
router
    .route("/transfer")
    .post(joiValidator(validation.transferToUser), verifyToken, TransferToUser);
export default router;
