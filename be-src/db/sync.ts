import * as dotenv from "dotenv";
dotenv.config();
import { sequelize } from ".";
import { User } from "../models/user";

User.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
