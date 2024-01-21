import { DecodeToken } from "@services/authentication";
import { type Request, type Response, type NextFunction } from "express";

class AuthController {
  static HeaderAuth = async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    let token: string = req.headers["authorization"] as string;
    if (!token) {
      return resp.status(401).json({
        status: false,
        message: "Unauthorized token",
      });
    }

    if (token.includes("Bearer ")) {
      token.split("Bearer ").join("");
    }

    next();
  };
}

export default AuthController;
