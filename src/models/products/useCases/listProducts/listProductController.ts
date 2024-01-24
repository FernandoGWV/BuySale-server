import { Request, Response } from "express";
import ListProductsUseCase from "./listProductsUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class ListProductController {
  async handle(req: Request, res: Response) {
    const result = await new ListProductsUseCase().execute();
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }
  validate = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string(),
      descripte: Joi.string(),
      price: Joi.number(),
      like: Joi.number(),
      image: Joi.string(),
    }),
  });
}

export default ListProductController;
