import knex from "knex";
import env from "./convict";
import { attachPaginate } from "knex-paginate";
attachPaginate();
const connection = knex({
  client: "mysql2",
  connection: {
    user: env.get("database.user"),
    database: env.get("database.database"),
    password: env.get("database.pass"),
    port: env.get("database.port"),
    host: env.get("database.host"),
  },
  debug: true,
});

export default connection;
