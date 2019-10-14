import * as Fn from './function';
import * as Data from './data';
import * as Controll from './controll';
const clonedeep = require('lodash/cloneDeep');

/**
 * Chceck movable flags
 * @return {boolean}
 */
export const Movable = {

  _flag: false,

  left : function(fieldArray: Data.field,
                currentBlock: Array<number>)
  : boolean {

    this._flag = true;

    // fixed block exsitance check
    fieldArray.forEach((v,i) => {
      if(typeof v !== 'number') {
        return;
      }
      currentBlock.forEach((w: number) => {
        if(w === (i + Data.NUMBER.RIGHT_MOVE)) {
          console.log(`${Data.STRING.LEFT} failed`);
          this._flag = false;
        }
      })
    })

    // wall check
    currentBlock.forEach((_,i: number,arr: Array<number>) => {
      if(Fn.fixToFirstDigit(arr[i]) === Fn.fixToFirstDigit(Data.NUMBER.ROW)) {
        console.log(`${Data.STRING.LEFT} walled`);
        this._flag = false;
      }
    })
    
    return this._flag;
  },

  // check right movable
  right : function(fieldArray: Data.field,
                  currentBlock: Array<number>)
  : boolean {

    this._flag = true;

    // fixed block exsitance check
    fieldArray.forEach((v,i) => {
      if(typeof v !== 'number') {
        return;
      }
      currentBlock.forEach((w: number) => {
        if(w === (i + Data.NUMBER.LEFT_MOVE)) {
          console.log(`${Data.STRING.RIGHT} failed`);
          this._flag = false;
        }
      })
    })

    // wall check
    currentBlock.forEach((_,i: number,arr: Array<number>) => {
      if(Fn.fixToFirstDigit(arr[i]) === Fn.fixToFirstDigit(Data.NUMBER.ROW + Data.NUMBER.LEFT_MOVE)) {
        console.log(`${Data.STRING.RIGHT} walled`);
        this._flag = false;
      }
    })

    return this._flag;
  },

  // check down movable
  down : function(fieldArray: Data.field,
                  currentBlock: Array<number>)
  : boolean {

    this._flag = true;

    // fixed block exsitance check
    fieldArray.forEach((v,i,arr) => {
      if(typeof v !== 'number') {
        return;
      }
      currentBlock.forEach(() => {
        if(arr[i - Data.NUMBER.ROW] === Data.STRING.CURRENT) {
          console.log(`${Data.STRING.DOWN} failed`);
          return this._flag = false;
        }
      })
    })

    // check last row
    currentBlock.forEach((v: number) => {
      const isLastRow = fieldArray.some(some => v >= fieldArray.length - Data.NUMBER.ROW);
      if(isLastRow) {
        console.log('last row');
        return this._flag = false;
      }
    })

    return this._flag;
  },

  // check rotatable
  rotate: function(fieldArray: Data.field, currentBlock: Array<number>, copyBlock: Array<number>) {
    let leftWall = true;
    let rightWall = true;

    const angle = Block.angle + Data.NUMBER.DEGREES;
    const tmpBlock = rotatedBlock(copyBlock, angle);
    currentBlock = tmpBlock;
    
    // wall check left/right
    currentBlock.forEach((v)=>{
      if(Fn.fixToFirstDigit(v) === Fn.fixToFirstDigit(Data.NUMBER.ROW)) {
        leftWall = false;
      }
      if(Fn.fixToFirstDigit(v) === Fn.fixToFirstDigit(Data.NUMBER.ROW + Data.NUMBER.LEFT_MOVE)) {
        rightWall = false;
      }
    })

    // fixed block check
    let isFilled = true;

    fieldArray.forEach((v,i)=>{
      if(typeof v !== 'number') {
        return;
      }
      currentBlock.forEach((w)=>{
        if(i === w) {
          isFilled = false;
        }
      })
    })
    
    
    if( !leftWall && !rightWall || !isFilled ) {  
      console.log('cant rotate');
      this._flag = false;
    } else {
      this._flag = true;
    }
    return this._flag;
  },

  All: function() {
    this.rotate, this.left, this.right, this.down;
  },

  pause: false,

}

interface complete {
  _flag: boolean;
  check: (fieldArray: (string | number)[]) => boolean;
  resetCheck: ()=> void;
}

// check state
export const Complete: complete = {

  _flag: false,

  check: function(fieldArray: Data.field) {

    // creat Array on each rows
    let start = 0;
    let end = Data.NUMBER.ROW;
    const oneRowArray = [...Array(Data.NUMBER.COLUMN)].map(()=>{
      let oneROW = fieldArray.slice(start,end);
      start += Data.NUMBER.ROW;
      end += Data.NUMBER.ROW;
      return oneROW;
    })
    
    // check row
    oneRowArray.forEach((v)=>{
      // skip if the row include 0
      const checkROWs = v.every(item => item !== Data.STRING.EMPTY);
      if( !checkROWs) {
        return;
      }
      console.log('complete!!!!!!');
      Controll.Update.oneRowArray = oneRowArray;
      this._flag = true;
    })
    if(!this._flag) {
      console.log('complete failed');
    }
    
    return this._flag;
  },

  resetCheck: function() {
    return this._flag = false;
  }
  
}


interface Block {
  deepCopy: Data.Prop;
  blockNumber: number;
  resetBlockNumber: () => void;
  _angle: number;
  angle: number;
  resetAngle: () => void;
  current: Array<number>;
  _current: Data.field;
}

// mutable objects
export const Block: Block = {

  deepCopy : clonedeep(Data.Prop),

  blockNumber : //5,
  Math.floor( Math.random() * Data.Prop.BLOCKS.length ),
  resetBlockNumber: function() {
    return this.blockNumber = Math.floor( Math.random() * Data.Prop.BLOCKS.length );
  },

  _angle: 0,
  get angle () { return this._angle; },
  set angle (degrees) {
    this._angle += degrees;
    if(this._angle === degrees * 4) {
      this._angle = 0;
    }
  },
  resetAngle: function() {
    this._angle = 0;
  },
  
  current: [],
  get _current () { return this._current as Array<number>; },
  set _current (fieldArray: Data.field) {
    this._current.length = 0;
    fieldArray.forEach((v, i) => {
      if (v === Data.STRING.CURRENT) {
        this._current = [...this._current, i];
      }
    });
  },
}



export const rotatedBlock = (block: Array<number>, angle: number) => {
  // position of organization point
  let center: number;
  // fix position after rotated
  let fixPosition: number;
  
  // can't rotate |+| block
  if(Block.blockNumber === 0) {
    return Block.deepCopy.BLOCKS[Block.blockNumber].number;
  }

  // bar block
  if(Block.blockNumber === 1){
    center = 1;
  }
  if(Block.blockNumber === 1 &&
    angle === 0){
    fixPosition = 0;
  } else if
    (Block.blockNumber === 1 &&
    angle === Data.NUMBER.DEGREES*3){
    fixPosition = 0;
  } else {
    fixPosition = 1;
  }

  // reverse L block
  if(Block.blockNumber === 2){
    fixPosition = 0;
  }
  if(Block.blockNumber === 2 &&
    angle === 0){
    center = 2;
  } else if
    (Block.blockNumber === 2 &&
    angle === Data.NUMBER.DEGREES) {
    center = 2;
  } else {
    center = 1;
  }

  // L block
  if(Block.blockNumber === 3){
    fixPosition = 0;
  }
  if(Block.blockNumber === 3 &&
    angle === 0){
    center = 1;
  } else if 
    (Block.blockNumber === 3 &&
    angle === Data.NUMBER.DEGREES) {
    center = 2;
  } else if
    (Block.blockNumber === 3 &&
    angle === Data.NUMBER.DEGREES*2) {
    center = 2;
  } else if
    (Block.blockNumber === 3 &&
    angle === Data.NUMBER.DEGREES*3) {
    center = 1;
  }

  // T block
  if(Block.blockNumber === 4){
    fixPosition = 0;
  }
  if(Block.blockNumber === 4 &&
     angle === 0){
    center = 0;
  } else if
    (Block.blockNumber === 4 &&
     angle === Data.NUMBER.DEGREES) {
    center = 2;
  } else if
    (Block.blockNumber === 4 &&
     angle === Data.NUMBER.DEGREES*2) {
    center = 3;
  } else if
    (Block.blockNumber === 4 &&
     angle === Data.NUMBER.DEGREES*3) {
    center = 1;
  }

  // _| block
  if(Block.blockNumber === 5){
    fixPosition = 0;
  }
  if(Block.blockNumber === 5 &&
     angle === 0){
    center = 3;
    fixPosition = -(Data.NUMBER.ROW + Data.NUMBER.RIGHT_MOVE);
  } else if
    (Block.blockNumber === 5 &&
     angle === Data.NUMBER.DEGREES) {
    center = 2;
  } else if
    (Block.blockNumber === 5 &&
     angle === Data.NUMBER.DEGREES*2) {
    center = 3;
  } else if
    (Block.blockNumber === 5 &&
     angle === Data.NUMBER.DEGREES*3) {
    center = 2;
    fixPosition = Data.NUMBER.ROW + Data.NUMBER.LEFT_MOVE;
  }

  // |_ block
  if(Block.blockNumber === 6){
    center = 2;
    fixPosition = 0;
  }
  if (Block.blockNumber === 6 &&
     angle === 0) {
    fixPosition = -(Data.NUMBER.ROW + Data.NUMBER.RIGHT_MOVE);
  }
  if (Block.blockNumber === 6 &&
     angle === Data.NUMBER.DEGREES*3) {
    fixPosition = Data.NUMBER.ROW + Data.NUMBER.LEFT_MOVE;
  }

  const rotateBlocks = block.map((v)=>{
        let num: Array<number> = Fn.translateNumberToRect(v, block[center]),
           rect = Fn.rotateMatrix(num),
           update = Fn.translateRectToNum(rect);
    return update + block[center] + fixPosition;

  }).sort((a, b) => a - b);

  return rotateBlocks;
}
