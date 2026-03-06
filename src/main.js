import { typeChangeHandler } from "./handlers.js";

const BASEURL = "https://pokeapi.co/api/v2";
const webOptions = {
  currentType: "all",
  page: 1,
  limit: 20,
  lastPage: null,
  BASEURL,
};

window.onload = () => {
  const body = document.querySelector("body");
  typeChangeHandler(webOptions, body)({ target: { textContent: "all" } });
};
