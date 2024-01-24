import connection from "@config/knex";

class DeleteProductUseCase {
  async execute(productId: Number) {
    await connection("products").delete().where({ id: productId });
    return {
      status: true,
      message: "Produto deletado com sucesso.",
    };
  }
}
export default DeleteProductUseCase;
