import { Router } from "express";
import AccountRoutes from "./account";
import ProductRouter from "./products";
import imagesRoute from "./imagesRoute";

const AppRoutes = Router();

AppRoutes.use("/account", AccountRoutes);
AppRoutes.use("/products", ProductRouter);
AppRoutes.use("/imagesUpload", imagesRoute);

export default AppRoutes;
