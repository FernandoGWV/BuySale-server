import connection from "@config/knex";

class GetProfileUserUseCase {
  async execute(idUser: number) {
    const profileUser = await connection("users")
      .select("*")
      .where({ id: idUser })
      .first();
    return {
      status: true,
      data: {
        ...profileUser,
        password: "**",
      },
    };
  }
}

export default GetProfileUserUseCase;
