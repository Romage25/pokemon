import { getTypeBaseOnLocation } from "./utils/getTypeBaseOnLocation.mjs";
import { getRandomPokemonBaseOnType } from "./utils/getRandomPokemonBaseOnType.mjs";
import { getPokemonData } from "./utils/getPokemonData.mjs";

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

const randomTerrainsPositions = [];

let screenWidth = window.screen.width;

let x = 0;
let y = 0;

let abortController = new AbortController();

document.addEventListener("keydown", run);

function loadRandomTerrains() {
  const numberOfTerrains = 15;
  const xAxisNumber = 30;
  const yAxisNumber = 18;
  let size = screenWidth < 1025 ? 10 : 30;
  const map = document.getElementById("map");

  for (let i = 0; i < numberOfTerrains; i++) {
    const randomXAxis =
      (Math.floor(Math.random() * xAxisNumber) + 1) * size - size;
    const randomYAxis =
      (Math.floor(Math.random() * yAxisNumber) + 1) * size - size;
    randomTerrainsPositions.push({ x: randomXAxis, y: randomYAxis });
  }

  randomTerrainsPositions.forEach((terrain) => {
    const newTerrain = document.createElement("div");
    newTerrain.style.width = `${size}px`;
    newTerrain.style.height = `${size}px`;
    newTerrain.style.backgroundColor = "black";
    newTerrain.style.zIndex = 2;
    newTerrain.style.position = "absolute";
    newTerrain.style.top = `${terrain.y}px`;
    newTerrain.style.left = `${terrain.x}px`;
    map.append(newTerrain);
  });
}

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
  let stop = false;

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

  randomTerrainsPositions.forEach((terrain) => {
    if (terrain.x === x && terrain.y === y) {

      //inverted the code above to revert the changes of the player's position
      switch (key) {
        case "ArrowRight":
          x -= moveWidth;
          break;
        case "ArrowLeft":
          x += moveWidth;
          break;
        case "ArrowUp":
          y += moveWidth;
          break;
        case "ArrowDown":
          y -= moveWidth;
          break;
      }
      stop = true;
    }
  });

  // Prevent move
  if (stop === true) return;

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
  const randomPokemon = await getRandomPokemonBaseOnType(
    pokemonType,
    abortController
  );

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
  loadRandomTerrains();
  move(randomDirection);
});
