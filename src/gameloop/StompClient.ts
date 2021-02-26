import { Entity } from '@/objects/Entity';

let websocket: WebSocket | null;
let connectedState = false;

function setConnected(connected: boolean) {
  connectedState = connected;
  // console.log(connectedState);
}

export function connect(onMessageReceived: (event: MessageEvent) => any) {
  if (!websocket) {
    websocket = new WebSocket('ws://localhost:8090/game');
  }
  websocket.onmessage = onMessageReceived;
  setConnected(true);
}

export function disconnect() {
  if (websocket != null) {
    websocket.close();
    websocket = null;
  }
  setConnected(false);
  console.log('Disconnected');
}

export function sendName(entity: Entity) {
  if (websocket) {
    if (websocket.readyState === 1) {
      websocket.send(JSON.stringify(entity.currentPos));
    } else {
      console.log(`waiting :(, ready state is ${websocket.readyState}`);
    }
  } else {
    console.log(entity);
  }
}
