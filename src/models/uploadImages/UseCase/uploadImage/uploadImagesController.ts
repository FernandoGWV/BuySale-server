import { Request, Response } from "express";
import UploadImageUseCase from "./uploadImageUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class UploadImagesController {
  async handle(req: Request, res: Response) {
    const files: any = req.files;
    const { productId } = req.params;

    try {
      const promises = files.map(async (element: any) => {
        const result = await new UploadImageUseCase().execute(
          Number(productId),
          element.path
        );
        return result;
      });

      const results = await Promise.all(promises);

      results.forEach((result) => {
        if (result.status) {
          res.status(200).json({ ...result });
        } else {
          res.status(400).json({ ...result });
        }
      });
    } catch (error) {
      // Handle error appropriately
    }
  }
}

export default UploadImagesController;
