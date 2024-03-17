import { Request, Response } from "express";
import CreateMessagesUseCases from "./CreateMessagesUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class CreateMessagesController {
  async handle(req: Request, res: Response) {
    const model = req.body;
    const result = await new CreateMessagesUseCases().execute(model);

    if (result.status) {
      res.status(200).json({ ...result });
    } else {
      res.status(200).json({ ...result });
    }
  }
  validate = celebrate({
    [Segments.BODY]: Joi.object().keys({
      messages: Joi.string(),
      name: Joi.string(),
      user_icon: Joi.string(),
      user_id: Joi.number(),
      product_id: Joi.number(),
    }),
  });
}

export default CreateMessagesController;
