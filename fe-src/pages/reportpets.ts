import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
// if (!MAPBOX_TOKEN) {
//   throw new Error("Falta la variable de entorno MAPBOX_TOKEN");
// }
// mapboxgl.accessToken = MAPBOX_TOKEN;

export class ReportPetsInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
      
      <header-el></header-el>
      <div class="report-container">
        <h1 class="tittle-mascotas">Reportar Mascotas</h1>
        <h2 class="reportpet-text">Ingresá la siguiente información para realizar el reporte de la mascota</h2>
        <div class="imageupload-container">
            <form class="reportpets-formulario">
              <label class="label-text" for="nombre">Nombre</label>
              <input class="input" type="text" name="nombre" />
              <label class="uploadimg">Agregar foto</label>
              <img class="foto-input">
               <input name="q" type="search" />
              <button>Buscar</button>
              <div id='map' style='width: 300px; height: 200px;'></div>
            </form>
            
            
      </div>
      `;

    const imgDropzone = this.querySelector(".foto-input") as HTMLImageElement;
    let pictureFile;

    const myDropzone = new Dropzone(".foto-input", {
      url: "/falsa",
      autoProcessQueue: false,
    });

    myDropzone.on("thumbnail", function (file) {
      // usando este evento pueden acceder al dataURL directamente
      pictureFile = file.dataURL;
      imgDropzone.src = pictureFile;
    });
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXplcXVpZWw5MyIsImEiOiJja3U0aTAyc2gwaGg1MnBvNmhyemJzbDc2In0.VfvIXjWgL8_dqs1ZKlQorA";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}

customElements.define("report-page", ReportPetsInit);
