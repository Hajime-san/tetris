import * as Data from './data';
import * as Fn from './function';
import * as State from './state';

export const Direction = {
  left: (block: Array<number>) => {
    return block.map(v => v += Data.NUMBER.LEFT_MOVE);
  },
  right: (block: Array<number>) => {
    return block.map(v => v += Data.NUMBER.RIGHT_MOVE);
  },
  down: (block: Array<number>) => {
    return block.map(v => v += Data.NUMBER.ROW);
  },
}


interface Update {
  field: Data.field;
  initField: () => void;
  queueField: Data.field;
  initQueueField: () => void;
  oneRowArray: Array<Array<string | number>>;
  resetOneRowArray: () => void;
  completeRowNumbers: Array<number>;
  resetCompleteRowNumbers: () => void;
  remainRowArray: Array<Array<string | number>>;
  resetRemainRowArray: () => void;
  remainRowNumbers: Array<number>;
  resetRemainRowNumbers: () => void;
  deleteRow: (fieldArray: Data.field) => void;
  dropRow: (fieldArray: Data.field) => void;
  transferToFix: (fieldArray: Data.field) => void;
  transfer: (block: Array<number>, fieldArray: Data.field) => void;
  clear: (current: Array<number>, fieldArray: Data.field) => void;
}

export const Update: Update = {

  field: [],

  initField: function () {
    return this.field = [...Array(Data.NUMBER.COLUMN * Data.NUMBER.ROW)]
      .map(v => v = Data.STRING.EMPTY);
    // return this.field = [
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
    //     'empty','empty','empty','empty','empty',5,'empty','empty','empty','empty',
    //     0,1,1,'empty','empty','empty',2,1,4,3,
    //     0,0,1,1,'empty',1,1,1,1,3
    //   ];
  },

  queueField: [],

  initQueueField: function () {
    return this.queueField = [...Array(Data.NUMBER.QUEUE_COLUMN * Data.NUMBER.ROW)]
      .map(v => v = Data.STRING.EMPTY);
  },

  oneRowArray: [],
  resetOneRowArray: function () {
    this.oneRowArray = [];
  },

  completeRowNumbers: [],
  resetCompleteRowNumbers: function () {
    this.completeRowNumbers = [];
  },

  remainRowArray: [],
  resetRemainRowArray: function () {
    this.remainRowArray = [];
  },
  remainRowNumbers: [],
  resetRemainRowNumbers: function () {
    this.remainRowNumbers = [];
  },

  deleteRow: function (fieldArray) {

    // create arrays for deleting rows
    let completeRowArray: Array<number> = []; // should delete areas


    this.oneRowArray.forEach((v, i) => {

      const checkEmpty = v.some(item => item === Data.STRING.EMPTY);
      const checkCurrent = v.some(item => item === Data.STRING.CURRENT);
      const checkNumber = v.some(item => typeof item === 'number');

      const checkROWs = v.every(item => item !== Data.STRING.EMPTY);

      if ((checkEmpty && checkNumber) || checkCurrent && !checkROWs) {
        this.remainRowArray.push(v);
        this.remainRowNumbers.push(i);
      }

      if (!checkROWs) {
        return
      }

      this.completeRowNumbers.push(i);

      [...Array(Data.NUMBER.ROW)].forEach((_, j) => {
        completeRowArray.push((i * Data.NUMBER.ROW) + j);
      })
    })

    // delete complete rows
    completeRowArray.forEach((v) => fieldArray[v] = Data.STRING.EMPTY);

  },

  dropRow: function (fieldArray) {

    // first, drop remainRow

    if (this.remainRowNumbers.length > 0) {

      const reverseNum = this.remainRowNumbers.reverse();
      const reverseRow = this.remainRowArray.reverse();

      const loop = () => {

        reverseNum.forEach((v, i) => {

          let start = (v * Data.NUMBER.ROW) + Data.NUMBER.ROW;

          if (start >= this.field.length) {
            return
          }

          const check = Fn.filterUndef(fieldArray.map((_, k) => {
            if (k >= start && k <= (start + Data.NUMBER.ROW - 1)) {
              return k;
            }
          }));


          if (check.every(x => fieldArray[x] === Data.STRING.EMPTY)) {

            [...Array(Data.NUMBER.ROW)].forEach((_, j) => {

              let value = reverseRow[i][j];

              fieldArray[start + j] = value;
              fieldArray[(start - Data.NUMBER.ROW) + j] = Data.STRING.EMPTY;

            })
          }
        })
      }

      const increment = () => {
        [...Array(reverseNum.length)].forEach((_, j) => {

          if (reverseNum[j] >= Data.NUMBER.COLUMN) {
            return
          }

          reverseNum[j] += 1;
        })
      }


      [...Array(Data.NUMBER.COLUMN)].forEach(() => {
        loop();
        increment();
      })

    }

  },


  transferToFix: (fieldArray) => {
    fieldArray.forEach((v, i) => {
      if (v === Data.STRING.CURRENT) {
        fieldArray[i] = State.Block.blockNumber;
      }
    })
  },

  transfer: (block, fieldArray) => {
    block.forEach((v) => { fieldArray[v] = Data.STRING.CURRENT });
  },

  clear: (current, fieldArray) => {
    current.forEach((v) => fieldArray[v] = Data.STRING.EMPTY);
  },

}