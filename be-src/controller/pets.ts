import { Sequelize } from "sequelize";
import { cloudinary } from "../lib/cloudinary";
import { User, Auth, Pets } from "./../models/models";

export async function createPets(
  name: string,
  lastLocation: string,
  photoURL: string,
  lat,
  lng,
  UserId
) {
  try {
    const pets = await Pets.create({
      name,
      lastLocation,
      photoURL,
      status: true,
      lat,
      lng,
      UserId,
    });
    return pets;
  } catch (error) {
    console.log(error);
    if (!error.message) {
      throw new Error("cannot create pets");
    }
    throw error.message;
  }
}

export async function cloudinaryPhotoUpload(photoURL) {
  if (photoURL) {
    const imagen = await cloudinary.uploader.upload(photoURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    return imagen.secure_url;
  }
}
