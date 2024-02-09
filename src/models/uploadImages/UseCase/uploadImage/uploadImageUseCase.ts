import connection from "@config/knex";
import IUploadImage from "../../dto/IUploadImage";
import { format } from "date-fns";

class UploadImageUseCase {
  async execute(productId: number, pathImage: string) {
    await connection("images_product").insert({
      path_image: pathImage,
      product_id: 22,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      message: "Upload de images feito com sucesso.",
    };
  }
}

export default UploadImageUseCase;
