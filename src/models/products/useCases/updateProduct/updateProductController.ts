import { Request, Response } from "express";
import UpdateProductUseCase from "./updateProductUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const model = req.body;
    const { productId } = req.params;

    const result = await new UpdateProductUseCase().execute(
      model,
      Number(productId)
    );
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }

  validate = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      productId: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string(),
      descripte: Joi.string(),
      price: Joi.number(),
      like: Joi.number(),
      image: Joi.string(),
    }),
  });
}

export default UpdateProductController;
