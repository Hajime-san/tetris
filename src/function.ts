import * as Data from './data';

export function fixToFirstDigit(num: number) {

  if (num < Data.NUMBER.ROW) return num;

  const isInt = (n: number) => +n === ~~n;
  //if (!isInt(num)) return console.log('paramater is not integer');
  const original = num;
  let isFloat = 0;

  while (num >= 1) {
    if (!isInt(num)) {
      isFloat = num;
    } else {
      isFloat = 0;
      isFloat = num;
    }
    num = num / Data.NUMBER.ROW;
  }

  return original % (Math.floor(isFloat) * Data.NUMBER.ROW);

  //return Number(num.toFixed().substr(-1, 1));
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

Array.prototype.shuffle = function () {
  return this.map(a => [a, Math.random()])
    .sort((a, b) => a[1] - b[1])
    .map(a => a[0]);
}

export function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function translateNumberToRect(num: number, o: number) {
  let rect: Array<number>;
  if (num <= o && (o - num) <= 2) {
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
  if (rotateMatrix[0] === 0 && rotateMatrix[1] > 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW);
  } else if (rotateMatrix[0] === 0 && rotateMatrix[1] < 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW);
  } else if (rotateMatrix[0] === 0 && rotateMatrix[1] > 0) {
    return (rotateMatrix[1] * Data.NUMBER.ROW);
  } else if (rotateMatrix[0] > 0 && rotateMatrix[1] === 0) {
    return rotateMatrix[0];
  } else if (rotateMatrix[0] < 0 && rotateMatrix[1] === 0) {
    return rotateMatrix[0];
  } else if (rotateMatrix[0] > 0 && rotateMatrix[1] > 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW) + rotateMatrix[0]
  } else if (rotateMatrix[0] > 0 && rotateMatrix[1] < 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW) + rotateMatrix[0]
  } else if (rotateMatrix[0] < 0 && rotateMatrix[1] > 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW) + rotateMatrix[0]
  } else if (rotateMatrix[0] < 0 && rotateMatrix[1] < 0) {
    return -(rotateMatrix[1] * Data.NUMBER.ROW) + rotateMatrix[0]
  } else if (rotateMatrix[0] === 0 && rotateMatrix[1] === 0) {
    return 0;

    // undefined case
  } else {
    return 0;
  }
}