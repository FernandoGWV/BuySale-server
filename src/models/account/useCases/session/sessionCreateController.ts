import { Request, Response } from "express";
import SessionCreateUseCase from "./sessionCreateUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class SessionCreateController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await new SessionCreateUseCase().execute(email, password);

    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }

  validate = celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  });
}

export default SessionCreateController;
