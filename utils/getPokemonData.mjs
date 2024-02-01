export async function getPokemonData(pokemonName, abortController) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
      signal: abortController.signal,
    });
    const data = await response.json();
    const {
      name,
      height,
      base_experience,
      id,
      sprites: { front_default: pokemonImageUrl },
    } = data;

    return { name, height, base_experience, id, pokemonImageUrl };
  } catch (error) {
    if (error.name === "AbortError") {
      // console.log('Request aborted');
    } else {
      console.error("Error:", error.message);
    }

    return false;
  }
}