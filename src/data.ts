import * as Fn from './function';

export const canvas = <HTMLCanvasElement> document.getElementById('canvas');

export const NUMBER = {
  ROW: 10,
  COLUMN: 14,
  a: 4,
  DOWN_KEY: 40,
  UP_KEY: 38,
  LEFT_KEY: 37,
  RIGHT_KEY: 39,
  LEFT_MOVE: -1,
  RIGHT_MOVE: 1,
  DEGREES: 90
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

export const Prop: Prop = {
  BLOCKS : [
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1
      ],
      color: 'red',
    },
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+(NUMBER.ROW*2),
        NUMBER.a+(NUMBER.ROW*3)],
      color: 'blue',
    },
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: 'green',
    },
    {
      number: [
        NUMBER.a,
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)+1
      ],
      color: 'orange',
    },
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: 'yellow',
    },
    {
      number: [
        NUMBER.a,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)+1
      ],
      color: 'purple',
    },
    {
      number: [
        NUMBER.a+1,
        NUMBER.a+NUMBER.ROW,
        NUMBER.a+NUMBER.ROW+1,
        NUMBER.a+(NUMBER.ROW*2)
      ],
      color: 'pink',
    },
  ]
}