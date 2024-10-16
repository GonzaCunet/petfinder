import Dropzone from "dropzone";
import "./mapbox.js";
import mapboxgl from "mapbox-gl";

// const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
// if (!MAPBOX_TOKEN) {
//   throw new Error("Falta la variable de entorno MAPBOX_TOKEN");
// }
// mapboxgl.accessToken = MAPBOX_TOKEN;

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZXplcXVpZWw5MyIsImEiOiJja3U0aTAyc2gwaGg1MnBvNmhyemJzbDc2In0.VfvIXjWgL8_dqs1ZKlQorA";
mapboxgl.accessToken = MAPBOX_TOKEN;
let map;
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
            </form>
            <div class="map"></div>
            
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
  }
  initMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const mapContainer = this.querySelector(".map") as HTMLElement;
    map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-58.381775, -34.603851], // Coordenadas del Obelisco en Buenos Aires long-lat
      zoom: 0, // Nivel de zoom inicial
    });
  }
}

customElements.define("report-page", ReportPetsInit);
