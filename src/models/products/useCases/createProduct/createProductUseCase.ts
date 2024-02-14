import connection from "@config/knex";
import IProducts from "../../dto/IProducts";
import { format } from "date-fns";

class CreateProductUseCase {
  productId: any;
  constructor() {
    this.productId;
  }

  async execute(model: Partial<IProducts>, IdUser: Number) {
    const insertResult = await connection("products").insert({
      ...model,
      id_user: IdUser,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
    this.productId = insertResult[0];
    return {
      status: true,
      message: "Produto criado com sucesso.",
      product: {
        ...model,
        id: this.productId,
        id_user: IdUser,
      },
    };
  }

  /*   async upload(pathImage: string) {
    await connection("images_product").insert({
      path_image: pathImage,
      product_id: this.productId,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      message: "Upload de images feito com sucesso.",
    };
  } */
}

export default CreateProductUseCase;
