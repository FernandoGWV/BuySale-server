import connection from "@config/knex";
import IAccount from "../../dto/IAccount";
import { ComparePassword, EncryptPassword } from "@services/crypt";

class UpdateAccountUseCase {
  async execute(model: Partial<IAccount>, IdUser: number) {
    const updateUser = await connection("users")
      .select("*")
      .where({ id: IdUser })
      .first();

    if (!updateUser) {
      return {
        status: false,
        message: "Usuário não encontrado.",
      };
    }

    if (model.email && model.email !== updateUser.email) {
      // update email...
      const newEmail = await connection("users")
        .select("id")
        .where({ email: model.email })
        .first();
      if (newEmail) {
        return {
          status: false,
          message: "Este Email já está cadastrado!",
        };
      }
    }

    if (model.password) {
      const comparePassword = await ComparePassword(
        model.password,
        updateUser.password
      );
      if (comparePassword) {
        return {
          status: false,
          message: "Sua senha deve ser diferente da antiga.",
        };
      }

      const updatePassword = await EncryptPassword(model.password);

      model.password = updatePassword;
    }

    await connection("users")
      .update({ ...model })
      .where({ id: IdUser });

    return {
      status: true,
      message: "Usuário atualizado com sucesso!",
    };
  }
}

export default UpdateAccountUseCase;
