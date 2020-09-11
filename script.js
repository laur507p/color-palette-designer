"use strict";

window.addEventListener("load", start);

function start() {
  console.log("start");
  document
    .querySelector(".colorinput")
    .addEventListener("input", getInputColor);
}

// gets hex color that the users selects
function getInputColor() {
  const colorValue = document.querySelector(".colorinput").value;
  delegator(colorValue);
}

// delegating function
function delegator(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  setBaseColor(hex);
  calcHarmony(hsl);
  addEventListenerToAllButtons();
}

// sets everything for the base color only, is never changed
function setBaseColor(hex) {
  document.querySelector(".color3").style.backgroundColor = hex;
  document.querySelector(".color3 ~ .hex").textContent = "HEX: " + hex;

  const rgb = hexToRgb(hex);

  const displayRgb = "RGB: " + rgb.r + ", " + rgb.g + ", " + rgb.b;
  document.querySelector(".color3 ~ .rgb").textContent = displayRgb;

  const hsl = rgbToHsl(rgb);

  const h = Math.round(hsl.h);
  const s = Math.round(hsl.s);
  const l = Math.round(hsl.l);

  const displayHsl = "HSL: " + h + ", " + s + "% " + l + "%";
  document.querySelector(".color3 ~ .hsl").textContent = displayHsl;
}

// checks which harmony the user has selected
function calcHarmony(hsl) {
  const analogCheckbox = document.querySelector(".checkbox1");
  const monoCheckbox = document.querySelector(".checkbox2");
  const triadCheckbox = document.querySelector(".checkbox3");
  const complCheckbox = document.querySelector(".checkbox4");
  const compoundCheckbox = document.querySelector(".checkbox5");
  const shadesCheckbox = document.querySelector(".checkbox6");

  if (analogCheckbox.checked) {
    calcAnalogous(hsl);
  } else if (monoCheckbox.checked) {
    calcMono(hsl);
  } else if (triadCheckbox.checked) {
    caclTriad(hsl);
  } else if (complCheckbox.checked) {
    calcComplementary(hsl);
  } else if (compoundCheckbox.checked) {
    calcCompound(hsl);
  } else if (shadesCheckbox.checked) {
    calcShades(hsl);
  }
}

//Harmonies
function calcAnalogous(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = h + 90;
  const calcTwo = h + 45;
  const calcThree = h - 45;
  const calcFour = h - 90;

  colorsArr[0].h = calcOne;
  colorsArr[1].h = calcTwo;
  colorsArr[2].h = calcThree;
  colorsArr[3].h = calcFour;

  showColors(colorsArr);
}

function calcMono(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = s + 40;
  const calcTwo = s + 20;
  const calcThree = s - 20;
  const calcFour = s - 40;

  colorsArr[0].s = calcOne;
  colorsArr[1].s = calcTwo;
  colorsArr[2].s = calcThree;
  colorsArr[3].s = calcFour;

  showColors(colorsArr);
}

function caclTriad(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = h + 120;
  const calcTwo = h + 110;
  const calcThree = h + 60;
  const calcFour = h + 70;

  colorsArr[0].h = calcOne;
  colorsArr[1].h = calcTwo;
  colorsArr[2].h = calcThree;
  colorsArr[3].h = calcFour;

  showColors(colorsArr);
}

function calcComplementary(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = h + 20;
  const calcTwo = h + 10;
  const calcThree = h + 180;
  const calcFour = h + 190;

  colorsArr[0].h = calcOne;
  colorsArr[1].h = calcTwo;
  colorsArr[2].h = calcThree;
  colorsArr[3].h = calcFour;

  showColors(colorsArr);
}

function calcCompound(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = h + 90;
  const calcTwo = h + 45;
  const calcThree = h + 180;
  const calcFour = h + 190;

  colorsArr[0].h = calcOne;
  colorsArr[1].h = calcTwo;
  colorsArr[2].h = calcThree;
  colorsArr[3].h = calcFour;

  showColors(colorsArr);
}

function calcShades(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const calcOne = l + 30;
  const calcTwo = l + 15;
  const calcThree = l - 15;
  const calcFour = l - 30;

  colorsArr[0].l = calcOne;
  colorsArr[1].l = calcTwo;
  colorsArr[2].l = calcThree;
  colorsArr[3].l = calcFour;

  showColors(colorsArr);
}

// FOREACH function that displays color in boxes and displays output values, also delegating function
function showColors(array) {
  let i = 0;
  array.forEach((farve) => {
    i++;
    const h = Math.round(farve.h);
    const s = Math.round(farve.s);
    const l = Math.round(farve.l);

    const hex = hslToHex(h, s, l);
    const rgb = hslToRgb(h, s, l);

    if (i === 1) {
      document.querySelector(".colorcont1 .hsl").textContent = showHsl(h, s, l);
      document.querySelector(".color1").style.backgroundColor = hex;
      document.querySelector(".colorcont1 .rgb").textContent = showRgb(rgb);
      document.querySelector(".colorcont1 .hex").textContent = "HEX: " + hex;
    } else if (i === 2) {
      document.querySelector(".colorcont2 .hsl").textContent = showHsl(h, s, l);
      document.querySelector(".color2").style.backgroundColor = hex;
      document.querySelector(".colorcont2 .rgb").textContent = showRgb(rgb);
      document.querySelector(".colorcont2 .hex").textContent = "HEX: " + hex;
    } else if (i === 3) {
      document.querySelector(".colorcont4 .hsl").textContent = showHsl(h, s, l);
      document.querySelector(".color4").style.backgroundColor = hex;
      document.querySelector(".colorcont4 .rgb").textContent = showRgb(rgb);
      document.querySelector(".colorcont4 .hex").textContent = "HEX: " + hex;
    } else if (i === 4) {
      document.querySelector(".colorcont5 .hsl").textContent = showHsl(h, s, l);
      document.querySelector(".color5").style.backgroundColor = hex;
      document.querySelector(".colorcont5 .rgb").textContent = showRgb(rgb);
      document.querySelector(".colorcont5 .hex").textContent = "HEX: " + hex;
    }
  });
}

// adds event listeners to all selector buttons
function addEventListenerToAllButtons() {
  document.querySelectorAll(".checkbox").forEach((button) => {
    button.addEventListener("click", getInputColor);
  });
}

// makes output ready to display in textcontent
function showRgb(rgb) {
  const displayRgb = "RGB: " + rgb.r + ", " + rgb.g + ", " + rgb.b;
  return displayRgb;
}

function showHsl(h, s, l) {
  const displayHsl = "HSL: " + h + ", " + s + "% " + l + "%";
  return displayHsl;
}

// calculating functions

function hexToRgb(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);

  const r = parseInt(red, 16);
  const g = parseInt(green, 16);
  const b = parseInt(blue, 16);

  return { r, g, b };
}

function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return { h, s, l };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  g = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  b = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function hslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}
