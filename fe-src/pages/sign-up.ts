export class SignUpInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
      <header-el></header-el>
      <div class="main-ingresar">
          <div class="text-container">
              <h1>Registrarse</h1>
              <h3>ingresá los siguientes datos para realizar el registro</h3>
          </div>
          <form class="formulario">
          <label class="label-text" for="email">EMAIL</label>
          <input class="input" type="text" name="Email" />
          <label class="label-text" for="contraseña">CONTRASEÑA</label>
          <input class="input" type="password" name="contraseña" />
          <label class="label-text" for="contraseña">CONFIRMAR CONTRASEÑA</label>
          <input class="input" type="password" name="confirmarcontraseña" />
          </form>
          <h3>¿ya tenes una cuenta?</h3><a class="text-link" href="">inicia sesión</a>
          <div class="button-container">
              <button-el>Siguiente</button-el>
          </div>
      </div>
      
      `;
  }
}

customElements.define("signup-page", SignUpInit);
