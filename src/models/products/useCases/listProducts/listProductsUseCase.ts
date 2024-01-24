import connection from "@config/knex";
import IProducts from "../../dto/IProducts";

class ListProductsUseCase {
  async execute() {
    const listProducts = await connection("products").select("*").orderBy("id");
    return {
      status: true,
      data: [...listProducts],
    };
  }
}

export default ListProductsUseCase;
