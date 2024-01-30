import { Router } from "express";
import CreateAccountController from "../../../models/account/useCases/createAccount/createAccountController";
import AuthController from "../../../middlewares/authValidation";
import SessionCreateController from "../../../models/account/useCases/session/sessionCreateController";
import UpdateAccountController from "../../../models/account/useCases/updateAccount/updateAccountController";
import DeleteAccountController from "../../../models/account/useCases/deleteAccount/deleteAccountController";
import multer from "multer";

const AccountRoutes = Router();

const createAccountController = new CreateAccountController();
const createSessionController = new SessionCreateController();
const updateAccountController = new UpdateAccountController();
const deleteAccountController = new DeleteAccountController();
const upload = multer({ dest: "./public/imgs" });

AccountRoutes.post(
  "/createAccount",
  upload.single("iconUser"),
  createAccountController.validate,
  createAccountController.handle
);

AccountRoutes.post(
  "/session",
  createSessionController.handle,
  createSessionController.validate
);

AccountRoutes.put(
  "/updateAccount/:IdUser",
  AuthController.HeaderAuth,
  updateAccountController.handle,
  updateAccountController.validate
);

AccountRoutes.delete(
  "/:IdUser",
  AuthController.HeaderAuth,
  deleteAccountController.handle,
  deleteAccountController.validate
);

export default AccountRoutes;
