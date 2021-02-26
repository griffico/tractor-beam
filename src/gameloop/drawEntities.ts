import { Entity } from '@/objects/Entity';
import { convertSizeToScreen } from '@/gameloop/ScreenConversion';

export function drawEntities(
  player: Entity,
  entities: Array<Entity>,
  ctx: CanvasRenderingContext2D,
  volume: number
) {
  for (const [i, entity] of entities.entries()) {
    drawEntity(ctx, entity, volume);
  }
  drawEntity(ctx, player, volume);
}

function drawEntity(
  ctx: CanvasRenderingContext2D,
  entity: Entity,
  volume: number
) {
  ctx.beginPath();
  const image = document.getElementById('image') as CanvasImageSource;
  ctx.drawImage(
    image,
    convertSizeToScreen(entity.currentPos.x),
    convertSizeToScreen(entity.currentPos.y),
    convertSizeToScreen(entity.width),
    convertSizeToScreen(entity.height)
  );
  ctx.lineWidth = 1 + volume * 5;
  ctx.strokeStyle = volume > 0 ? '#33DDFF' : '#000000';
  ctx.rect(
    convertSizeToScreen(entity.currentPos.x),
    convertSizeToScreen(entity.currentPos.y),
    convertSizeToScreen(entity.width),
    convertSizeToScreen(entity.height)
  );
  ctx.stroke();
}
