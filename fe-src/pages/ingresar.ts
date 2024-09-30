import { Router } from "@vaadin/router";

const puerta = require("./../images/puertaimg.svg");
export class IngresarInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
    <header-el></header-el>
    <div class="main-ingresar">
        <img src=${puerta}>
        <div class="text-container">
            <h1>Iniciar Sesión</h1>
            <h3>ingresá los datos para iniciar sesión</h3>
        </div>
        <form class="formulario">
        <label class="label-text" for="email">EMAIL</label>
        <input class="input" type="text" name="Email" />
        <label class="label-text" for="contraseña">CONTRASEÑA</label>
        <input class="input" type="text" name="contraseña" />
        </form>
        <a class="text-link" href="">olvidé mi contraseña</a>
        <div class="button-container">
            <button-el>Acceder</button-el>
        </div>
    </div>
    
    `;
  }
}

customElements.define("ingresar-page", IngresarInit);
