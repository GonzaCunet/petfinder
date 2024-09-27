import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/homemascotas", component: "home-mascotas" },
  { path: "/users", component: "x-user-list" },
]);
