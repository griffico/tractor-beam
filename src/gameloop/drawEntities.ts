import { Entity } from './Entity';
import { convertSizeToScreen } from './ScreenConversion';

export function drawEntities(
  player: Entity,
  entities: Array<Entity>,
  ctx: CanvasRenderingContext2D
) {
  //@ts-ignore
  for (const [i, entity] of entities.entries()) {
    drawEntity(ctx, entity);
  }
  drawEntity(ctx, player);
}

function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity) {
  ctx.beginPath();
  const image = document.getElementById('image') as CanvasImageSource;
  ctx.drawImage(
    image,
    convertSizeToScreen(entity.currentPos.x),
    convertSizeToScreen(entity.currentPos.y),
    convertSizeToScreen(entity.width),
    convertSizeToScreen(entity.height)
  );
  ctx.rect(
    convertSizeToScreen(entity.currentPos.x),
    convertSizeToScreen(entity.currentPos.y),
    convertSizeToScreen(entity.width),
    convertSizeToScreen(entity.height)
  );
  ctx.stroke();
}
