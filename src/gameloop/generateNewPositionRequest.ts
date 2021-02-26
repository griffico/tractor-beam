import { Coordinate, Entity } from './Entity';

export function generateNewPositionRequest(entity: Entity, lastUpdate: number) {
  if (entity.destination) {
    if (
      entity.currentPos.x === entity.destination.x &&
      entity.currentPos.y === entity.currentPos.y
    ) {
      entity.velocity = null;
      entity.destination = null;
      entity.requestedPos = entity.currentPos;
      return;
    }

    let angle = Math.atan2(
      entity.destination.y - entity.currentPos.y,
      entity.destination.x - entity.currentPos.x
    );

    let distanceToTravel =
      entity.nativeSpeed / (window.performance.now() - lastUpdate);
    const deltaX = distanceToTravel * Math.cos(angle);
    const deltaY = distanceToTravel * Math.sin(angle);

    entity.requestedPos = new Coordinate(
      entity.currentPos.x + deltaX,
      entity.currentPos.y + deltaY
    );

    if (Math.abs(entity.destination.x - entity.currentPos.x) < 0.02) {
      entity.requestedPos.x = entity.destination.x;
    }
    if (Math.abs(entity.destination.y - entity.currentPos.y) < 0.02) {
      entity.requestedPos.y = entity.destination.y;
    }
    // console.log(`setting requested to ${entity.requestedPos}`);
  } else if (entity.velocity) {
    let distanceToTravel =
      entity.nativeSpeed / (window.performance.now() - lastUpdate);
    const deltaX = distanceToTravel * Math.cos(entity.velocity.angle);
    const deltaY = distanceToTravel * Math.sin(entity.velocity.angle);

    entity.requestedPos = new Coordinate(
      entity.currentPos.x + deltaX,
      entity.currentPos.y + deltaY
    );
  }
}
