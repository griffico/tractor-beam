export class Entity {
  collisionId: String;
  currentPos: Coordinate = new Coordinate(0, 0);
  requestedPos: Coordinate = new Coordinate(0, 0);
  destination: Coordinate | null = null;
  width: number = 0.75;
  height: number = 0.75;
  velocity: Velocity | null = null;
  nativeSpeed: number = 0.3;
  wadsDirections: string = '';

  toString() {
    return JSON.stringify(this);
  }

  constructor(
    collisionId: String = '',
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.collisionId = collisionId;
    this.currentPos.x = x;
    this.currentPos.y = y;
    this.requestedPos.x = x;
    this.requestedPos.y = y;
    this.width = width;
    this.height = height;
  }
}

export class Velocity {
  speed: number;
  angle: number;
  constructor(speed: number, angle: number) {
    this.speed = speed;
    this.angle = angle;
  }

  toString = () => {
    return `{speed: ${this.speed.toFixed(4)} 
  angle: ${this.angle.toFixed(4)}}`;
  };
}

export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{x: ${this.x.toFixed(4)}
    y: ${this.y.toFixed(4)}}`;
  }
}
