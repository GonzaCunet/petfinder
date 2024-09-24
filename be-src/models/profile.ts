import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/index";

export class Profile extends Model {}
Profile.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.STRING, allowNull: false },
    photoURL: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Profile" }
);
