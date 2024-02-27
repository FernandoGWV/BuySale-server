import { Request, Response } from "express";
import GetProfileUserUseCase from "./getProfileUserUseCase";

class GetProfileUserController {
  async handle(req: Request, res: Response) {
    const { idUser } = req.params;
    const result = await new GetProfileUserUseCase().execute(Number(idUser));
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }
}

export default GetProfileUserController;
