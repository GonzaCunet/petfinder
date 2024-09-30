export class HomeMascotasInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    
    <header-el></header-el>
    <div class="main-mascotas">
      <h1 class="tittle-mascotas">Mascotas perdidas cerca</h1>
      <cards-el></cards-el>
      <cards-el></cards-el>
      <cards-el></cards-el>
    </div>
    `;
  }
}
customElements.define("home-mascotas", HomeMascotasInit);
