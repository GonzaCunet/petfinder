import * as dotenv from "dotenv";
dotenv.config();
import { sequelize } from ".";
import { User, Auth } from "../models/models";

User.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
