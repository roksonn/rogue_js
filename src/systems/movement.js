"use strict";

import ecs from "../state/ecs";
import { addLog } from "../index";
import { addCacheSet, deleteCacheSet, readCacheSet } from "../state/cache.js";
import { grid } from "../lib/canvas.js";
import { Move } from "../state/components.js";

const movableEntities = ecs.createQuery({
  all: [Move],
});

const attack = (entity, target) => {
  const damage = entity.power.current - target.defense.current;
  target.fireEvent("take-damage", { amount: damage });

  if (target.health.current <= 0 && entity.description.name === "You") {
    if (damage < target.health.max / 2) {
      entity.power.current += 1;
      entity.power.max += 1;
      addLog(`Your power increases! (power: +1)`);
    }
    if (entity.defense.max < target.power.max - 1) {
      entity.defense.current += 1;
      entity.defense.max += 1;
      addLog(`Your defense increases! (defense: +1)`);
    }

    return addLog(
      `${entity.description.name} kicked a ${target.description.name} for ${damage} damage and killed it!`
    );
  } else if (target.health.current <= 0) {
    return addLog(
      `${entity.description.name} kicked a ${target.description.name} for ${damage} damage and killed it!`
    );
  }

  addLog(
    `${entity.description.name} kicked a ${target.description.name} for ${damage} damage!`
  );
};

export const movement = () => {
  movableEntities.get().forEach((entity) => {
    if (entity.has("Paralyzed")) {
      return entity.remove(Move);
    }

    let mx = entity.move.x;
    let my = entity.move.y;
    let mz = entity.move.z;

    if (entity.move.relative) {
      mx = entity.position.x + entity.move.x;
      my = entity.position.y + entity.move.y;
    }

    //check for blockers
    const blockers = [];
    // read from cache
    const entitiesAtLoc = readCacheSet(
      "entitiesAtLocation",
      `${mx},${my},${mz}`
    );

    for (const eId of entitiesAtLoc) {
      if (ecs.getEntity(eId).isBlocking) {
        blockers.push(eId);
      }
    }

    if (blockers.length) {
      blockers.forEach((eId) => {
        const target = ecs.getEntity(eId);
        if (target.has("Health") && target.has("Defense")) {
          attack(entity, target);
        } else {
          addLog(
            `${entity.description.name} bump into a ${target.description.name}`
          );
        }
      });

      entity.remove(Move);
      return;
    }

    deleteCacheSet(
      "entitiesAtLocation",
      `${entity.position.x},${entity.position.y}`,
      entity.id
    );
    addCacheSet("entitiesAtLocation", `${mx},${my}`, entity.id);

    // observe map boundaries
    mx = Math.min(grid.map.width + grid.map.x - 1, Math.max(21, mx));
    my = Math.min(grid.map.height + grid.map.y - 1, Math.max(3, my));

    entity.remove("Position");

    entity.add("Position", { x: mx, y: my, z: mz });

    entity.remove(Move);
  });
};
