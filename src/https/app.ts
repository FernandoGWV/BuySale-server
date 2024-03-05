import { errors } from "celebrate";
import express from "express";
import http from "http";
import AppRoutes from "./routes";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class App {
  private application: express.Application;
  private forwardServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private io: Server;

  constructor() {
    this.application = express();
    this.config();
    this.loadRoutes();
    this.forwardServer = http.createServer(this.application);
    this.io = new Server(this.forwardServer, {
      cors: {
        origin: "*",
      },
    });
    this.listenSocket();
  }

  config(): void {
    this.application.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
  listenSocket = () => {
    this.io.on(
      "connection",
      (
        socket: Socket<
          DefaultEventsMap,
          DefaultEventsMap,
          DefaultEventsMap,
          any
        >
      ) => {
        console.log("user connect =>", socket.id);
        socket.on("message", (message: any) => {
          socket.broadcast.emit("message", message);
        });
      }
    );
  };

  run(port: number, cb: () => void) {
    return this.forwardServer.listen(port, cb);
  }
}

export default App;
