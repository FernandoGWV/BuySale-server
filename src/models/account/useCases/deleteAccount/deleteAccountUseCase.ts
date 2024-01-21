import connection from "@config/knex";

class DeleteAccountUseCase {
  async execute(IdUser: number) {
    await connection("users").delete().where({ id: IdUser });

    return {
      status: true,
      message: "Usuário Deletado com sucesso!",
    };
  }
}

export default DeleteAccountUseCase;
