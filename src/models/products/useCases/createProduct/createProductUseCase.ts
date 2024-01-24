import connection from "@config/knex";
import IProducts from "../../dto/IProducts";
import { format } from "date-fns";

class CreateProductUseCase {
  async execute(model: Partial<IProducts>, IdUser: Number) {
    const verifyUser = await connection("users")
      .select("id")
      .where({ id: IdUser })
      .first();
    if (!verifyUser) {
      return {
        status: false,
        message: "Tratando Error de Usuario.",
      };
    }

    await connection("products").insert({
      ...model,
      userId: IdUser,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      message: "Produto criado com sucesso.",
    };
  }
}

export default CreateProductUseCase;
