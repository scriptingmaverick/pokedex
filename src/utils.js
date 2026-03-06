export const types = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "psychic",
  "poison",
  "rock",
  "steel",
  "water",
];

export const getPokemonData = (pokemon) =>
  Promise.all(pokemon.map(fetchAndParse));

export const fetchAndParse = async (x) =>
  await fetch(x.pokemon ? x.pokemon.url : x.url).then((x) => x.json()).then(({
    id,
    name,
    base_experience,
    stats: rawStats,
    sprites,
    types,
    weight,
  }) => {
    const stats = [{ name: "BASE XP", value: base_experience }];
    stats.push(...formatStats(normalizeStats(rawStats)));
    stats.push({ name: "weight", value: weight });

    const imageUrl = sprites.other["official-artwork"]["front_default"];

    return {
      id,
      name,
      imageUrl,
      stats,
      types,
    };
  });

export const fetchData = (webOptions) =>
  fetch(webOptions.URL).then((x) => x.json()).then((data) =>
    data[webOptions.resultingParams]
  );

export const formatStats = (stats) =>
  stats.map(({ stat, base_stat }) => ({
    name: stat.name,
    value: base_stat,
  }));

export const convertToTitle = (x) => x[0].toUpperCase() + x.slice(1);

export const normalizeStats = (stats) =>
  stats.filter((x) => !x.stat.name.startsWith("special"));

export const formatURL = ({ currentType, BASEURL }) =>
  currentType === "all"
    ? `${BASEURL}/pokemon?limit=300`
    : `${BASEURL}/type/${currentType}`;

export const formatResultingParam = (type) =>
  type === "all" ? "results" : "pokemon";
