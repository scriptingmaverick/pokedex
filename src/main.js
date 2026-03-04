import { fetchData, types } from "./utils.js";



const renderPage = () => {
  const body = document.querySelector("body");
  const pokemon = fetchData("/data/poki-data.json");
  const navBar = createNavigation(types);
  const container = createCardContainer(pokemon);

  body.append(navBar, container);

  return;
};

window.onload = renderPage;
