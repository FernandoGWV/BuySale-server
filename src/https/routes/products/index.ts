import { Router } from "express";
import CreateProductController from "../../../models/products/useCases/createProduct/createProductController";
import AuthController from "../../../middlewares/authValidation";
import UpdateProductController from "../../../models/products/useCases/updateProduct/updateProductController";
import ListProductController from "../../../models/products/useCases/listProducts/listProductController";
import DeleteProductController from "../../../models/products/useCases/deleteProduct/deleteProductController";
import CreateMessagesController from "../../../models/messages/useCase/CreateMessages/createMessagesController";
import BuyProductController from "../../../models/products/useCases/buyProduct/buyProductController";
import ListPurchasedController from "../../../models/products/useCases/listProducts/listPurchased/ListPurchasedController";
const ProductRouter = Router();

const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const listProductController = new ListProductController();
const deleteProductController = new DeleteProductController();
const uploadImagesController = new UpdateProductController();
const createMessagesController = new CreateMessagesController();
const buyProductController = new BuyProductController();
const listProductPurchased = new ListPurchasedController()

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

ProductRouter.post(
  "/saveMessages",
  AuthController.HeaderAuth,
  createMessagesController.handle,
  createMessagesController.validate
);

ProductRouter.post(
  "/purchased",
  AuthController.HeaderAuth,
  buyProductController.handle,
);

ProductRouter.get('/listProductsPurchased/:userId',
  AuthController.HeaderAuth,
  listProductPurchased.handle
)

export default ProductRouter;
