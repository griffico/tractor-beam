import { Entity } from './Entity';

export function detectCollision(
  entity: Entity,
  collisionEntity: Entity
): boolean {
  if (
    entity.requestedPos.x <
      collisionEntity.currentPos.x + collisionEntity.width &&
    entity.requestedPos.x + entity.width > collisionEntity.currentPos.x &&
    entity.requestedPos.y <
      collisionEntity.currentPos.y + collisionEntity.height &&
    entity.requestedPos.y + entity.height > collisionEntity.currentPos.y
  ) {
    return true;
  }
  return false;
}

export function collisionDetected(
  entity: Entity,
  entities: Array<Entity>
): boolean {
  for (const collisionEntity of entities) {
    if (entity.collisionId !== collisionEntity.collisionId) {
      if (detectCollision(entity, collisionEntity)) {
        // console.log(`collision detected with ${entity} and ${collisionEntity}`);
        return true;
      }
    }
  }
  return false;
}
