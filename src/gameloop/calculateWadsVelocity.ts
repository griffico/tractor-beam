import { Entity, Velocity } from './Entity';

export function calculateWadsVelocity(entity: Entity) {
  const xDirection =
    (entity.wadsDirections.indexOf('a') >= 0 ? -1 : 0) +
    (entity.wadsDirections.indexOf('d') >= 0 ? 1 : 0);
  const yDirection =
    (entity.wadsDirections.indexOf('w') >= 0 ? -1 : 0) +
    (entity.wadsDirections.indexOf('s') >= 0 ? 1 : 0);
  if (xDirection == 0 && yDirection == 0) {
    entity.velocity = null;
  } else {
    entity.velocity = new Velocity(
      entity.nativeSpeed,
      Math.atan2(yDirection, xDirection)
    );
  }
}
