import { Router } from "express";
import UserRoute from "../module/user/index.js";
import WalletRoute from "../module/wallet/index.js";
import TransactionRoute from "../module/transaction/index.js";


const USER = `/v1/auth`;
const WALLET = `/v1/wallets`;
const TRANSACTION = `/v1/transactions`;

const route = Router();

route.use(USER, UserRoute);
route.use(WALLET, WalletRoute);
route.use(TRANSACTION, TransactionRoute);

export default route;
