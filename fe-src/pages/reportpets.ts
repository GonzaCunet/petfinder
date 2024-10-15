import dropzone from dropzone;
export class ReportPetsInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
      
      <header-el></header-el>
      <div class="main-mascotas">
        <h1 class="tittle-mascotas">Reportar Mascotas</h1>
        <h2 class="text">Ingresá la siguiente información para realizar el reporte de la mascota</h2>
        <form class="formulario">
        <label class="label-text" for="nombre">Nombre</label>
        <input class="input" type="text" name="nombre" />
         <div>
          <button type="button" class="foto-input">Cargar imagen</button>
        </div>
        </form>
      </div>
      `;
  }
}
customElements.define("report-page", ReportPetsInit);
