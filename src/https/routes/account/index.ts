import { Router } from "express";
import CreateAccountController from "../../../models/account/useCases/createAccount/createAccountController";
import AuthController from "../../../middlewares/authValidation";
import SessionCreateController from "../../../models/account/useCases/session/sessionCreateController";

const AccountRoutes = Router();

const createAccountController = new CreateAccountController();
const createSessionController = new SessionCreateController();

AccountRoutes.post(
  "/",
  createAccountController.validate,
  createAccountController.handle
);

AccountRoutes.post(
  "/session",
  createSessionController.handle,
  createSessionController.validate
);

export default AccountRoutes;
