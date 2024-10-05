import { Sequelize } from "sequelize";
import * as jwt from "jsonWebToken";
import * as crypto from "crypto";
import { cloudinary } from "../lib/cloudinary";
import { User, Auth, Pets } from "./../models/models";
const secret = process.env.SECRET;

export async function hashPassword(text: string) {
  return crypto.createHash("sha256").update(JSON.stringify(text)).digest("hex");
}

export async function authUsers(email, password, user_id) {
  const passwordHasheado = await hashPassword(password);
  try {
    let auth = await Auth.create({
      email,
      user_id,
      password: passwordHasheado,
    });

    return auth;
  } catch (error) {
    throw error;
  }
}
export async function authToken(email, password) {
  const passwordHasheado = await hashPassword(password);
  try {
    const userAuth = await Auth.findOne({
      where: { email, password: passwordHasheado },
    });
    if (userAuth) {
      const token = jwt.sign({ id: userAuth.get("user_id") }, secret);
      return token;
    }
    if (!userAuth) {
      throw new Error("Email o contraseña inválida");
    }
  } catch (error) {
    throw error;
  }
}

export async function authMiddleware() {}
