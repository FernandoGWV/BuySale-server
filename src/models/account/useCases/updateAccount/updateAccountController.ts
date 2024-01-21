import { Request, Response } from "express";
import UpdateAccountUseCase from "./updateAccountUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class UpdateAccountController {
  async handle(req: Request, res: Response) {
    const model = req.body;
    const { IdUser } = req.params;

    const result = await new UpdateAccountUseCase().execute(
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
      email: Joi.string().email(),
      name: Joi.string(),
      password: Joi.string(),
      wallet: Joi.number(),
    }),
  });
}

export default UpdateAccountController;
