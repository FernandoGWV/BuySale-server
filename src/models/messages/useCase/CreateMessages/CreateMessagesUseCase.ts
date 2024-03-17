import connection from "@config/knex";
import IMessages from "../../dto/IMessages";
import { format } from "date-fns";

class CreateMessagesUseCases {
  async execute(model: Partial<IMessages>) {
    await connection("chat_product").insert({
      ...model,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      data: "mensagens salvas",
    };
  }
}

export default CreateMessagesUseCases;
