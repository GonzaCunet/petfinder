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

export async function createUsers(name: string, id) {
  try {
    const user = await User.create({ name, AuthId: id });
    return user;
  } catch (error) {
    console.log(error);
    if (!error.message) {
      throw new Error("cannot create user");
    }
    throw error.message;
  }
}

export async function getUserByPk(user_id) {
  try {
    const profiles = await User.findByPk(user_id);
    return profiles;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

export async function hashPassword(text: string) {
  return crypto.createHash("sha256").update(JSON.stringify(text)).digest("hex");
}
