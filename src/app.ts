import * as Data from './data';
import * as Fn from './function';
import * as Controll from './controll';
import * as State from './state';
import * as Action from './event';
import * as Render from './render';
import * as Debug from './dev';

/** 
  setInterval event
*/
let intervalDownMove = downMove();

let intervalDownCheck = downCheck();

function downMove() {
  if(Debug.Settings.autoMove) {
    return window.setInterval(downFlow, Data.SETTING.SPEED);
  }
}

function downCheck() {
  if(Debug.Settings.autoMove) {
    return window.setInterval(()=>{
      if( !State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) ) {
    
        clearInterval(intervalDownMove);
        clearInterval(intervalDownCheck);
        
        completeRowFlow();
    
        failureRowFlow();
      }
    }, Data.SETTING.SPEED)
  }
}
/******************************************/ 


/** 
  init
*/
function init() {
  // push cleared field
  Controll.Update.initField();
  // increment block count
  State.Info.incrementCount();
  // pick block queue
  State.blockQueue.creatQueue(State.Info.count);
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

window.addEventListener('load',()=>{
  init();
  
})

/******************************************/

function continueGame() {
  // increment block count
  State.Info.incrementCount();

  // reset block
  const reset = Controll.Update.reGenerateBlock();
  State.Block.deepCopy = reset;
  // reset angle
  State.Block.resetAngle();
  // reset completed row numbers
  Controll.Update.resetCompleteRowNumbers();
  // reset one row array
  Controll.Update.resetOneRowArray();
  // reset remain row numbers
  Controll.Update.resetRemainRowNumbers();
  // reset remain row array
  Controll.Update.resetRemainRowArray();
  // reset row check
  State.Complete.resetCheck();
  // pick block queue
  State.blockQueue.creatQueue(State.Info.count);
  // define block
  State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
  // update field info
  Controll.Update.transfer(State.Block.current, Controll.Update.field);
  // draw block
  Render.renderBlock(Controll.Update.field);

  // allow user action
  State.Movable.pause = false;

  // restart interval down
  clearInterval(intervalDownMove);
  intervalDownMove = downMove();
  clearInterval(intervalDownCheck);
  intervalDownCheck = downCheck();
  
}

// down posibility check && down input check
function downFlow() {
  if(State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number)) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.down(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);
  }
}

// left posibility check
function leftFlow() {
  if(State.Movable.left(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) ) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.left(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);

  }
}

// right posibility check
function rightFlow() {
  if(State.Movable.right(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) ) {

    Controll.Update.clear(State.Block.current, Controll.Update.field);
    Controll.Direction.right(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number);
    Controll.Update.transfer(State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number, Controll.Update.field);
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    Render.clearField();
    Render.renderField();
    Render.renderBlock(Controll.Update.field);

  }
}

// rotate posibility check
function rotateFlow() {
  if(State.Movable.rotate(Controll.Update.field,
    State.rotatedBlock(State.Block.current, State.Block.angle),
    State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number)) {

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

// down failed & row complete
function completeRowFlow() {
  
  if( !State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
  State.Complete.check(Controll.Update.field)) {
    // stop user action
    State.Movable.pause = true;
    // clear interval
    clearInterval(intervalDownMove);
    clearInterval(intervalDownCheck);
    
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

      await Fn.sleep(300);

      continueGame();
      
    })();

  }
}

// down failed & row incomplete
function failureRowFlow() {
  if( !State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number) &&
     !State.Complete.check(Controll.Update.field)) {

    // stop user action
    State.Movable.pause = true;

    // clear interval
    clearInterval(intervalDownMove);
    clearInterval(intervalDownCheck);

    (async () => {
      // delay for continue //
      await Fn.sleep(500);

      if(State.Movable.down(Controll.Update.field, State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number)) {

        State.Movable.pause = false;

        intervalDownMove = downMove();
        intervalDownCheck = downCheck();
        return;
      }
      // delay for continue //


      Controll.Update.transferToFix(Controll.Update.field);
      await Fn.sleep(300);
      continueGame();
    })();
  }
}





/** 
  User input
*/
window.addEventListener('keydown', event => {
  if( !event.isTrusted) {
		return;
  }
  


  // pause check
  if(State.Movable.pause) {
    return;
  }

  if(Action.UserEvent.left(event)) {
    leftFlow();
  }

  if(Action.UserEvent.right(event)) {
    rightFlow();
  }

  if(Action.UserEvent.rotate(event)) {
    rotateFlow();
  }

  if(Action.UserEvent.down(event) ) {
    downFlow();
  }

  completeRowFlow();

  failureRowFlow();

  
}, {passive: false});