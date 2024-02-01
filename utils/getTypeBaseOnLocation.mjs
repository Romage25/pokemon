export function getTypeBaseOnLocation(screenWidth, x, y) {
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