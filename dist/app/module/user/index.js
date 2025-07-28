import express from 'express';
import { Create, Login } from './controller.js';
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
const router = express.Router();
router.route('/signup').post(joiValidator(validation.create), Create);
router.route('/login').post(joiValidator(validation.login), Login);
export default router;
