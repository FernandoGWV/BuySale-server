import { Request, Response } from "express";
import CreateProductUseCase from "./createProductUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const model = req.body;
    const { IdUser } = req.params;

    const result = await new CreateProductUseCase().execute(
      model,
      Number(IdUser)
    );
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }

  validate = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      IdUser: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      descripte: Joi.string().required(),
      price: Joi.number().required(),
      like: Joi.number(),
    }),
  });
}

export default CreateProductController;
