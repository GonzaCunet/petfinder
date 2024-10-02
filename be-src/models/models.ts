import { User } from "./user";
import { Auth } from "./auth";
import { Pets } from "./pets";

User.hasMany(Pets);
Pets.belongsTo(User);

export { Auth, User, Pets };
