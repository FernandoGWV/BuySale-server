import { errors } from "celebrate";
import express from "express";
import http from "http";
import AppRoutes from "./routes";
import cors from "cors";


class App {
  private application: express.Application;
  private forwardServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  constructor() {
    this.application = express();
    this.config();
    this.loadRoutes();
    this.forwardServer = http.createServer(this.application);
  }

  config(): void {
    this.application.use(
      cors({
        origin: "*",
      })
    );

    this.application.use(express.json());
    this.application.use(errors());
  }

  loadRoutes(): void {
    this.application.use("/", AppRoutes);
    this.application.use(errors());
    this.application.use("/public", express.static("public"));
  }

  run(port: number, cb: () => void) {
    return this.forwardServer.listen(port, cb);
  }
}

export default App;
