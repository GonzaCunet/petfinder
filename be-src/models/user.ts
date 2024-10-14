import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/index";

export class User extends Model {}
User.init(
  {
    name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    pets: { type: DataTypes.STRING },
    user_id: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "User" }
);
