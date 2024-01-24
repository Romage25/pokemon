const player = document.getElementById("player");
const mapPokemon = document.getElementById("map");

const pokemonImageContainer = document.getElementById("pokemonImageContainer");
const pokemonInfoContainer = document.getElementById("pokemonInfoContainer");

const pokemonIdDiv = document.getElementById("pokemonId");
const pokemonName = document.getElementById("pokemonName");
const pokemonBaseExperience = document.getElementById("pokemonBaseExperience");
const pokemonHeight = document.getElementById("pokemonHeight");

const pokemonImage = document.getElementById("pokemonImage");

const noPokemon = document.getElementById("noPokemon");

const isLoading = document.getElementById("isLoading");

let x = 0;
let y = 0;

let abortController = new AbortController();

mapPokemon.addEventListener("keydown", run);

function run(e) {
  const direction = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const { key } = e;

  if (direction.includes(key)) {
    move(key);
  }
}

function move(key) {
  abortController.abort();

  abortController = new AbortController();

  switch (key) {
    case "ArrowRight":
      x += 30;
      break;
    case "ArrowLeft":
      x -= 30;
      break;
    case "ArrowUp":
      y -= 30;
      break;
    case "ArrowDown":
      y += 30;
      break;
  }

  if (x > 870) {
    x = 0;
  }
  if (x < 0) {
    x = 870;
  }
  if (y > 570) {
    y = 0;
  }
  if (y < 0) {
    y = 570;
  }

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  getRandomNumber();
}

async function getRandomNumber() {
  const totalNumberOfPokemon = 1025; // base on id
  const extraNumber = 2000;
  const randomNumber =
    Math.floor(Math.random() * (totalNumberOfPokemon + extraNumber)) + 1;

  isLoading.style.display = "block";
  pokemonImageContainer.style.display = "none";
  pokemonInfoContainer.style.display = "none";
  noPokemon.style.display = "none";

  if (randomNumber <= totalNumberOfPokemon) {
    await getPokemonData(randomNumber);
  } else {
    noPokemon.style.display = "block";
  }

  isLoading.style.display = "none";
}

async function getPokemonData(pokemonId) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      { signal: abortController.signal }
    );
    const data = await response.json();
    const {
      name,
      height,
      base_experience,
      id,
      sprites: { front_default: pokemonImageUrl },
    } = data;

    const capitalizedName = name[0].toUpperCase() + name.slice(1);

    noPokemon.style.display = "none";
    pokemonImageContainer.style.display = "block";

    pokemonInfoContainer.style.display = "flex";
    pokemonInfoContainer.style.flexDirection = "column";
    pokemonInfoContainer.style.alignItems = "start";
    pokemonInfoContainer.style.gap = "20px";

    pokemonIdDiv.textContent = `ID: ${id}`;
    pokemonName.textContent = `Name: ${capitalizedName}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonBaseExperience.textContent = `Base Experience: ${base_experience}`;

    pokemonImage.src = pokemonImageUrl;
  } catch (error) {
    if (error.name === "AbortError") {
      // console.log('Request aborted');
    } else {
      console.error("Error:", error.message);
    }
  }

  console.log("Hi");
}

document.addEventListener("DOMContentLoaded", function () {
  const direction = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const randomDirection = Math.floor(Math.random() * direction.length);
  move(randomDirection);
});
