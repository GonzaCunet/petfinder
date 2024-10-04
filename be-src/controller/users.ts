import { Sequelize } from "sequelize";
import * as jwt from "jsonWebToken";
import * as crypto from "crypto";
import { cloudinary } from "../lib/cloudinary";
import { User, Auth, Pets } from "./../models/models";
const secret = process.env.SECRET;
// export async function cloudinaryPhoto(updateData) {
//   if (updateData.photoURL) {
//     const imagen = await cloudinary.uploader.upload(updateData.photoURL, {
//       resource_type: "image",
//       discard_original_filename: true,
//       width: 1000,
//     });
//     return imagen.secure_url;
//   }
// }

export async function createUsers(
  name: string,
  location: string,
  email: string
) {
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ name, location, email });
      return user;
    }

    if (user) {
      throw new Error("Email already exists");
    }
    return user;
  } catch (error) {
    console.log(error);
    if (!error.message) {
      throw new Error("cannot create user");
    }
    throw error.message;
  }
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
export async function getUsers() {
  try {
    const profiles = await Auth.findAll();
    return profiles;
  } catch (error) {
    throw error;
  }
}

export async function hashPassword(text: string) {
  return crypto.createHash("sha256").update(JSON.stringify(text)).digest("hex");
}
