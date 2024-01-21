import connection from "@config/knex";
import IAccount from "../../dto/IAccount";
import { EncryptPassword } from "@services/crypt";
import { format } from "date-fns";

class CreateAccountUseCase {
  async execute(model: Partial<IAccount>) {
    const emailAlreadyTaken = await connection("users")
      .select("id")
      .where({ email: model.email })
      .first();
    if (emailAlreadyTaken) {
      return {
        status: false,
        message: "Email já cadastrado.",
      };
    }

    const passwordEncrypted = await EncryptPassword(String(model.password));

    await connection("users").insert({
      ...model,
      password: passwordEncrypted,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });

    return {
      status: true,
      message: "Usuário criado com sucesso.",
    };
  }
}

export default CreateAccountUseCase;