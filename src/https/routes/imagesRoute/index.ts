import { Router } from "express";
import multer from "multer";
import UploadImagesController from "../../../models/uploadImages/UseCase/uploadImage/uploadImagesController";
import ListImagesController from "../../../models/uploadImages/UseCase/listImages/listImagesController";
const imagesRoute = Router();
const uploadImagesController = new UploadImagesController();
const listImagesController = new ListImagesController();
const upload = multer({ dest: "./public/imagesProducts" });

imagesRoute.post("/:productId", upload.any(), uploadImagesController.handle);

export default imagesRoute;
