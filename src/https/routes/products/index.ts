import { Router } from "express";
import CreateProductController from "../../../models/products/useCases/createProduct/createProductController";
import AuthController from "../../../middlewares/authValidation";
import UpdateProductController from "../../../models/products/useCases/updateProduct/updateProductController";
import ListProductController from "../../../models/products/useCases/listProducts/listProductController";
import DeleteProductController from "../../../models/products/useCases/deleteProduct/deleteProductController";

const ProductRouter = Router();

const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const listProductController = new ListProductController();
const deleteProductController = new DeleteProductController();

ProductRouter.get(
  "/",
  listProductController.handle,
  listProductController.validate
);

ProductRouter.post(
  "/create/:IdUser",
  AuthController.HeaderAuth,
  createProductController.handle,
  createProductController.validate
);

ProductRouter.put(
  "/:productId",
  AuthController.HeaderAuth,
  updateProductController.handle,
  updateProductController.validate
);

ProductRouter.delete(
  "/delete/:productId",
  AuthController.HeaderAuth,
  deleteProductController.handle,
  deleteProductController.validate
);

export default ProductRouter;
