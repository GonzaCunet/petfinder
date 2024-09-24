import mapslogo from "./../images/mapslogo.svg";
import menu from "../images/menu.svg";

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
                width: 375px;
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
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100vh;
                height: 100vh;
                z-index: 1;

              background-color:black;
              
              }
              .burger-div-close{
              display:none}
             `;
    header.innerHTML = `
                <img class="imagen" src=${mapslogo} alt="">
                <img class="burger-menu-img" src=${menu}alt="">
                <div class="burger-div-close">
                <a href=""> mis datos</a>
                <a href=""> mis mascotas reportadas</a>
                <a href=""> reportar mascota</a>
                </div>
            
             `;

    shadow.appendChild(header);
    shadow.appendChild(style);

    const burgerMenu = shadow.querySelector(".burger-menu-img");
    const burgerDiv = shadow.querySelector(".burger-div-close");

    burgerMenu?.addEventListener("click", () => {
      burgerDiv?.classList.replace("burger-div-close", "burger-div-open");
    });
  }
}

customElements.define("header-el", Header);
