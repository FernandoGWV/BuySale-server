import { Request, Response } from "express";
import ListImagesUseCase from "./listImagesUseCase";

class ListImagesController {
  async handle(req: Request, res: Response) {
    const { idProduct } = req.params;
    const result = await new ListImagesUseCase().execute(Number(idProduct));
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      return res.status(400).json({ ...result });
    }
  }
}

export default ListImagesController;
