import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  autofill,
  config,
  MapboxAddressAutofill,
  MapboxSearchBox,
  MapboxGeocoder,
} from "@mapbox/search-js-web";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZXplcXVpZWw5MyIsImEiOiJja3U0aTAyc2gwaGg1MnBvNmhyemJzbDc2In0.VfvIXjWgL8_dqs1ZKlQorA";
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
                <form class="search-form">
                  <label tipoTexto="parrafo">1-Buscar por ubicación (Ciudad, Provincia)</label>
                  <input class="my-input q" name="q" type="search">
                  <button class="buscar-ubi">Buscar</button>
                  <label tipoTexto="parrafo">2-Seleccionar un punto en el mapa</label>
                  <div class="map" id='map' style='width: 300px; height: 200px;'></div>
                  <div class="contenedor-button">
                  <button class="button-reportar"><mi-texto tipoTexto="parrafo">Reportar mascota</mi-texto></button>
                  </div>
                </form>
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
    this.initMap();
    this.buscarDir();
  }

  initMap() {
    const mapContainer: any = this.querySelector(".map");
    // const currentState = state.getState();
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-58.381775, -34.603851], // Coordenadas del Obelisco en Buenos Aires long-lat
      zoom: 0,
      maxBounds: [
        [-75, -55], // Esquina suroeste de Argentina
        [-53, -20], // Esquina noreste de Argentina
      ],
    });
  }
  initSearchForm(query: string) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const [longitude, latitude] = data.features[0].center;
        const placeName = data.features[0].place_name;
        // const currentState = state.getState();
        const nameUbicacionPet = placeName.split(" ").slice(0, 4).join(" ");
        const nameUbicacion = nameUbicacionPet.split(",").join("");
        // currentState.petNameUbi = nameUbicacion;
        // state.setState(currentState);
        map.flyTo({ center: [longitude, latitude], zoom: 15 });
        map.on("click", (e) => {
          const { lng, lat } = e.lngLat;
          console.log(lng, lat);
          console.log(e);
          // currentState.petLong = lng;
          // currentState.petLat = lat;
          // state.setState(currentState);
          // Eliminar marcadores existentes (si los hay)
          if (map.getLayer("marker")) {
            map.removeLayer("marker");
            map.removeSource("marker");
          }
          // Agregar marcador en la ubicación seleccionada
          map.addSource("marker", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                  },
                },
              ],
            },
          });

          map.addLayer({
            id: "marker",
            type: "symbol",
            source: "marker",
            layout: {
              "icon-image": "marker", // Cambia esto por el icono que desees
              "icon-size": 1.5,
            },
          });
        });
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
      });
  }
  buscarDir() {
    const form = this.querySelector(".search-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLFormElement) {
        const query = e.target.q.value;
        if (query.trim() !== "") {
          this.initSearchForm(query);
        }
      }
    });
  }
}

customElements.define("report-page", ReportPetsInit);
