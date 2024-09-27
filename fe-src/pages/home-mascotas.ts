export class HomeMascotasInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <header-el></header-el>
    <cards-el></cards-el>
    `;
  }
}
customElements.define("home-mascotas", HomeMascotasInit);
