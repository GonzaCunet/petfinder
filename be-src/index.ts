import "./dev";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { createUsers, getUserByPk, getUsers } from "./controller/users";

import {
  authMiddleware,
  authToken,
  authUsers,
  getAuth,
} from "./controller/auth";
import { cloudinary } from "./lib/cloudinary";
import { createPets, cloudinaryPhotoUpload } from "./controller/pets";
import { Auth } from "./models/models";

const app = express();
app.use(cors());
const port = 3000;

app.use(
  express.json({
    limit: "50mb",
  })
);

app.post("/pets", authMiddleware, async (req, res) => {
  const { name, lastLocation, photoURL, lat, lng } = req.body;
  const UserId = req._user.id;
  console.log({ req: req._user });
  try {
    const createPhoto = await cloudinaryPhotoUpload(photoURL);
    const returnpet = await createPets(
      name,
      lastLocation,
      createPhoto,
      lat,
      lng,
      UserId
    );
    res.json({ message: "mascota creada", result: returnpet });
  } catch (error) {
    console.log(error, "error al crear la mascota");
    res.status(400).json(error.message);
  }
});

app.get("/auth", async (req, res) => {
  // const userId = await User.findAll({ include: });
  const { authId } = req.body;
  const respuesta = await Auth.findAll();
  res.json({ respuesta });
});

app.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const respuestaAuth = await authUsers(email, password);
    const respuestaUser = await createUsers(
      name,
      respuestaAuth.get("id") as string
    );

    res.json({ message: "usuario creado", respuestaUser: respuestaUser });
  } catch (error) {
    console.log(error, "error al crear el perfil");
    res.status(400).json(error.message);
  }
});
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;

  try {
    const respuesta = await authToken(email, password);
    return res.status(201).json(respuesta);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/user", authMiddleware, async (req, res) => {
  const user_id = req._user.id;
  const respuesta = await getUserByPk(user_id);
  res.json(respuesta);
});

app.get("/auth", async (req, res) => {
  const users = await getAuth();
  res.json(users);
});

const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(express.static(staticDirPath));

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "./index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
