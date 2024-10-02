import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/homemascotas", component: "home-mascotas" },
  { path: "/ingresar", component: "ingresar-page" },
  { path: "/signup", component: "signup-page" },
]);
