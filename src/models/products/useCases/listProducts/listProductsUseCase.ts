import connection from "@config/knex";
import IProducts from "../../dto/IProducts";

class ListProductsUseCase {
  async execute() {
    const listProducts = await connection("products").select("*").orderBy("id");

    const productsWithImages = [];

    for (const product of listProducts) {
      const images = await connection("images_product")
        .select("*")
        .where({ product_id: product.id });
      const dataMessage = await connection("chat_product")
        .select("*")
        .where({ product_id: product.id });

      productsWithImages.push({
        ...product,
        images: images,
        messages: dataMessage,
      });
    }

    return {
      status: true,
      data: productsWithImages,
    };
  }
}

export default ListProductsUseCase;
