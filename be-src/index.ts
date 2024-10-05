import "./dev";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { createUsers, getUsers } from "./controller/users";

import { authToken, authUsers } from "./controller/auth";

const app = express();
app.use(cors());
const port = 3000;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.post("/auth", async (req, res) => {
  const { name, location, email, password } = req.body;
  try {
    const respuesta = await createUsers(name, location, email);
    const respuestaAuth = await authUsers(email, password, respuesta.get("id"));

    res.json({ respuesta, respuestaAuth });
  } catch (error) {
    console.log(error, "error al crear el perfil");
    res.status(400).json(error);
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

app.get("/users", async (req, res) => {
  const profiles = await getUsers();
  res.json(profiles);
});

const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(express.static(staticDirPath));

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "./index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
