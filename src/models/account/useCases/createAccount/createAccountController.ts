import { Request, Response } from "express";
import CreateAccountUseCase from "./createAccountUseCases";
import { Joi, Segments, celebrate } from "celebrate";

class CreateAccountController {
  async handle(req: Request, res: Response) {
    const model = req.body;

    const result = await new CreateAccountUseCase().execute(model);

    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }

  validate = celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required().min(5),
      wallet: Joi.number(),
    }),
  });
}

export default CreateAccountController;
