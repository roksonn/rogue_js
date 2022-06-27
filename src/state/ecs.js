"use strict";

import { Engine } from "geotic";
import {
  Ai,
  Appearance,
  Description,
  Move,
  Position,
  IsBlocking,
  IsInFov,
  IsOpaque,
  IsRevealed,
  Layer100,
  Layer300,
  Layer400,
  Defense,
  Health,
  Power,
  IsDead,
  IsPickup,
  Inventory,
  ActiveEffects,
  Effects,
  Animate,
  RequiresTarget,
  Target,
  TargetingItem,
  Paralyzed,
} from "./components.js";

import {
  Being,
  Tile,
  Goblin,
  Player,
  Wall,
  Floor,
  Item,
  HealthPotion,
  ScrollLightning,
  ScrollParalyze,
  ScrollFireball,
  StairsUp,
  StairsDown,
} from "./prefabs";

const ecs = new Engine();

// all Components must be `registered` by the engine
ecs.registerComponent(ActiveEffects);
ecs.registerComponent(Ai);
ecs.registerComponent(Animate);
ecs.registerComponent(Appearance);
ecs.registerComponent(Defense);
ecs.registerComponent(Description);
ecs.registerComponent(Effects);
ecs.registerComponent(Health);
ecs.registerComponent(Inventory);
ecs.registerComponent(IsBlocking);
ecs.registerComponent(IsDead);
ecs.registerComponent(IsInFov);
ecs.registerComponent(IsOpaque);
ecs.registerComponent(IsPickup);
ecs.registerComponent(IsRevealed);
ecs.registerComponent(Layer100);
ecs.registerComponent(Layer300);
ecs.registerComponent(Layer400);
ecs.registerComponent(Move);
ecs.registerComponent(Paralyzed);
ecs.registerComponent(Position);
ecs.registerComponent(Power);
ecs.registerComponent(RequiresTarget);
ecs.registerComponent(Target);
ecs.registerComponent(TargetingItem);

// register "base" prefabs first!
ecs.registerPrefab(Tile);
ecs.registerPrefab(Being);
ecs.registerPrefab(Item);
ecs.registerPrefab(HealthPotion);
ecs.registerPrefab(Wall);
ecs.registerPrefab(Floor);
ecs.registerPrefab(Goblin);
ecs.registerPrefab(Player);
ecs.registerPrefab(ScrollFireball);
ecs.registerPrefab(ScrollLightning);
ecs.registerPrefab(ScrollParalyze);
ecs.registerPrefab(StairsUp);
ecs.registerPrefab(StairsDown);

export default ecs;
