import { Request, Response } from "express";
import DeleteAccountUseCase from "./deleteAccountUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class DeleteAccountController {
  async handle(req: Request, res: Response) {
    const { IdUser } = req.params;
    const result = await new DeleteAccountUseCase().execute(Number(IdUser));

    return res.status(200).json({ ...result });
  }

  validate = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      IdUser: Joi.number().required(),
    }),
  });
}

export default DeleteAccountController;
