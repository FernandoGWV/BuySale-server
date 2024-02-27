import connection from "@config/knex";
import { SignInUSer } from "@services/authentication";
import { ComparePassword } from "@services/crypt";

class SessionCreateUseCase {
  async execute(email: string, password: string) {
    const data = await connection("users").select("*").where({ email }).first();

    if (data) {
      const hash = data.password;
      const result = await ComparePassword(password, hash);

      if (result) {
        const token = await SignInUSer({ id: data.id, name: data.name });

        return {
          status: true,
          message: "sucesso",
          token,
          id: data.id,
        };
      } else {
        return {
          status: false,
          message: "Usuario e/ou senha inválidos",
        };
      }
    }
    return {
      status: false,
      message: "Usuario e/ou senha inválidos",
    };
  }
}

export default SessionCreateUseCase;
