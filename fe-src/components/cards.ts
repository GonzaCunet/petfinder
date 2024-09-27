export class CardsInit extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const cardsEl = document.createElement("div");
    cardsEl.className = "root";
    style.innerHTML = `
    .root{
        Width:335px;
        Height:234px;
        background-color: rgba(38, 48, 46, 1);
        border-line:solid;
        border-radius: 5px;
  }`;

    cardsEl.innerHTML = `
    <div class="img-container"><img src=""></div>
    <div class="textandbuttoncontainer">
        <div class="textcont"><h1>Bobby</h1> <h2>Nuniez, buenos aires</h2></div>
    </div>`;
    shadow.appendChild(cardsEl);
    shadow.appendChild(style);
  }
}
customElements.define("cards-el", CardsInit);
