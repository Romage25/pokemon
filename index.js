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

// window.addEventListener("resize", () => {
//   screenWidth = window.screen.width;
//   console.log(screenWidth);
// });

function run(e) {
  const direction = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const { key } = e;

  if (direction.includes(key)) {
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

  const pokemonType = getTypeBaseOnLocation();
  const randomPokemon = await getRandomPokemonBaseOnType(pokemonType);

  if (randomPokemon) {
    await getPokemonData(randomPokemon);
  } else {
    noPokemon.style.display = "block";
  }

  isLoading.style.display = "none"; 
}

function getTypeBaseOnLocation() {
  if (screenWidth < 1025) {
    if (x >= 0 && x <= 40 && y >= 0 && y <= 50) {
      return "normal";
    } else if (x > 40 && x <= 90 && y >= 0 && y <= 50) {
      return "fighting";
    } else if (x > 90 && x <= 140 && y >= 0 && y <= 50) {
      return "flying";
    } else if (x > 140 && x <= 190 && y >= 0 && y <= 50) {
      return "poison";
    } else if (x > 190 && x <= 240 && y >= 0 && y <= 50) {
      return "ground";
    } else if (x > 240 && x <= 290 && y >= 0 && y <= 50) {
      return "rock";
    } else if (x >= 0 && x <= 40 && y > 50 && y <= 110) {
      return "bug";
    } else if (x > 40 && x <= 90 && y > 50 && y <= 110) {
      return "ghost";
    } else if (x > 90 && x <= 140 && y > 50 && y <= 110) {
      return "steel";
    } else if (x > 140 && x <= 190 && y > 50 && y <= 110) {
      return "fire";
    } else if (x > 190 && x <= 240 && y > 50 && y <= 110) {
      return "water";
    } else if (x > 240 && x <= 290 && y > 50 && y <= 110) {
      return "grass";
    } else if (x >= 0 && x <= 40 && y > 110 && y <= 170) {
      return "electric";
    } else if (x > 40 && x <= 90 && y > 110 && y <= 170) {
      return "psychic";
    } else if (x > 90 && x <= 140 && y > 110 && y <= 170) {
      return "ice";
    } else if (x > 140 && x <= 190 && y > 110 && y <= 170) {
      return "dragon";
    } else if (x > 190 && x <= 240 && y > 110 && y <= 170) {
      return "dark";
    } else if (x > 240 && x <= 290 && y > 110 && y <= 170) {
      return "fairy";
    } else {
      return "Error";
    }
  } else {
    if (x >= 0 && x <= 120 && y >= 0 && y <= 150) {
      return "normal";
    } else if (x > 120 && x <= 270 && y >= 0 && y <= 150) {
      return "fighting";
    } else if (x > 270 && x <= 420 && y >= 0 && y <= 150) {
      return "flying";
    } else if (x > 420 && x <= 570 && y >= 0 && y <= 150) {
      return "poison";
    } else if (x > 570 && x <= 720 && y >= 0 && y <= 150) {
      return "ground";
    } else if (x > 720 && x <= 870 && y >= 0 && y <= 150) {
      return "rock";
    } else if (x >= 0 && x <= 120 && y > 150 && y <= 330) {
      return "bug";
    } else if (x > 120 && x <= 270 && y > 150 && y <= 330) {
      return "ghost";
    } else if (x > 270 && x <= 420 && y > 150 && y <= 330) {
      return "steel";
    } else if (x > 420 && x <= 570 && y > 150 && y <= 330) {
      return "fire";
    } else if (x > 570 && x <= 720 && y > 150 && y <= 330) {
      return "water";
    } else if (x > 720 && x <= 870 && y > 150 && y <= 330) {
      return "grass";
    } else if (x >= 0 && x <= 120 && y > 330 && y <= 510) {
      return "electric";
    } else if (x > 120 && x <= 270 && y > 330 && y <= 510) {
      return "psychic";
    } else if (x > 270 && x <= 420 && y > 330 && y <= 510) {
      return "ice";
    } else if (x > 420 && x <= 570 && y > 330 && y <= 510) {
      return "dragon";
    } else if (x > 570 && x <= 720 && y > 330 && y <= 510) {
      return "dark";
    } else if (x > 720 && x <= 870 && y > 330 && y <= 510) {
      return "fairy";
    } else {
      return "Error";
    }
  }
}

async function getRandomPokemonBaseOnType(pokemonType) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
  const result = await response.json();
  const { pokemon: pokemonArr } = result;
  const numberOfPokemon = pokemonArr.length;
  const noPokemonChanceAdditionalNumber = 50; // No pokemon will be found.
  const randomNumber = Math.floor(Math.random() * numberOfPokemon) + noPokemonChanceAdditionalNumber; // result would be 0 - numberOfPokemon - 1 + noPokemonChanceAdditionalNumber
  
  if (randomNumber >= numberOfPokemon) return false;

  const { pokemon: { name: pokemonName} } = pokemonArr[randomNumber]; 

  return pokemonName;  
}

async function getPokemonData(pName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pName}`,
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
  const userDirection = Math.floor(Math.random() * direction.length);
  move(userDirection);
});
