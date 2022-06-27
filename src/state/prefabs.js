"use strict";

import walls from "../../sprites/custom_assets/zid_vizibil.png";
import wallHidden from "../../sprites/custom_assets/zid_ascuns.png";
import floors from "../../sprites/custom_assets/podea_vizibila.png";
import floorHidden from "../../sprites/custom_assets/podea_ascunsa.png";

import player from "../../sprites/custom_assets/player.png";
import greenEnemy from "../../sprites/custom_assets/greenEnemy.png";

import fireSpell from "../../sprites/custom_assets/fireSpell.png";
import fireSpellHidden from "../../sprites/custom_assets/fireSpellHidden.png";

import lightningSpell from "../../sprites/custom_assets/lightningSpell.png";
import lightningSpellHidden from "../../sprites/custom_assets/lightningSpellHidden.png";

import paralyzeSpell from "../../sprites/custom_assets/paralyzeSpell.png";
import paralyzeSpellHidden from "../../sprites/custom_assets/paralyzeSpellHidden.png";

import healthBottle from "../../sprites/custom_assets/healthBottle.png";
import healthBottleHidden from "../../sprites/custom_assets/healthBottleHidden.png";

import stairsImg from "../../sprites/custom_assets/stairs.png";
import stairsImgHidden from "../../sprites/custom_assets/stairsHidden.png";

import skullImg from "../../sprites/custom_assets/skull.png";
import skullHidden from "../../sprites/custom_assets/skullHidden.png";

export const wall = new Image();
wall.src = walls;
export const seenWall = new Image();
seenWall.src = wallHidden;

export const floor = new Image();
floor.src = floors;
export const seenFloor = new Image();
seenFloor.src = floorHidden;

export const stairs = new Image();
stairs.src = stairsImg;
export const stairsHidden = new Image();
stairsHidden.src = stairsImgHidden;

export const You = new Image();
You.src = player;
export const goblin = new Image();
goblin.src = greenEnemy;

export const fireScroll = new Image();
fireScroll.src = fireSpell;
export const fireScrollHidden = new Image();
fireScrollHidden.src = fireSpellHidden;

export const lightningScroll = new Image();
lightningScroll.src = lightningSpell;
export const lightningScrollHidden = new Image();
lightningScrollHidden.src = lightningSpellHidden;

export const paralyzeScroll = new Image();
paralyzeScroll.src = paralyzeSpell;
export const paralyzeScrollHidden = new Image();
paralyzeScrollHidden.src = paralyzeSpellHidden;

export const healthPotion = new Image();
healthPotion.src = healthBottle;
export const healthPotionHidden = new Image();
healthPotionHidden.src = healthBottleHidden;

export const dead = new Image();
dead.src = skullImg;
export const deadHidden = new Image();
deadHidden.src = skullHidden;

// Base
export const Tile = {
  name: "Tile",
  components: [
    { type: "Appearance" },
    { type: "Description" },
    { type: "Layer100" },
  ],
};

export const Being = {
  name: "Being",
  components: [
    { type: "Appearance" },
    { type: "Defense" },
    { type: "Description" },
    { type: "Health" },
    { type: "IsBlocking" },
    { type: "Layer400" },
    { type: "Power" },
  ],
};

export const Item = {
  name: "Item",
  components: [
    { type: "Appearance" },
    { type: "Description" },
    { type: "Layer300" },
    { type: "IsPickup" },
  ],
};

// Complex
export const Wall = {
  name: "Wall",
  inherit: ["Tile"],
  components: [
    { type: "IsBlocking" },
    { type: "IsOpaque" },
    {
      type: "Appearance",
      properties: { char: "#", color: "#AAA" },
    },
    {
      type: "Description",
      properties: { name: "wall" },
    },
  ],
};

export const Floor = {
  name: "Floor",
  inherit: ["Tile"],
  components: [
    {
      type: "Appearance",
      properties: { char: "•", color: "#555" },
    },
    {
      type: "Description",
      properties: { name: "floor" },
    },
  ],
};

export const Player = {
  name: "Player",
  inherit: ["Being"],
  components: [
    {
      type: "Appearance",
      properties: { char: "@", color: "#FFF" },
    },
    {
      type: "Description",
      properties: { name: "You" },
    },
    { type: "Health", properties: { current: 15, max: 15 } },
    { type: "Inventory" },
  ],
};

export const Goblin = {
  name: "Goblin",
  inherit: ["Being"],
  components: [
    { type: "Ai" },
    {
      type: "Appearance",
      properties: { char: "g", color: "green" },
    },
    {
      type: "Description",
      properties: { name: "goblin" },
    },
  ],
};

export const HealthPotion = {
  name: "HealthPotion",
  inherit: ["Item"],
  components: [
    {
      type: "Appearance",
      properties: { char: "!", color: "#FF0000" },
    },
    {
      type: "Description",
      properties: { name: "health potion" },
    },
    {
      type: "Effects",
      properties: {
        component: "health",
        delta: 5,
        animate: { color: "#ff0000", char: "♥" },
      },
    },
  ],
};

export const ScrollLightning = {
  name: "ScrollLightning",
  inherit: ["Item"],
  components: [
    {
      type: "Appearance",
      properties: { char: "/", color: "#DAA520" },
    },
    {
      type: "Description",
      properties: { name: "scroll of lightning" },
    },
    {
      type: "Effects",
      properties: {
        animate: { color: "#F7FF00" },
        events: [
          {
            name: "take-damage",
            args: { amount: 25 },
          },
        ],
      },
    },
    { type: "RequiresTarget", properties: { acquired: "RANDOM" } },
  ],
};

export const ScrollParalyze = {
  name: "ScrollParalyze",
  inherit: ["Item"],
  components: [
    {
      type: "Appearance",
      properties: { char: ":", color: "#DAA520" },
    },
    {
      type: "Description",
      properties: { name: "scroll of paralyze" },
    },
    {
      type: "Effects",
      properties: {
        animate: { color: "#FFB0B0" },
        addComponents: [
          {
            name: "Paralyzed",
            properties: {},
          },
        ],
        duration: 10,
      },
    },
    { type: "RequiresTarget", properties: { acquired: "MANUAL" } },
  ],
};

export const ScrollFireball = {
  name: "ScrollFireball",
  inherit: ["Item"],
  components: [
    {
      type: "Appearance",
      properties: { char: "*", color: "#DAA520" },
    },
    {
      type: "Description",
      properties: { name: "scroll of fireball" },
    },
    {
      type: "Effects",
      properties: {
        animate: { color: "#FFA200", char: "^" },
        events: [
          {
            name: "take-damage",
            args: { amount: 25 },
          },
        ],
      },
    },
    {
      type: "RequiresTarget",
      properties: {
        acquired: "MANUAL",
        aoeRange: 1,
      },
    },
  ],
};

export const StairsUp = {
  name: "StairsUp",
  inherit: ["Tile"],
  components: [
    {
      type: "Appearance",
      properties: { char: "<", color: "#AAA" },
    },
    {
      type: "Description",
      properties: { name: "set of stairs leading up" },
    },
  ],
};

export const StairsDown = {
  name: "StairsDown",
  inherit: ["Tile"],
  components: [
    {
      type: "Appearance",
      properties: { char: ">", color: "#AAA" },
    },
    {
      type: "Description",
      properties: { name: "set of stairs leading down" },
    },
  ],
};
