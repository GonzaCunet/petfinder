import "./dev";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { createUsers, getUsers } from "./controller/users";

const app = express();
app.use(cors());
const port = 3000;
app.use(
  express.json({
    limit: "50mb",
  })
);

app.post("/auth", async (req, res) => {
  try {
    const { name, location, email } = req.body;
    const respuesta = await createUsers(name, location, email);
    res.status(201).json(respuesta);
  } catch (error) {
    console.log(error, "error al crear el perfil");
    res.status(400).json(error);
  }
});

app.get("/profiles", async (req, res) => {
  // const profiles = await getProfiles();
  // res.json(profiles);
});

const staticDirPath = path.resolve(__dirname, "../fe-dist");

app.use(express.static(staticDirPath));

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "./index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
