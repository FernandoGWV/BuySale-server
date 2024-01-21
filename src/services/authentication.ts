import env from "@config/convict";
import IAccount from "../models/account/dto/IAccount";
import Jwt from "jsonwebtoken";

export const SignInUSer = async (payLoad: Partial<IAccount>) => {
  const security = Buffer.from(env.get("application.jwt")).toString("base64");
  const result = await Jwt.sign(payLoad, security);
  return result;
};

export const DecodeToken = async (
  token: string
): Promise<Partial<IAccount> | false> => {
  try {
    const security = Buffer.from(env.get("application.jwt")).toString("base64");
    const decoded = await Jwt.verify(token, security);
    return decoded as Partial<IAccount>;
  } catch {
    return false;
  }
};
