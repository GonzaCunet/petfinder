import * as dotenv from "dotenv";
dotenv.config();
import { sequelize } from ".";
import { User, Auth, Pets } from "../models/models";

Pets.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
