import { Request, Response } from "express";
import BuyProductUseCase from "./buyProductUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class BuyProductController {
  async handle(req: Request, res: Response) {
    const model = req.body;
    const result = await new BuyProductUseCase().execute(model);
    if (result.status) {
      return res.status(200).json({ ...result });
    } else {
      res.status(400).json({ ...result });
    }
  }
  
}

export default BuyProductController;
