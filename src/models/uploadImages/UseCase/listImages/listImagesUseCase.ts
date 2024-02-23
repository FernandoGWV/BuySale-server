import connection from "@config/knex";

class ListImagesUseCase {
  async execute(idProduct: number) {
    const listImages = await connection("images_product")
      .select("*")
      .where({ product_id: idProduct });
    return {
      status: true,
      data: [...listImages],
    };
  }
}

export default ListImagesUseCase;
