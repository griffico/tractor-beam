import { Entity } from '@/objects/Entity';

const upKey = 'w';
const dnKey = 's';
const ltKey = 'a';
const rtKey = 'd';

export function updateWadsDirectionsForKeyDown(
  player: Entity,
  event: KeyboardEvent
) {
  switch (event.key) {
    case upKey:
      if (player.wadsDirections.indexOf(upKey) === -1) {
        player.wadsDirections += upKey;
      }
      player.destination = null;
      break;
    case ltKey:
      if (player.wadsDirections.indexOf(ltKey) === -1) {
        player.wadsDirections += ltKey;
      }
      player.destination = null;
      break;
    case dnKey:
      if (player.wadsDirections.indexOf(dnKey) === -1) {
        player.wadsDirections += dnKey;
      }
      player.destination = null;
      break;
    case rtKey:
      if (player.wadsDirections.indexOf(rtKey) === -1) {
        player.wadsDirections += rtKey;
      }
      player.destination = null;
      break;
  }
}

export function updateWadsDirectionsForKeyUp(
  event: KeyboardEvent,
  player: Entity
) {
  switch (event.key) {
    case upKey:
      player.wadsDirections = player.wadsDirections.replace(upKey, '');
      break;
    case ltKey:
      player.wadsDirections = player.wadsDirections.replace(ltKey, '');
      break;
    case dnKey:
      player.wadsDirections = player.wadsDirections.replace(dnKey, '');
      break;
    case rtKey:
      player.wadsDirections = player.wadsDirections.replace(rtKey, '');
      break;
  }
}
