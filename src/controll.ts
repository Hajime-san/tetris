import * as Data from './data';
import * as Fn from './function';
import * as State from './state';
const clonedeep = require('lodash/cloneDeep');

export const Direction = {
  left: (block: Array<number>) => {
    block.forEach((_,i,arr)=>{
      arr[i] += Data.NUMBER.LEFT_MOVE;
    })
  },
  right: (block: Array<number>) => {
    block.forEach((_,i,arr)=>{
      arr[i] += Data.NUMBER.RIGHT_MOVE;
    })
  },
  down: (block: Array<number>) => {
    block.forEach((_,i,arr)=>{
      arr[i] += Data.NUMBER.ROW;
    })
  },
  rotate: (block: Array<number>) => {
    block.forEach((_,i,arr)=>{
      arr[i] += 0;
    })
  },
}

interface memoryField {
  fieldNumber: Array<number>;
  color: number;
}

interface Update {
  field: Data.field;
  initField: () => void;
  oneRowArray: Array<Array<string | number>>;
  resetOneRowArray: () => void;
  completeRowNumbers: Array<number>;
  resetCompleteRowNumbers: () => void;
  deleteRow: (fieldArray: Data.field) => void;
  dropRow: (fieldArray: Data.field) => void;
  transferToFix: (fieldArray: Data.field) => void;
  transfer: (block: Array<number>, fieldArray: Data.field) => void;
  clear: (current: Array<number>, fieldArray: Data.field) => void;
  reGenerateBlock: () => Data.Prop;
}

export const Update: Update = {

  field: [],

  initField: function() {
    return this.field = [...Array(Data.NUMBER.COLUMN * Data.NUMBER.ROW)].map(
      v => v = Data.STRING.EMPTY);
    // return this.field = [
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty',2,2,'empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty',2,3,'empty','empty','empty',1,'empty','empty',
    //     'empty','empty',2,3,'empty','empty','empty',1,'empty','empty',
    //     0,0,3,3,4,'empty','empty',1,0,0,
    //     0,0,'empty',4,4,4,'empty',1,0,0,
    //     6,6,'empty',1,1,1,1,3,3,3,
    //     'empty',6,6,1,1,1,1,'empty','empty',3
    //   ];
  },


  oneRowArray: [],
  resetOneRowArray: function() {
    this.oneRowArray = [];
  },

  completeRowNumbers: [],
  resetCompleteRowNumbers: function() {
    this.completeRowNumbers = [];
  },

  deleteRow: function(fieldArray) {
    
    if(State.Complete._flag) {
      // create arrays for deleting rows
      let completeRowArray: Array<number> = []; // should delete areas
      
      this.oneRowArray.forEach((v,i)=>{

        const checkROWs = v.every(item => item !== Data.STRING.EMPTY);
        if( !checkROWs) {
          return
        }

        this.completeRowNumbers.push(i);

        [...Array(Data.NUMBER.ROW)].forEach((_,j)=>{
          completeRowArray.push(( i * Data.NUMBER.ROW ) + j );
        })
      })
		
      // delete complete rows
      completeRowArray.forEach((v)=> fieldArray[v] = Data.STRING.EMPTY);
    }

  },

  dropRow: function(fieldArray) {
    // move blocks as the amount of deleted rows
		const lowerBlocks: [string|number,number][] = Fn.filterUndef(fieldArray.map((v,i,arr)=>{
      if (i >= this.completeRowNumbers[0] * Data.NUMBER.ROW) {
        return;
      }
      if(v !== Data.STRING.EMPTY) {
        arr[i] = Data.STRING.EMPTY;
        return [ v , i + (this.completeRowNumbers.length * Data.NUMBER.ROW)];
      }
		}));
		
    lowerBlocks.forEach((v) =>{
			const index = v[1];
			fieldArray[index] = v[0] 
    });
    
  },


  transferToFix: (fieldArray) => {
    fieldArray.forEach((v,i)=>{
      if(v === Data.STRING.CURRENT) {
        fieldArray[i] = State.Block.blockNumber;
      }
    })
  },

  transfer: (block, fieldArray) => {
    block.forEach((v) => { fieldArray[v] = Data.STRING.CURRENT });
  },

  clear: (current, fieldArray) => {
    current.forEach((v) => fieldArray[v] = Data.STRING.EMPTY );
  },

  reGenerateBlock: () => {
    return clonedeep(Data.Prop);
  }
}