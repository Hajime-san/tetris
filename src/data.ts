import * as Fn from './function';

export const canvas = <HTMLCanvasElement> document.getElementById('canvas');
export let canvasWidth = canvas.width;
export let canvasHeight = canvas.height;

export const NUMBER = {
  ROW: 10,
  COLUMN: 16,
  a: 4,
  DOWN_KEY: 40,
  HARD_DOWN_KEY: 90,
  UP_KEY: 38,
  LEFT_KEY: 37,
  RIGHT_KEY: 39,
  ENTER_KEY: 13,
  LEFT_MOVE: -1,
  RIGHT_MOVE: 1,
  DEGREES: 90,
  QUEUE_ROW: 6,
  QUEUE_COLUMN: 8,
}

export const STRING = {
  EMPTY: 'empty',
  CURRENT: 'current',
  LEFT: 'left',
  RIGHT: 'right',
  DOWN: 'down'
}

export type field = Array<string | number>;

export interface Prop {
  BLOCKS: Array<Blocks>
}
export interface Blocks {
  number: Array<number>;
  color: string;
}

export const rgba = [
  [240, 241, 77, 1.0],
  [105, 241, 240, 1.0],
  [27, 68, 241, 1.0],
  [240, 161, 63, 1.0],
  [163, 77, 240, 1.0],
  [114, 242, 63, 1.0],
  [237, 56, 51, 1.0]
]

export const Prop: Prop = {
  BLOCKS : [
    // O-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1
      ],
      color: `rgba(${rgba[0]})`,
    },
    // I-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+(NUMBER.ROW*2),
        NUMBER.a+(NUMBER.ROW*3)],
      color: `rgba(${rgba[1]})`,
    },
    // J-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: `rgba(${rgba[2]})`,
    },
    // L-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)+1
      ],
      color: `rgba(${rgba[3]})`,
    },
    // T-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: `rgba(${rgba[4]})`,
    },
    // S-block
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)+1
      ],
      color: `rgba(${rgba[5]})`,
    },
    // Z-block
    {
      number: [
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: `rgba(${rgba[6]})`
    },
  ]
}