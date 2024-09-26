const homephoto = require("./../images/homephoto.svg");
export class HomeInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <header-el></header-el>
    <div class="main">
      <img class="imagen" src=${homephoto} alt="">
      <h1 class="tittle">Pet Finder App</h1>
      <h2 class="text">Encontra y reportá<br> mascotas perdidas<br> cerca de tu ubicación</h2>
      <button-el class="location">Dar mi ubicación actual</button-el>
      <button-el class="howWorks" color="#00A884">¿Cómo funciona Pet Finder?</button-el>
    </div>
    
    `;
    const buttonElement = document.querySelector(".location");
    // Verificamos si la geolocalización está disponible
    buttonElement?.addEventListener("click", (e) => {
      // Verificamos si la geolocalización está disponible
      if (navigator.geolocation) {
        // Pedimos la ubicación actual
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Si se obtiene la ubicación, la mostramos
            const latitude = position.coords.latitude; // Latitud
            const longitude = position.coords.longitude; // Longitud
            console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
          },
          (error) => {
            // Manejo de errores
            console.error("Error al obtener la ubicación:", error);
          }
        );
      } else {
        console.log("La geolocalización no está soportada en este navegador.");
      }
    });
  }
}

customElements.define("home-page", HomeInit);
