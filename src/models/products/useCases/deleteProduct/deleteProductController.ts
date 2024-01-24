import { Request, Response } from "express";
import DeleteProductUseCase from "./deleteProductUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { productId } = req.params;
    const result = await new DeleteProductUseCase().execute(Number(productId));
    return res.status(200).json({ ...result });
  }

  validate = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      productId: Joi.number().required(),
    }),
  });
}

export default DeleteProductController;
