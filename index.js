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

console.log(screenWidth);

let x = 0;
let y = 0;

let abortController = new AbortController();

document.addEventListener("keydown", run);

document.addEventListener("resize", () => {
  screenWidth = window.screen.width;
})

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

  const moveWidth = screenWidth < 600 ? 10 : 30;

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

  if (screenWidth < 601) {
    if (x > 230) {
      x = 0;
    }
    if (x < 0) {
      x = 230;
    }
    if (y > 350) {
      y = 0;
    }
    if (y < 0) {
      y = 350;
    }
  } else {
    if (x > 870) {
      x = 0;
    }
    if (x < 0) {
      x = 870;
    }
    if (y > 540) {
      y = 0;
    }
    if (y < 0) {
      y = 540;
    }
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
  const direction = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const randomDirection = Math.floor(Math.random() * direction.length);
  move(randomDirection);
});
