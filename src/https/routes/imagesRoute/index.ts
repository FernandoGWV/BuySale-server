import { Router } from "express";
import multer from "multer";
import UploadImagesController from "../../../models/uploadImages/UseCase/uploadImage/uploadImagesController";
const imagesRoute = Router();
const uploadImagesController = new UploadImagesController();
const upload = multer({ dest: "./public/imagesProducts" });
imagesRoute.post("/:productId", upload.any(), uploadImagesController.handle);

export default imagesRoute;
