import { Coordinate, Entity } from './Entity';
import { convertScreenToWorld } from './ScreenConversion';
import { generateNewPositionRequest } from './generateNewPositionRequest';
import { printDebugInfo } from './printDebugInfo';
import { drawEntities } from './drawEntities';
import { calculateWadsVelocity } from './calculateWadsVelocity';
import {
  updateWadsDirectionsForKeyDown,
  updateWadsDirectionsForKeyUp
} from './UpdateWadsDirections';
import { collisionDetected } from './CollisionDetection';
import { connect, disconnect, sendName } from './StompClient';

const defaultEntities: Array<Entity> = [];
// const defaultPlayer = new Entity('mover', 1, 0, 0.75, 0.75);

export default function loop(canvas: HTMLCanvasElement) {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight * 0.8;
  let lastUpdate: number;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.onclick = onCanvasClick;

  let entities: Array<Entity> = [...defaultEntities];
  let player = new Entity('mover', 1, 0, 0.75, 0.75);
  let shouldRunGame = false;

  document.addEventListener('keydown', event => {
    updateWadsDirectionsForKeyDown(player, event);
    calculateWadsVelocity(player);
  });
  document.addEventListener('keyup', event => {
    updateWadsDirectionsForKeyUp(event, player);
    calculateWadsVelocity(player);
  });

  function gameLoop() {
    if (shouldRunGame === true) {
      update();
      lastUpdate = window.performance.now();
      redraw();
      requestAnimationFrame(gameLoop);
    }
  }

  function moveToRequestedPosition(entityToMove: Entity) {
    if (
      entityToMove.requestedPos.x === entityToMove.currentPos.x &&
      entityToMove.requestedPos.y === entityToMove.currentPos.y
    ) {
      // console.log('nothing has moved');
      return;
    }
    if (collisionDetected(entityToMove, entities)) {
      entityToMove.destination = null;
      entityToMove.velocity = null;
      entityToMove.requestedPos = new Coordinate(
        entityToMove.currentPos.x,
        entityToMove.currentPos.y
      );
    } else {
      // console.log(
      //   'changing position to' + entityToMove.requestedPos.toString()
      // );
      entityToMove.currentPos = new Coordinate(
        entityToMove.requestedPos.x,
        entityToMove.requestedPos.y
      );
      if (entityToMove === player) {
        sendName(entityToMove);
      }
    }
  }

  function update() {
    if (player.destination === player.currentPos) {
      player.velocity = null;
      player.destination = null;
      // console.log('destination and current pos are the same');
    }
    generateNewPositionRequest(player, lastUpdate);
    moveToRequestedPosition(player);
  }

  function clearCanvas() {
    const context = canvas.getContext('2d');
    context!.clearRect(0, 0, canvas.width, canvas.height);
  }

  function startGame() {
    if (shouldRunGame === false) {
      requestAnimationFrame(gameLoop);
    }

    shouldRunGame = true;
    connect((e: MessageEvent) => {
      const parsedData = JSON.parse(e.data);
      player.currentPos.x = parsedData['you']['x'];
      player.currentPos.y = parsedData['you']['y'];
      // console.log('ay ' + e.data);
      entities = [];
      for (const other of parsedData['others']) {
        entities.push(new Entity('bot', other['x'], other['y'], 0.75, 0.75));
      }
    });
  }

  function stopGame() {
    shouldRunGame = false;
    disconnect();
  }

  function resetGame() {
    stopGame();
    shouldRunGame = false;
    player = new Entity('mover', 1, 1, 0.75, 0.75);
    entities = [...defaultEntities];

    clearCanvas();
  }

  function redraw() {
    clearCanvas();

    const ctx = canvas.getContext('2d')!;
    drawEntities(player, entities, ctx);
    printDebugInfo(player, entities, ctx);
  }

  function getCursorPosition(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }

  function onCanvasClick(event: MouseEvent) {
    if (shouldRunGame) {
      const { x, y } = getCursorPosition(event);
      player.destination = convertScreenToWorld({
        screenX: x,
        screenY: y
      });
    }
  }

  return {
    currentX: player.currentPos.x,
    currentY: player.currentPos.y,
    destinationXPos: player.destination?.x,
    destinationYPos: player.destination?.y,
    canvasWidth,
    canvasHeight,
    stopGame,
    startGame,
    resetGame
  };
}
