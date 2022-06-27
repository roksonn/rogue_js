"use strict";
import {
  dead,
  deadHidden,
  wall,
  floor,
  seenWall,
  seenFloor,
  You,
  goblin,
  fireScroll,
  fireScrollHidden,
  lightningScroll,
  lightningScrollHidden,
  paralyzeScroll,
  paralyzeScrollHidden,
  healthPotion,
  healthPotionHidden,
  stairs,
  stairsHidden,
} from "../state/prefabs";
import { rectangle } from "./grid";

const pixelRatio = window.devicePixelRatio || 1;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export const grid = {
  width: 100,
  height: 36,

  map: {
    width: 79,
    height: 29,
    x: 21,
    y: 3,
  },

  messageLog: {
    width: 79,
    height: 3,
    x: 21,
    y: 0,
  },

  playerHud: {
    width: 20,
    height: 34,
    x: 0,
    y: 0,
  },

  infoBar: {
    width: 79,
    height: 3,
    x: 21,
    y: 32,
  },

  inventory: {
    width: 37,
    height: 28,
    x: 21,
    y: 4,
  },

  menu: {
    width: 100,
    height: 1,
    x: 0,
    y: 33,
  },
};

const lineHeight = 1.2;

let calculatedFontSize = window.innerWidth / grid.width;
let cellWidth = calculatedFontSize * pixelRatio;
let cellHeight = calculatedFontSize * lineHeight * pixelRatio;
let fontSize = calculatedFontSize * pixelRatio;

canvas.style.cssText = `width: ${calculatedFontSize * grid.width}; height: ${
  calculatedFontSize * lineHeight * grid.height
}`;
canvas.width = cellWidth * grid.width;
canvas.height = cellHeight * grid.height;

ctx.font = `normal ${fontSize}px 'Press Start 2P'`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";

export const drawChar = ({ char, color, position }) => {
  ctx.fillStyle = color;
  ctx.fillText(
    char,
    position.x * cellWidth + cellWidth / 2,
    position.y * cellHeight + cellHeight / 2
  );
};

export const drawCharImage = ({ char, position }) => {
  ctx.drawImage(
    char,
    position.x * cellWidth,
    position.y * cellHeight,
    cellWidth,
    cellHeight
  );
};

export const clearCanvas = (x, y, w, h) => {
  const posX = x * cellWidth;
  const posY = y * cellHeight;

  const width = cellWidth * w;
  const height = cellHeight * h;

  ctx.clearRect(posX, posY, width, height);
};
const drawBackground = ({ color, position }) => {
  if (color === "transparent") return;

  ctx.fillStyle = color;

  ctx.fillRect(
    position.x * cellWidth,
    position.y * cellHeight,
    cellWidth,
    cellHeight
  );
};

export const drawCell = (entity, options = {}) => {
  const char = options.char || entity.appearance.char;
  const background = options.background || entity.appearance.background;
  const color = options.color || entity.appearance.color;
  const position = entity.position;

  drawBackground({ color: background, position });
  drawChar({ char, color, position });
};

export const drawCellImage = (entity) => {
  let char;
  let position;
  switch (entity.description.name) {
    case "wall":
      if (entity.visible) char = wall;
      else char = seenWall;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "floor":
      if (entity.visible) char = floor;
      else char = seenFloor;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "set of stairs leading up":
      if (entity.visible) char = stairs;
      else char = stairsHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "set of stairs leading down":
      if (entity.visible) char = stairs;
      else char = stairsHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "You":
      if (!entity.IsDead) {
        char = You;
        position = entity.position;
        drawCharImage({ char, position });
      } else {
        char = dead;
        position = entity.position;
        drawCharImage({ char, position });
      }
      break;

    case "goblin":
      if (!entity.IsDead) {
        if (entity.visible) char = goblin;
        else char = floor;
        position = entity.position;
        drawCharImage({ char, position });
      } else {
        if (entity.visible) {
          char = dead;
          position = entity.position;
          drawCharImage({ char, position });
        } else {
          char = deadHidden;
          position = entity.position;
          drawCharImage({ char, position });
        }
      }
      break;

    case "health potion":
      if (entity.visible) char = healthPotion;
      else char = healthPotionHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "scroll of lightning":
      if (entity.visible) char = lightningScroll;
      else char = lightningScrollHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "scroll of fireball":
      if (entity.visible) char = fireScroll;
      else char = fireScrollHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;

    case "scroll of paralyze":
      if (entity.visible) char = paralyzeScroll;
      else char = paralyzeScrollHidden;
      position = entity.position;
      drawCharImage({ char, position });
      break;
  }
};

export const pxToCell = (ev) => {
  const bounds = canvas.getBoundingClientRect();
  const relativeX = ev.clientX - bounds.left;
  const relativeY = ev.clientY - bounds.top;
  const colPos = Math.trunc((relativeX / cellWidth) * pixelRatio);
  const rowPos = Math.trunc((relativeY / cellHeight) * pixelRatio);

  return [colPos, rowPos];
};

export const drawText = (template) => {
  const textToRender = template.text;

  textToRender.split("").forEach((char, index) => {
    const options = { ...template };
    const character = {
      appearance: {
        char,
        background: options.background,
        color: options.color,
      },
      position: {
        x: index + options.x,
        y: options.y,
      },
    };

    delete options.x;
    delete options.y;

    drawCell(character, options);
  });
};

export const drawRect = (x, y, width, height, color) => {
  const rect = rectangle({ x, y, width, height });

  Object.values(rect.tiles).forEach((position) => {
    drawBackground({ color, position });
  });
};
