import { Request, Response } from "express";
import CreateProductUseCase from "./createProductUseCase";
import { Joi, Segments, celebrate } from "celebrate";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { title, descripte, price } = req.body;
    const model = {
      title,
      descripte,
      price,
    };
    const { IdUser } = req.params;
    console.log(model);
    const result = await new CreateProductUseCase().execute(
      model,
      Number(IdUser)
    );
    console.log(result);
    if (result.status) {
      res.status(200).json({ ...result });
    } else {
      res.status(400).json({ ...result });
    }
  }

  /* async uploadImages(req: Request, res: Response) {
    const files: any = req.files;
    console.log(files);
    try {
      const promises = files.map(async (element: any) => {
        const result = await new CreateProductUseCase().upload(element.path);
        return result;
      });

      const results = await Promise.all(promises);

      results.forEach((result) => {
        if (result.status) {
          res.status(200).json({ ...result });
        } else {
          res.status(400).json({ ...result });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } */

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
