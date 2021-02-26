import { Entity } from './Entity';
export function printDebugInfo(
  player: Entity,
  entities: Array<Entity>,
  ctx: CanvasRenderingContext2D
) {
  let lastIndex = 0;
  for (const [index, entity] of entities.entries()) {
    printEntityLine(ctx, entity, index);
  }
  printEntityLine(ctx, player, ++lastIndex);
}

function printEntityLine(
  ctx: CanvasRenderingContext2D,
  entity: Entity,
  i: number
) {
  ctx.font = '12px Arial';
  ctx.fillText(
    `id: ${entity.collisionId} 
  velocity: ${entity.velocity?.toString()}
  currentPos: ${entity.currentPos.toString()}
  requestedSpace: ${entity.requestedPos.toString()}
  destination: ${entity.destination?.toString()}
  wads: ${entity.wadsDirections}`,
    10,
    30 * (i + 1)
  );
}
