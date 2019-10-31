import * as Data from './data';

export function fixToFirstDigit(digit: number) {
  return Number(digit.toFixed().substr(-1, 1));
}

export function filterUndef<T>(ts: (T | undefined)[]): T[] {
	return ts.filter((t: T | undefined): t is T => !!t)
}

declare global {
  interface Array<T> {
    shuffle(): Array<T>;
  }
}

export const shuffle = Symbol('shuffle');

Array.prototype.shuffle = function() {
  return this.map(a => [a, Math.random()] )
              .sort((a, b) => a[1] - b[1] )
              .map(a => a[0] );
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function translateNumberToRect(num: number,o: number) {
  let rect: Array<number>;
  if(num <= o && (o - num) <= 2 ) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  } else if (num >= o && (num - o) <= 2) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  } else if (num <= o && (o - num) >= 3 && (o - num) <= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 1];
  } else if (num >= o && (num - o) >= 3 && (num - o) <= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -1];
  } else if (num <= o && (o - num) >= 3 && (o - num) >= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 2];
  } else if (num >= o && (num - o) >= 3 && (num - o) >= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -2];

  // undefined case
  } else {
    return [0, 0];
  }
  return rect;
}

export function rotateMatrix(rect: Array<number>) {
  const radians = (Math.PI / 180) * Data.NUMBER.DEGREES,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (rect[0] - 0)) + (sin * (rect[1] - 0)),
      ny = (cos * (rect[1] - 0)) - (sin * (rect[0] - 0));
  return [Math.round(nx), Math.round(ny)];
}

export function translateRectToNum(rotateMatrix: Array<number>) {
  if(rotateMatrix[0] === 0 && rotateMatrix[1] > 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW);
  } else if(rotateMatrix[0] === 0 && rotateMatrix[1] < 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW);
  } else if(rotateMatrix[0] === 0 && rotateMatrix[1] > 0 ){
    return (rotateMatrix[1]*Data.NUMBER.ROW);
  } else if(rotateMatrix[0] > 0 && rotateMatrix[1] === 0 ){
    return rotateMatrix[0];
  } else if(rotateMatrix[0] < 0 && rotateMatrix[1] === 0 ){
    return rotateMatrix[0];
  } else if(rotateMatrix[0] > 0 && rotateMatrix[1] > 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW) + rotateMatrix[0]
  } else if(rotateMatrix[0] > 0 && rotateMatrix[1] < 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW) + rotateMatrix[0]
  } else if(rotateMatrix[0] < 0 && rotateMatrix[1] > 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW) + rotateMatrix[0]
  } else if(rotateMatrix[0] < 0 && rotateMatrix[1] < 0 ){
    return -(rotateMatrix[1]*Data.NUMBER.ROW) + rotateMatrix[0]
  } else if(rotateMatrix[0] === 0 && rotateMatrix[1] === 0 ){
    return 0;
    
  // undefined case
  } else {
    return 0;
  }
}

export const addMultipleEventListener = (element1: Element | EventTarget | null, element2: Element | null, eventNames1: string, eventNames2: string, listener: EventListener): void => {
  const target1 = element1 as EventTarget;
  const target2 = element2 as EventTarget;
  [...Array(2)].forEach(() => {
      target1.addEventListener(eventNames1, listener, false);
      target2.addEventListener(eventNames2, listener, false);
    }
  );
};