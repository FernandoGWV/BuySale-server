import { Router } from "express";
import AccountRoutes from "./account";
import ProductRouter from "./products";

const AppRoutes = Router();

AppRoutes.use("/account", AccountRoutes);
AppRoutes.use("/products", ProductRouter);

export default AppRoutes;
