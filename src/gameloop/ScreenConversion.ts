// eslint-disable-next-line no-unused-vars
import { Coordinate } from './Entity';

export const pixelToWorldRatio = 100;

export interface ScreenCoordinate {
  screenX: number;
  screenY: number;
}

export function convertScreenToWorld(coordinate: ScreenCoordinate): Coordinate {
  return new Coordinate(
    coordinate.screenX / pixelToWorldRatio,
    coordinate.screenY / pixelToWorldRatio
  );
}

export function convertSizeToWorld(size: number): number {
  return size / pixelToWorldRatio;
}

export function convertSizeToScreen(size: number): number {
  return size * pixelToWorldRatio;
}

export function convertWorldToScreen(coordinate: Coordinate): Coordinate {
  return {
    x: coordinate.x * pixelToWorldRatio,
    y: coordinate.y * pixelToWorldRatio
  };
}
