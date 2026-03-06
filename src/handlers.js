import {
  fetchData,
  formatResultingParam,
  formatURL,
  getPokemonData,
  types,
} from "./utils.js";
import { createCardsContainer, createNavigation } from "./dom.js";

const renderPage = (webOptions, container) => {
  const { page, limit } = webOptions;
  const threshold = (page || 1) * limit;
  container.innerHTML = "";
  container.classList.add("flex", "width-100", "height-100");

  return fetchData(webOptions).then(async (allPokemon) => {
    const pagedData = allPokemon.slice(threshold - limit, threshold);

    await getPokemonData(pagedData).then((requiredPokemon) => {
      const navBar = createNavigation(types, webOptions.currentType);
      const cardsContainer = createCardsContainer(requiredPokemon, webOptions);

      container.append(navBar, cardsContainer);
    });
  });
};

export const saveChangedPokemonData = async (webOptions) => {
  const URL = formatURL(webOptions);
  const resultingParam = formatResultingParam(webOptions.currentType);

  await fetch(URL).then(async (d) => {
    const data = await d.json();

    webOptions.lastPage = Math.round(
      data[resultingParam].length / webOptions.limit,
    );
    webOptions.resultingParams = resultingParam;
    webOptions.URL = URL;
  });
};

export const typeChangeHandler = (webOptions, body) => async (e) => {
  const type = e.target.textContent;

  if (types.includes(type)) {
    webOptions.currentType = type;
    webOptions.page = 1;
  }

  await saveChangedPokemonData(webOptions);
  return renderPage(webOptions, body).then(
    attachHandlers.bind(null, webOptions),
  );
};

const pageNavHandler = (e) => {
  const element = e.target.tagName;
  if (element === "A") {
    const navTo = e.target.textContent;
    webOptions.page = navTo === "Prev"
      ? webOptions.page - 1
      : webOptions.page + 1;
  }

  return renderPage(webOptions, body).then(
    attachHandlers.bind(null, webOptions),
  );
};

const attachHandlers = (webOptions) => {
  const navbar = document.getElementById("navbar");
  const navPagesContainer = document.querySelector("#btn-container");

  navPagesContainer.addEventListener("click", pageNavHandler);
  navbar.addEventListener("click", typeChangeHandler(webOptions, body));
};
