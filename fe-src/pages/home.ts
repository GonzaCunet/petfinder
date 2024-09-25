export class HomeInit extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <header-el></header-el>
    <div class="main"></div>
    `;
  }
}

customElements.define("home-page", HomeInit);
