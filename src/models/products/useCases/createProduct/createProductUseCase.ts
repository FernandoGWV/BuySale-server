import connection from "@config/knex";
import IProducts from "../../dto/IProducts";
import { format } from "date-fns";

class CreateProductUseCase {
  async execute(model: Partial<IProducts>, IdUser: Number) {
    await connection("products").insert({
      ...model,
      id_user: IdUser,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      message: "Produto criado com sucesso.",
      Product: {
        ...model,
        id_user: IdUser,
      },
    };
  }
}

export default CreateProductUseCase;
