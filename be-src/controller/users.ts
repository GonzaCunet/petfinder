import { Sequelize } from "sequelize";
import { User } from "../models/user";
import { cloudinary } from "../lib/cloudinary";

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

export async function getUsers() {
  try {
    const profiles = await User.findAll();
    return profiles;
  } catch (error) {
    throw error;
  }
}
