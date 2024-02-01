export async function getRandomPokemonBaseOnType(pokemonType, abortController) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${pokemonType}` , {
        signal: abortController.signal,
      }
    );
    const result = await response.json();
    const { pokemon: pokemonArr } = result;
    const numberOfPokemon = pokemonArr.length;
    const noPokemonChanceAdditionalNumber = 50; // No pokemon will be found.
    const randomNumber =
      Math.floor(Math.random() * numberOfPokemon) +
      noPokemonChanceAdditionalNumber; // result would be 0 - numberOfPokemon - 1 + noPokemonChanceAdditionalNumber

    if (randomNumber >= numberOfPokemon) return false;

    const {
      pokemon: { name: pokemonName },
    } = pokemonArr[randomNumber];

    return pokemonName;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log('Request aborted');
    } else {
      console.error("Error:", error.message);
    }
    return false;
  }
}
