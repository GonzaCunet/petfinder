const perroEjemplo = require("./../images/perroEjemplo.jpg/");
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
        display:flex;
        flex-direction:column;
        background-color:#26302E;
        border-line:solid;
        border-radius: 5px;
        }

    .img-container{
    padding:8px;}
    .img{
        width: 100%;
        height: auto;
        max-width:320px;
        max-Height:136px;
        object-fit: cover;
        border-radius: 5px;
    }
    .textandbuttoncontainer{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin:10px;
    }
    .textcont{
    display:flex;
    flex-direction:column;
    align-items:left;
    gap:5px;
    justify-content: space-between;
    
    }
    h1{
      margin:0;
      font-size:36px;
      color:white}
    h2{
    margin:0;
    font-size:16px;
    color:white}

    .button{
    width:120px;
    height: 40px;
    background-color:#EB6372;
    color:white;
    border-style:none;
    border-radius: 5px;
    font-size: 16px;
}
  `;

    cardsEl.innerHTML = /*html*/ `
    <div class="img-container"><img class="img"src="${perroEjemplo}"></div>
      <div class="textandbuttoncontainer">
        <div class="textcont">
          <h1>Bobby</h1> 
          <h2>Nuñez, buenos aires</h2>
        </div>
        <div class="buttoncont">
          <button class="button">reportar</button>
        </div>
    </div>`;
    shadow.appendChild(cardsEl);
    shadow.appendChild(style);
  }
}
customElements.define("cards-el", CardsInit);
