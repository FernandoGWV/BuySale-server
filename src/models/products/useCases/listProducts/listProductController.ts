import { Request, Response } from "express";
import ListProductsUseCase from "./listProductsUseCase";
import { Joi, Segments, celebrate } from "celebrate";
import App from "@http/app";

class ListProductController {
  async handle(req: Request, res: Response) {
    const app = new App();
    const { idProduct } = req.params;
    console.log(idProduct);
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
