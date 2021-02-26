/* eslint-disable prettier/prettier */
import { Coordinate, Entity } from '@/objects/Entity';
import { convertScreenToWorld } from '@/gameloop/ScreenConversion.ts';
import { generateNewPositionRequest } from '@/gameloop/generateNewPositionRequest';
import { printDebugInfo } from '@/gameloop/printDebugInfo';
import { drawEntities } from '@/gameloop/drawEntities';
import { calculateWadsVelocity } from '@/gameloop/calculateWadsVelocity';
import {
  updateWadsDirectionsForKeyDown,
  updateWadsDirectionsForKeyUp
} from '@/gameloop/UpdateWadsDirections';
import { collisionDetected } from '@/gameloop/CollisionDetection';
import { connect, disconnect, sendName } from './StompClient';
import doTheConnectyThing from './webrtc/script';

const defaultEntities: Array<Entity> = [];
// const defaultPlayer = new Entity('mover', 1, 0, 0.75, 0.75);

export default function loop(canvas: HTMLCanvasElement, video1: any) {
  const canvasWidth = window.innerWidth * 0.7;
  const canvasHeight = window.innerHeight * 0.5;
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
    var audio = new Audio(
      'https://storage.labs.ford.com/minio/download/flabs-soundboard/hello.mp3?token='
    );
    audio.play();
    if (shouldRunGame === false) {
      requestAnimationFrame(gameLoop);
    }
    shouldRunGame = true;

    doTheConnectyThing();
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
    let volume = 1;
    if (entities.length == 1) {
      const player1X = entities[0].currentPos.x;
      const player1Y = entities[0].currentPos.y;
      const player2X = player.currentPos.x;
      const player2Y = player.currentPos.y;

      const distance = Math.sqrt(
        Math.pow(player1X - player2X, 2) + Math.pow(player1Y - player2Y, 2)
      );

      // let newVolume = distance >= 1 ? 0 : 1
      volume = distance >= 2 ? 0 : distance / 2;
      let oldVolume = (document.getElementById(
        'remote-video'
      ) as HTMLVideoElement).volume;

      if (volume > 0 && oldVolume === 0) {
        console.log(`distance: ${distance}, newvolume: ${volume}`);
        var audio = new Audio(
          'https://storage.labs.ford.com/minio/download/flabs-soundboard/hello.mp3?token='
        ); //https://storage.labs.ford.com/minio/download/flabs-soundboard/hello.mp3
        audio.play();
      }
      // console.log(distance)

      (document.getElementById(
        'remote-video'
      ) as HTMLVideoElement).volume = volume;
      // if(video1){
      //   video1.volume = volume;
      //   // console.log("wha!!")
      // }
    }

    const ctx = canvas.getContext('2d')!;
    drawEntities(player, entities, ctx, volume);
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
