import Dropzone from "dropzone";
import "./components/header.ts";

function main() {
  // la url la exige la librería
  let pictureFile;
  const myDropzone = new Dropzone(".foto-input", {
    url: "/falsa",
    autoProcessQueue: false,
  });
  myDropzone.on("thumbnail", function (file) {
    pictureFile = file.dataURL;
    console.log(pictureFile);
    // usando este evento pueden acceder al dataURL directamente
  });
  const formularioEl = document.querySelector(".formulario");
  formularioEl?.addEventListener("submit", (e: any) => {
    e.preventDefault();

    const nombre = e.target["name"].value;
    const bio = e.target["bio"].value;
    // const photo = file.dataURL;
    fetch("http://localhost:3000/profile", {
      method: "POST",
      body: JSON.stringify({ name: nombre, bio: bio, photoURL: pictureFile }),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  });
}

main();
