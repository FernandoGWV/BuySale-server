import convict from "convict";

const env = convict({
  application: {
    port: {
      format: "port",
      default: 5000,
      env: "PORT",
    },
    jwt: {
      format: "*",
      default: "",
      env: "JWT",
    },
  },
  database: {
    user: {
      format: "*",
      default: "",
      env: "DB_USER",
    },
    pass: {
      format: "*",
      default: "",
      env: "DB_PASS",
    },
    database: {
      format: "*",
      default: "",
      env: "DB",
    },
    port: {
      format: "port",
      default: 3306,
      env: "DB_PORT",
    },
    host: {
      format: "*",
      default: "",
      env: "DB_HOST",
    },
  },
});

export default env;
