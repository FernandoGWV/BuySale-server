import connection from "@config/knex";
import IAccount from "../../dto/IAccount";
import { EncryptPassword } from "@services/crypt";
import { format } from "date-fns";
import { Request } from "express";
import { SignInUSer } from "@services/authentication";

class CreateAccountUseCase {
  async execute(model: Partial<IAccount>, originalName: string) {
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
    const token = await SignInUSer({ id: model.id, name: model.name });
    const passwordEncrypted = await EncryptPassword(String(model.password));

    const insertResult = await connection("users").insert({
      ...model,
      userIcon: originalName,
      password: passwordEncrypted,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
    const userId = insertResult[0];
    return {
      status: true,
      message: "Usuário criado com sucesso.",
      token,
      user: {
        ...model,
        id: userId,
        password: "**",
        userIcon: originalName,
      },
    };
  }
}

export default CreateAccountUseCase;
