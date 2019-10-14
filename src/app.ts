import * as Data from './data';
import * as Fn from './function';
import * as Controll from './controll';
import * as State from './state';
import * as Action from './event';
import * as Render from './render';
//const clonedeep = require('lodash/cloneDeep');

function init() {
  // push cleared field
  Controll.Update.initField();
  // define block number
  State.Block.blockNumber;
  // define block
  State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
  // update field info
  Controll.Update.transfer(State.Block.current, Controll.Update.field);
  // draw grid
  Render.renderField();
  // draw block
  Render.renderBlock(Controll.Update.field);
}

function continueGame() {
  // reset block
  const reset = Controll.Update.reGenerateBlock();
  State.Block.deepCopy = reset;
  // reset angle
  State.Block.resetAngle();
  // reset completed row numbers
  Controll.Update.resetCompleteRowNumbers();
  // reset one row array
  Controll.Update.resetOneRowArray();
  // reset row check
  State.Complete.resetCheck();
  
  // define block number
  State.Block.resetBlockNumber();
  // define block
  State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
  // update field info
  Controll.Update.transfer(State.Block.current, Controll.Update.field);
  // draw grid
  Render.renderField();
  // draw block
  Render.renderBlock(Controll.Update.field);

  // allow user action
  State.Movable.pause = false;
  
}

// down posibility check && down input check
function downFlow(event: KeyboardEvent) {
  if(State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) && 
    Action.UserEvent.down(event) ) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.down(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);
  }
}

// left posibility check && left input check
function leftFlow(event: KeyboardEvent) {
  if(State.Movable.left(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
    Action.UserEvent.left(event)) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.left(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);

  }
}

// right posibility check && right input check
function rightFlow(event: KeyboardEvent) {
  if(State.Movable.right(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
    Action.UserEvent.right(event)) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.right(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);

  }
}

// rotate posibility check && rotate input check
function rotateFlow(event: KeyboardEvent) {
  if(State.Movable.rotate(Controll.Update.field,
    State.rotatedBlock(State.Block.current, State.Block.angle),
    State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
    Action.UserEvent.rotate(event)) {

    State.Block.angle = Data.NUMBER.DEGREES;
    
    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.rotate(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    State.Block.current = State.rotatedBlock(State.Block.current, State.Block.angle);
    State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number = State.Block.current;
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);

  }
}

// down failed & row check true
function completeRowFlow() {
  
  if( !State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
  State.Complete.check(Controll.Update.field)) {
    // stop user action
    State.Movable.pause = true;

    (async () => {
      await Fn.sleep(300);
      // delete row rendering
      Controll.Update.deleteRow(Controll.Update.field);
      Render.clearField();
      Render.renderField();
      Render.renderBlock(Controll.Update.field);

      await Fn.sleep(500);
      // drop row rendering
      Controll.Update.dropRow(Controll.Update.field);
      Render.clearField();
      Render.renderField();
      Render.renderBlock(Controll.Update.field);
      Controll.Update.transferToFix(Controll.Update.field);
      Controll.Update.moreDroppable(Controll.Update.field);

      await Fn.sleep(300);

      continueGame();
      
    })();

  }
}

// down failed & row check failed
function failureRowFlow() {
  if( !State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
     !State.Complete.check(Controll.Update.field)) {

    // stop user action
    State.Movable.pause = true;

    (async () => {
      Controll.Update.transferToFix(Controll.Update.field);
      await Fn.sleep(300);
      continueGame();
    })();
  }
}




window.addEventListener('load',()=>{
  init();
  
})

window.addEventListener('keydown', event => {
  if( !event.isTrusted) {
		return;
  }

  // pause check
  if(State.Movable.pause) {
    return;
  }
  
  downFlow(event);

  leftFlow(event);

  rightFlow(event);

  rotateFlow(event);

  completeRowFlow();

  failureRowFlow();

  
}, {passive: false});