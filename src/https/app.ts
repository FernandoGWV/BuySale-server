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
        socket.on("entrarNaSala", (productId: any) => {
          console.log("entrou na sala", productId);
          socket.join(productId);
        });
        socket.on(String("message"), (data: any) => {
          const { productId, mensagem } = data;
          console.log(
            `mensagem do cliente para o produto ${productId}`,
            mensagem
          );
          socket.broadcast.to(productId).emit("message", mensagem);
        });
      }
    );
  };

  run(port: number, cb: () => void) {
    return this.forwardServer.listen(port, cb);
  }
}

export default App;
