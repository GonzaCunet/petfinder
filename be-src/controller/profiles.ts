import { Sequelize } from "sequelize";
import { Profile } from "../models/profile";
import { cloudinary } from "../lib/cloudinary";

export async function cloudinaryPhoto(updateData) {
  if (updateData.photoURL) {
    const imagen = await cloudinary.uploader.upload(updateData.photoURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    return imagen.secure_url;
  }
}

export async function createProfiles(
  name: string,
  bio: string,
  photoURL: string
) {
  try {
    const profile = await Profile.create({ name, bio, photoURL });
    return profile;
  } catch (error) {
    throw error;
  }
}

export async function getProfiles() {
  try {
    const profiles = await Profile.findAll();
    return profiles;
  } catch (error) {
    throw error;
  }
}
