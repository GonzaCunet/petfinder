import { sequelize } from ".";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
