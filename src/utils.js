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

export const getPokemons = async (offset, limit) => {
  const pokemonData = await Deno.readTextFile("./data/pokemons.json").then(
    JSON.parse,
  );

  const requiredPokes = pokemonData.slice(offset - limit, offset);

  return Promise.all(requiredPokes.map(fetchAndParse));
};

export const fetchAndParse = async (x) => {
  const {
    id,
    name,
    base_experience,
    stats: rawStats,
    sprites,
    types,
    weight,
  } = await fetchData(x?.pokemon ? x.pokemon.url : x.url);

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
};

export const fetchData = (url) => fetch(url).then((x) => x.json());

export const formatStats = (stats) =>
  stats.map(({ stat, base_stat }) => ({
    name: stat.name,
    value: base_stat,
  }));

export const convertToTitle = (x) => x[0].toUpperCase() + x.slice(1);

export const normalizeStats = (stats) =>
  stats.filter((x) => !x.stat.name.startsWith("special"));

export const writeJSON = (path, json) =>
  Deno.writeTextFile(path, JSON.stringify(json, "", 2));
