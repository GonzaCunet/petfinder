const mapslogo = require("./../images/mapslogo.svg");
const menu = require("./../images/menu.svg");

class Header extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const header = document.createElement("div");
    const style = document.createElement("style");

    header.className = "header-el";
    style.innerHTML = `      
             .header-el {
                margin:0 auto;
                background-color: #26302E;
                height: 60px;
                display:flex;
                flex-direction:row;
                justify-content: space-between;
                align-items:center;
                padding:0 10px;
             }

              .imagen{
              width:30px;
              height:30px;}

              .burger-menu-img{
              width:30px;
              height:30px;}

              .burger-div-open{
                margin:0 auto;
                position: absolute;
                background-color: black;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 30px;
              
              }
              .burger-div-close{
              display:none
              }

              .burger-text{
              font-size: 24px;
              line-height: 36px;
              color:white;
              text-decoration: none;
              }
             `;
    header.innerHTML = `
                <img class="imagen" src=${mapslogo} alt="">
                <img class="burger-menu-img" src=${menu}alt="">
                <div class="burger-div-close">
                  <img class="burger-close" src=${menu}alt="">
                  <a class="burger-text" href=""> mis datos</a>
                  <a class="burger-text" href=""> mis mascotas reportadas</a>
                  <a class="burger-text" href=""> reportar mascota</a>
                </div>
            
             `;

    shadow.appendChild(header);
    shadow.appendChild(style);

    const burgerMenu = shadow.querySelector(".burger-menu-img");
    const burgerDiv = shadow.querySelector(".burger-div-close");
    const burgerclose = shadow.querySelector(".burger-close");

    burgerclose?.addEventListener("click", () => {
      burgerDiv?.classList.replace("burger-div-open", "burger-div-close");
    });
    burgerMenu?.addEventListener("click", () => {
      burgerDiv?.classList.replace("burger-div-close", "burger-div-open");
    });
  }
}

customElements.define("header-el", Header);
