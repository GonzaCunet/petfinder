import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/index";
export class Pets extends Model {}
Pets.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    lastlocation: { type: DataTypes.STRING, allowNull: false },
    photoUrl: { type: DataTypes.STRING, allowNull: false },
    petState: { type: DataTypes.BOOLEAN, allowNull: false },
    lastLat: { type: DataTypes.STRING, allowNull: false },
    lastLng: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Pets" }
);
