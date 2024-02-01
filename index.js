import { getTypeBaseOnLocation } from "./utils/getTypeBaseOnLocation.mjs";
import { getRandomPokemonBaseOnType } from "./utils/getRandomPokemonBaseOnType.mjs";
import { getPokemonData } from "./utils/getPokemonData.mjs"

const directions = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

const player = document.getElementById("player");

const pokemonImageContainer = document.getElementById("pokemonImageContainer");
const pokemonInfoContainer = document.getElementById("pokemonInfoContainer");

const pokemonIdDiv = document.getElementById("pokemonId");
const pokemonName = document.getElementById("pokemonName");
const pokemonBaseExperience = document.getElementById("pokemonBaseExperience");
const pokemonHeight = document.getElementById("pokemonHeight");

const pokemonImage = document.getElementById("pokemonImage");

const noPokemon = document.getElementById("noPokemon");

const isLoading = document.getElementById("isLoading");

const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let screenWidth = window.screen.width;

let x = 0;
let y = 0;

let abortController = new AbortController();

document.addEventListener("keydown", run);

function run(e) {
  const { key } = e;

  if (directions.includes(key)) {
    move(key);
  }
}

async function move(key) {
  abortController.abort();

  abortController = new AbortController();

  const moveWidth = screenWidth < 1025 ? 10 : 30;

  switch (key) {
    case "ArrowRight":
      x += moveWidth;
      break;
    case "ArrowLeft":
      x -= moveWidth;
      break;
    case "ArrowUp":
      y -= moveWidth;
      break;
    case "ArrowDown":
      y += moveWidth;
      break;
  }

  if (screenWidth < 1025) {
    if (x > 290) {
      x = 0;
    }
    if (x < 0) {
      x = 290;
    }
    if (y > 170) {
      y = 0;
    }
    if (y < 0) {
      y = 170;
    }
  } else {
    if (x > 870) {
      x = 0;
    }
    if (x < 0) {
      x = 870;
    }
    if (y > 510) {
      y = 0;
    }
    if (y < 0) {
      y = 510;
    }
  }

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  isLoading.style.display = "block";
  pokemonImageContainer.style.display = "none";
  pokemonInfoContainer.style.display = "none";
  noPokemon.style.display = "none";

  const pokemonType = getTypeBaseOnLocation(screenWidth, x, y);
  const randomPokemon = await getRandomPokemonBaseOnType(pokemonType, abortController);

  if (randomPokemon) {
    const pokemonData = await getPokemonData(randomPokemon, abortController);
    if (pokemonData) {
      renderPokemon(pokemonData);
    }
  } else {
    noPokemon.style.display = "block";
  }

  isLoading.style.display = "none";
}

function renderPokemon(pokemonData) {
  const { name, id, height, base_experience, pokemonImageUrl } = pokemonData;

  const capitalizedName = name[0].toUpperCase() + name.slice(1);

  noPokemon.style.display = "none";
  pokemonImageContainer.style.display = "block";

  pokemonInfoContainer.style.display = "flex";
  pokemonInfoContainer.style.flexDirection = "column";
  pokemonInfoContainer.style.alignItems = "start";

  pokemonIdDiv.textContent = `ID: ${id}`;
  pokemonName.textContent = `Name: ${capitalizedName}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonBaseExperience.textContent = `Base Experience: ${base_experience}`;

  pokemonImage.src = pokemonImageUrl;
}

upArrow.addEventListener("click", () => {
  move("ArrowUp");
});
downArrow.addEventListener("click", () => {
  move("ArrowDown");
});
leftArrow.addEventListener("click", () => {
  move("ArrowLeft");
});
rightArrow.addEventListener("click", () => {
  move("ArrowRight");
});

document.addEventListener("DOMContentLoaded", function () {
  const randomDirection = Math.floor(Math.random() * directions.length);
  move(randomDirection);
});
