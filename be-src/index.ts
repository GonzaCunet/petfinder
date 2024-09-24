import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import {
  createProfiles,
  getProfiles,
  cloudinaryPhoto,
} from "./controller/profiles";

const app = express();
app.use(cors());
const port = 3000;
app.use(
  express.json({
    limit: "50mb",
  })
);

app.post("/profile", async (req, res) => {
  try {
    const { name, bio, photoURL } = req.body;
    const photoCloudinaryURL = await cloudinaryPhoto(req.body);
    const respuesta = await createProfiles(name, bio, photoCloudinaryURL);
    res.json(respuesta);
  } catch (error) {
    console.log(error, "error al crear el perfil");
    res.json("error al crear el perfil");
  }
});

app.get("/profiles", async (req, res) => {
  const profiles = await getProfiles();
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
