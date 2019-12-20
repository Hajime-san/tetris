import * as Data from './data';
import * as UA from './ua';
import * as Fn from './function';
import * as Controll from './controll';
import * as State from './state';
import * as Action from './event';
import * as Render from './render';
import * as Debug from './dev';

/** 
  setInterval event
*/

// let tabChange = false;

// document.addEventListener('visibilitychange', ()=> {
//   // stop running expensive task
//   if (document.hidden) {
//     tabChange = true;
//   }
// });

const init = function () {

  // allow user action
  State.Movable.pause = false;
  State.Movable.checkTime = false;

  // if(tabChange) {
  //   return;
  // }

  let intervalDownMove = downMove();

  let intervalDownCheck = downCheck();

  function downMove() {
    if (Debug.Settings.autoMove) {
      return window.setInterval(downFlow, State.Info.speed);
    }
  }

  function downCheck() {
    if (Debug.Settings.autoMove) {
      return window.setInterval(() => {
        if (State.Movable.down(Controll.Update.field, State.Block.current)) {
          return;
        }
        clearInterval(intervalDownMove);
        clearInterval(intervalDownCheck);

        completeRowFlow();

        failureRowFlow();

      }, State.Info.speed)
    }
  }

  // pause auto move
  function pauseGame() {
    if (!Debug.Settings.autoMove) {
      State.Movable.pause = true;

      clearInterval(intervalDownMove);
      clearInterval(intervalDownCheck);
    }
  }

  // restart auto move
  function restartGame() {
    if (Debug.Settings.autoMove) {
      State.Movable.pause = false;

      clearInterval(intervalDownMove);
      intervalDownMove = downMove();
      clearInterval(intervalDownCheck);
      intervalDownCheck = downCheck();
    }
  }
  /******************************************/


  /** 
    init
  */
  function initGame() {
    // clear all canvas area
    Render.clearAll();
    // push cleared field
    Controll.Update.initField();
    // push cleared queu field
    Controll.Update.initQueueField();
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
    // draw button
    Render.renderButton();
    // draw block
    Render.renderBlock(Controll.Update.field);
    // draw bock queue
    Render.renderQueue(Controll.Update.queueField);

  }

  initGame();

  /******************************************/

  function continueGame() {
    // increment block count
    State.Info.incrementCount();
    // increment level
    State.Info.incrementLevelandSpeed();
    // increment score
    State.Info.incrementScore();

    // game over
    if (!State.Playable.continue(Controll.Update.field)) {
      window.removeEventListener('keydown', userActionFlow, false);
      Render.Division.gameOver(init);

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
      // push cleared queu field
      Controll.Update.initQueueField();
      // reset HUD
      State.Info.resetCount();
      State.Info.resetCompletedRow();
      State.Info.resetLevelandSpeed();

      return;
    }

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
    // push cleared queu field
    Controll.Update.initQueueField();
    // pick block queue
    State.blockQueue.creatQueue(State.Info.count);
    // define block
    State.Block.current = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].number;
    // update field info
    Controll.Update.transfer(State.Block.current, Controll.Update.field);
    // clear all canvas area
    Render.clearAll();
    // draw gird 
    Render.renderField();
    // draw button
    Render.renderButton();
    // draw block
    Render.renderBlock(Controll.Update.field);
    // draw block queue
    Render.renderQueue(Controll.Update.queueField);

    // allow user action
    State.Movable.pause = false;
    State.Movable.checkTime = false;

    // restart interval down
    clearInterval(intervalDownMove);
    intervalDownMove = downMove();
    clearInterval(intervalDownCheck);
    intervalDownCheck = downCheck();

  }

  // down posibility check && down input check
  function downFlow() {
    if (State.Movable.down(Controll.Update.field, State.Block.current)) {

      Render.clearBlock(Controll.Update.field);

      Controll.Update.clear(State.Block.current, Controll.Update.field);
      Controll.Update.transfer(Controll.Direction.down(State.Block.current), Controll.Update.field);
      State.Block.current = Controll.Direction.down(State.Block.current);

      Render.renderBlock(Controll.Update.field);
    }
  }

  // hard down posibility check && hard down input check
  function hardDownFlow() {
    Render.clearBlock(Controll.Update.field);
    while (State.Movable.down(Controll.Update.field, State.Block.current)) {
      Controll.Update.clear(State.Block.current, Controll.Update.field);
      Controll.Update.transfer(Controll.Direction.down(State.Block.current), Controll.Update.field);
      State.Block.current = Controll.Direction.down(State.Block.current);
    }

    Render.renderBlock(Controll.Update.field);

  }

  // left posibility check
  function leftFlow() {
    if (State.Movable.left(Controll.Update.field, State.Block.current)) {

      Render.clearBlock(Controll.Update.field);

      Controll.Update.clear(State.Block.current, Controll.Update.field);
      Controll.Update.transfer(Controll.Direction.left(State.Block.current), Controll.Update.field);
      State.Block.current = Controll.Direction.left(State.Block.current);

      Render.renderBlock(Controll.Update.field);

    }
  }

  // right posibility check
  function rightFlow() {
    if (State.Movable.right(Controll.Update.field, State.Block.current)) {

      Render.clearBlock(Controll.Update.field);

      Controll.Update.clear(State.Block.current, Controll.Update.field);
      Controll.Update.transfer(Controll.Direction.right(State.Block.current), Controll.Update.field);
      State.Block.current = Controll.Direction.right(State.Block.current);

      Render.renderBlock(Controll.Update.field);

    }
  }

  // rotate posibility check
  function rotateFlow() {
    if (State.Movable.rotate(Controll.Update.field,
      State.rotatedBlock(State.Block.current, State.Block.angle, true, State.Block.blockNumber),
      State.Block.current, State.Block.blockNumber)) {

      State.Block.angle = Data.NUMBER.DEGREES;

      Render.clearBlock(Controll.Update.field);

      Controll.Update.clear(State.Block.current, Controll.Update.field);
      State.Block.current = State.rotatedBlock(State.Block.current, State.Block.angle, true, State.Block.blockNumber);
      Controll.Update.transfer(State.Block.current, Controll.Update.field);

      Render.renderBlock(Controll.Update.field);

    }
  }

  // down failed & row complete
  function completeRowFlow() {

    if (!State.Movable.down(Controll.Update.field, State.Block.current) &&
      State.Complete.check(Controll.Update.field)) {
      // stop user action
      State.Movable.pause = true;
      State.Movable.checkTime = true;
      // clear interval
      clearInterval(intervalDownMove);
      clearInterval(intervalDownCheck);

      (async () => {
        await Fn.sleep(300);

        // delete row rendering
        Controll.Update.deleteRow(Controll.Update.field);
        State.Info.incrementCompletedRow();
        await Render.deleteCompletedBlock(Controll.Update.field);

        await Fn.sleep(500);

        // drop row rendering
        Controll.Update.dropRow(Controll.Update.field);
        Render.renderBlock(Controll.Update.field);
        Controll.Update.transferToFix(Controll.Update.field);

        await Fn.sleep(300);

        continueGame();

      })();

    }
  }

  // down failed & row incomplete
  function failureRowFlow() {
    if (!State.Movable.down(Controll.Update.field, State.Block.current) &&
      !State.Complete.check(Controll.Update.field)) {

      // stop user action
      State.Movable.pause = true;

      // clear interval
      clearInterval(intervalDownMove);
      clearInterval(intervalDownCheck);

      (async () => {
        // delay for continue //
        await Fn.sleep(500);

        if (State.Movable.down(Controll.Update.field, State.Block.current)) {

          State.Movable.pause = false;

          intervalDownMove = downMove();
          intervalDownCheck = downCheck();
          return;
        }
        // delay for continue //
        State.Movable.pause = true;
        State.Movable.checkTime = true;

        Controll.Update.transferToFix(Controll.Update.field);
        await Fn.sleep(100);

        continueGame();
      })();
    }
  }





  /** 
    User input
  */
  const userActionFlow = (event: Event) => {

    // when keyboard input
    if (!event.isTrusted) {
      return;
    }

    // pause or restart game
    if (Action.UserEvent.pause(event)) {

      if (!State.Movable.pause && !State.Movable.checkTime) {
        State.Movable.checkTime = true;
        Debug.Settings.autoMove = false;
        Render.renderButton();
        pauseGame();
      } else {
        State.Movable.checkTime = false;
        Debug.Settings.autoMove = true;
        Render.renderButton();
        restartGame();
      }

      return
    }


    // block check time
    if (State.Movable.checkTime) {
      return;
    }

    if (Action.UserEvent.left(event)) {
      leftFlow();
    }

    if (Action.UserEvent.right(event)) {
      rightFlow();
    }

    if (Action.UserEvent.rotate(event)) {
      rotateFlow();
    }

    // pause check
    if (State.Movable.pause) {
      return;
    }

    if (Action.UserEvent.down(event)) {
      downFlow();
    }

    if (Action.UserEvent.hardDown(event)) {
      hardDownFlow();
    }

    completeRowFlow();

    failureRowFlow();

  }

  if (UA.isTouchEnabled()) {
    Data.canvas.addEventListener('click', userActionFlow, { passive: false });
  } else {
    window.addEventListener('keydown', userActionFlow, { passive: false });
  }

}

window.addEventListener('load', () => {
  Render.resizeCanvasArea();
  Render.Division.start(init);
});
