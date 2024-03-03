import "reflect-metadata";
import "dotenv/config";
import App from "./https/app";
import env from "@config/convict";

const app = new App();

app.run(env.get("application.port"), () => {
  const port = env.get("application.port");
  console.log(`connection 127.0.0.1:${port}`);
});
