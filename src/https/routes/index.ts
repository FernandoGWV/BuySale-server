import { Router } from "express";
import AccountRoutes from "./account";

const AppRoutes = Router();

AppRoutes.use("/account", AccountRoutes);

export default AppRoutes;
