"use strict";

import { readCacheSet } from "../state/cache.js";
import ecs from "../state/ecs";
import { grid } from "../lib/canvas.js";
import createFOV from "../lib/fov.js";
import { IsInFov, IsOpaque, IsRevealed } from "../state/components.js";
import { readCache } from "../state/cache";

const inFovEntities = ecs.createQuery({
  all: [IsInFov],
});

const opaqueEntities = ecs.createQuery({
  all: [IsOpaque],
});

export const fov = (origin) => {
  const { width, height } = grid;

  const originX = origin.position.x;
  const originY = origin.position.y;

  const FOV = createFOV(
    opaqueEntities,
    width,
    height,
    originX,
    originY,
    readCache("z"),
    6
  );

  inFovEntities.get().forEach((x) => x.remove(IsInFov));

  FOV.fov.forEach((locId) => {
    const entitiesAtLoc = readCacheSet("entitiesAtLocation", locId);

    if (entitiesAtLoc) {
      entitiesAtLoc.forEach((eId) => {
        const entity = ecs.getEntity(eId);
        entity.add(IsInFov);

        if (!entity.has("IsRevealed")) {
          entity.add(IsRevealed);
        }
      });
    }
  });
};
