import connection from "@config/knex";
import IProducts from "../../dto/IProducts";

class UpdateProductUseCase {
  async execute(model: Partial<IProducts>, productId: Number) {
    await connection("products")
      .update({ ...model })
      .where({ id: productId });

    return {
      status: true,
      message: "Produto Atualizado com sucesso.",
    };
  }
}

export default UpdateProductUseCase;
