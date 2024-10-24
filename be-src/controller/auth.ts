import { Sequelize } from "sequelize";
import * as jwt from "jsonWebToken";
import * as crypto from "crypto";
import { cloudinary } from "../lib/cloudinary";
import { User, Auth, Pets } from "./../models/models";
const secret = process.env.SECRET;

export async function hashPassword(text: string) {
  return crypto.createHash("sha256").update(JSON.stringify(text)).digest("hex");
}

export async function authUsers(email, password) {
  const passwordHasheado = await hashPassword(password);
  try {
    let auth = await Auth.findOne({ where: { email } });
    if (auth) {
      throw new Error("este usuario ya se ha registrado salu2");
    }

    if (!auth) {
      auth = await Auth.create({ email, password: passwordHasheado });
    }
    return auth;
  } catch (error) {
    throw error;
  }
}

export async function authToken(email, password) {
  const passwordHasheado = await hashPassword(password);
  try {
    const userAuth: any = await Auth.findOne({
      where: { email, password: passwordHasheado },
      include: {
        model: User,
        attributes: ["id"],
      },
    });
    if (userAuth) {
      const userId = userAuth.User.id;
      const token = jwt.sign({ id: userId }, secret);
      return token;
    }
    if (!userAuth) {
      throw new Error("Email o contraseña inválida");
    }
  } catch (error) {
    throw error;
  }
}
export async function getAuth() {
  try {
    const users = await Auth.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, secret);
    req._user = data;
    console.log({ data });
    next();
  } catch (error) {
    res.status(401).json({ error: "token no autorizado" });
  }
}
