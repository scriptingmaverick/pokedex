export const ELEMENTS = {
  DIV: "div",
  SPAN: "span",
  P: "p",
  H1: "h1",
  H2: "h2",
  A: "a",
  IMG: "img",
  SECTION: "section",
  MAIN: "main",
  ARTICLE: "article",
  NAV: "nav",
};

const { DIV, SPAN, P, H1, H2, A, IMG, SECTION, MAIN, ARTICLE, NAV } = ELEMENTS;

const handlePokiPage = () => {};

const createFragment = ([tag, attrbs, ...content]) => {
  const element = document.createElement(tag);
  for (const key in attrbs) {
    element.setAttribute(key, attrbs[key]);
  }

  if (content.length === 1 && typeof content[0] !== "object") {
    element.textContent = content.toString();
    return element;
  }

  element.append(...content.map(createFragment));

  return element;
};

const createTypeElements = (types) =>
  types.map(({ type }) => [SPAN, { class: type.name }, type.name]);

const createStats = (stats) =>
  stats.map((
    { name, value },
  ) => ["div", { class: "stat flex justify-between" }, [
    SPAN,
    { class: "name" },
    name,
  ], [SPAN, { class: "value" }, value]]);

const createCard = (
  pokemon,
) => [A, { class: "card", onclick: handlePokiPage(pokemon.id) }, [
  DIV,
  {
    class: "img-container width-100 flex justify-center",
  },
  [IMG, {
    src: pokemon.imageUrl,
    alt: pokemon.name,
    class: "width-80 height-100",
  }],
], [DIV, { class: "content flex flex-col" }, [
  DIV,
  {
    class: "header width-100 flex height-fit justify-between",
  },
  [DIV, { class: "name" }, pokemon.name],
  [
    DIV,
    { class: "types width-50 flex justify-end" },
    ...createTypeElements(pokemon.types),
  ],
], [
  "div",
  { class: "stats width-100 flex height-70 flex-col" },
  ...createStats(pokemon.stats),
]]];

const createCards = (allPokemon) => allPokemon.map(createCard);

const createNavBtns = ({ page, lastPage }) => {
  if (page === 1) return [[A, { class: "btn" }, "Next"]];

  if (page === lastPage) return [[A, { class: "btn" }, "Prev"]];

  return [
    [A, { class: "btn" }, "Prev"],
    [A, { class: "btn" }, "Next"],
  ];
};

const createNavForPageNav = (webOptions) => [
  NAV,
  { id: "btn-container" },
  ...createNavBtns(webOptions),
];

export const createCardsContainer = (allPokemon, webOptions) =>
  createFragment([
    MAIN,
    {
      "class": "container flex flex-wrap overflow-scroll width-80",
    },
    ...createCards(allPokemon),
    createNavForPageNav(webOptions),
  ]);

const createNavElements = (types, currentType) =>
  types.map(
    (type) => [A, {
      id: type,
      class: type === currentType ? type : "",
      style: `color: ${type === currentType ? "white" : ""}`,
    }, type],
  );

export const createNavigation = (types, currentType) =>
  createFragment([
    NAV,
    {
      class: "sidebar flex flex-col overflow-scroll",
      id: "navbar",
    },
    ...createNavElements(types, currentType),
  ]);
