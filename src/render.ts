import * as Data from './data';
import * as Fn from './function';
import * as UA from './ua';
import * as State from './state';
import * as Action from './event';
import * as Debug from './dev';
import * as Controll from './controll';

export const ctx = Data.canvas.getContext('2d') as CanvasRenderingContext2D;
// use anti-aliasing or not
if (Debug.Settings.antiAliasing) {
  ctx.translate(0.5, 0.5);
}

// check device screen size
export const ScreenSize = {

  getWidth: window.parent.screen.width,

  getHeight: window.parent.screen.height,

}

// resize canvas size
export function resizeCanvasArea() {
  if (ScreenSize.getWidth > 400) {
    Data.canvas.width = 400;
    Data.canvas.height = 600;
  }
  if (ScreenSize.getHeight < 600) {
    Data.canvas.height = Math.floor(ScreenSize.getHeight * 0.9);
  }
  if (ScreenSize.getWidth < 420 && ScreenSize.getWidth > 320) {
    Data.canvas.width = ScreenSize.getWidth;
    Data.canvas.height = 600;

    GRID_SIZE.HORIZON = Math.floor(GRID_SIZE.HORIZON * 0.9);

    GRID_SIZE.STEP = GRID_SIZE.HORIZON / 10;

    GRID_SIZE.getVertical();

    GRID_SIZE.QUEUE_STEP = GRID_SIZE.STEP - GRID_SIZE.STANDARD;

  }

  if (ScreenSize.getWidth < 321) {
    Data.canvas.width = ScreenSize.getWidth;

    GRID_SIZE.HORIZON = Math.floor(GRID_SIZE.HORIZON * 0.85);

    GRID_SIZE.STEP = GRID_SIZE.HORIZON / 10;

    GRID_SIZE.getVertical();

    GRID_SIZE.QUEUE_STEP = GRID_SIZE.STEP - GRID_SIZE.STANDARD;

  }

}

export const GRID_SIZE = {
  HORIZON: 270,
  VERTICAL: 378,
  STANDARD: 7,
  STEP: 27,
  QUEUE_STEP: 20,
  getVertical: function () {
    this.VERTICAL = this.STEP * Data.NUMBER.COLUMN;
  },
}
GRID_SIZE.getVertical();


const TEXT = {
  FONT: 'Osaka',
  FONTSIZE: '16px ',
  FONTSIZE2: '18px ',
  NEXT: 'Next',
  LINE: 'Line',
  SCORE: 'Score',
  PLAY: 'Play ?',
  GAMEOVER: 'Game Over',
  REPLAY: 'Replay ?',

}

export function clearAll() {
  ctx.clearRect(0, 0, Data.canvas.width, Data.canvas.height);
}


function fillBackGround(color: string) {
  // background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height);
  ctx.fill();
}

export const Division = {

  start: function (callback: () => void) {

    fillBackGround('rgb(0,0,0)');

    ctx.font = `${TEXT.FONTSIZE2 + TEXT.FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    const playWdith = Math.floor(ctx.measureText(TEXT.PLAY).width);
    ctx.fillText(TEXT.PLAY,
      (Data.canvas.width - playWdith) / 2,
      Data.canvas.height / 2);


    // replay button
    const play = (e: MouseEvent) => {

      const button = Object.create(Action.onCanvas);
      button.point(e);
      button.figure = 'square';
      button.square.x = (Data.canvas.width - playWdith) / 2;
      button.square.y = (Data.canvas.height / 2) - 20;
      button.square.w = playWdith;
      button.square.h = 40;


      if (button.hit()) {
        Data.canvas.removeEventListener('click', play, false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }

    }

    Data.canvas.addEventListener('click', play, false);

    // if enter key pressed
    const keyDown = (event: KeyboardEvent) => {
      if (Action.UserEvent.confirm(event)) {
        Data.canvas.removeEventListener('click', play, false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }
    }

    window.addEventListener('keydown', keyDown, false);
  },

  gameOver: function (callback: () => void) {

    // text
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height);
    ctx.fill();
    ctx.font = `${TEXT.FONTSIZE2 + TEXT.FONT}`;
    ctx.fillStyle = 'rgba(51,51,51,1.0)';
    const gameWdith = Math.floor(ctx.measureText(TEXT.GAMEOVER).width);
    const replayWdith = Math.floor(ctx.measureText(TEXT.REPLAY).width);
    ctx.fillText(TEXT.GAMEOVER,
      (Data.canvas.width - gameWdith) / 2,
      Data.canvas.height / 2);
    ctx.fillText(TEXT.REPLAY,
      (Data.canvas.width - replayWdith) / 2,
      (Data.canvas.height / 2) + 40);

    // replay button
    const replay = (e: MouseEvent) => {

      const button = Object.create(Action.onCanvas);
      button.point(e);
      button.figure = 'square';
      button.square.x = (Data.canvas.width - replayWdith) / 2;
      button.square.y = (Data.canvas.height / 2);
      button.square.w = replayWdith;
      button.square.h = 40;


      if (button.hit()) {
        Data.canvas.removeEventListener('click', replay, false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }

    }

    Data.canvas.addEventListener('click', replay, false);

    // if enter key pressed
    const keyDown = (event: KeyboardEvent) => {
      if (Action.UserEvent.confirm(event)) {
        Data.canvas.removeEventListener('click', replay, false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }
    }

    window.addEventListener('keydown', keyDown, false);

  }
}

export const TouchAction = {
  _MARGIN_BOTTOM: 60,
  _LENGTH: 15,
  _RADIANS: 5,

  // left button
  left: function () {

    const HORIZON = Data.canvas.width / 2 - (Data.canvas.width / 2 - this._LENGTH * 2);
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM;
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + this._RADIANS;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + (LENGTH / 2), CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON, CENTER);
    triangle.lineTo(HORIZON + (LENGTH / 2), CENTER + (LENGTH / 3));

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON, CENTER);
    line.lineTo(HORIZON + (LENGTH + 5), CENTER);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      ctx.stroke(triangle);
      ctx.stroke(line);
      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    }
  },

  // right button
  right: function () {
    const HORIZON = Data.canvas.width / 2 + (Data.canvas.width / 2 - this._LENGTH * 3);
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM;
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + this._RADIANS;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + LENGTH, CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON + (LENGTH / 0.7), CENTER);
    triangle.lineTo(HORIZON + LENGTH, CENTER + (LENGTH / 3));

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON, CENTER);
    line.lineTo(HORIZON + (LENGTH + 5), CENTER);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      ctx.stroke(triangle);
      ctx.stroke(line);
      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    }
  },

  // down button
  down: function () {
    const HORIZON = Data.canvas.width / 2 - (Data.canvas.width / 2 / 2.5);
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM + (this._LENGTH * 3);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + this._RADIANS;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + (LENGTH / 2.7), CENTER + (LENGTH / 5));
    triangle.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 1.8));
    triangle.lineTo(HORIZON + (LENGTH / 1), CENTER + (LENGTH / 5));

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON + (LENGTH / 1.5), CENTER - (LENGTH / 1.8));
    line.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 1.8));

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      ctx.stroke(triangle);
      ctx.stroke(line);
      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    }
  },

  // down button
  hardDown: function () {
    const HORIZON = Data.canvas.width / 2;
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM + (this._LENGTH * 3);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + this._RADIANS;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + (LENGTH / 2.7), CENTER + (LENGTH / 5));
    triangle.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 1.8));
    triangle.lineTo(HORIZON + (LENGTH / 1), CENTER + (LENGTH / 5));

    // triangle2
    const triangle2 = new Path2D();
    ctx.beginPath();
    triangle2.moveTo(HORIZON + (LENGTH / 2.7), CENTER + (LENGTH / 9));
    triangle2.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 5.8));
    triangle2.lineTo(HORIZON + (LENGTH / 1), CENTER + (LENGTH / 9));


    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      ctx.stroke(triangle);
      ctx.stroke(triangle2);
      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    }
  },

  // rotate button
  rotate: function () {
    const HORIZON = Data.canvas.width / 2 + (Data.canvas.width / 2 / 2.5);
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM + (this._LENGTH * 3);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + this._RADIANS;


    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + (LENGTH / 1.2), CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON + (LENGTH / 0.8), CENTER);
    triangle.lineTo(HORIZON + (LENGTH / 0.6), CENTER - (LENGTH / 3));

    // circleLine
    const circleLine = new Path2D();
    ctx.beginPath();
    circleLine.arc(HORIZON + 10, CENTER, RADIANS / 2, 0, 180);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      ctx.stroke(triangle);
      ctx.stroke(circleLine);
      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    };
  },

  // pause button
  pause: function () {
    const HORIZON = Data.canvas.width / 2 - (Data.canvas.width / 2 - this._LENGTH * 1.75);
    const CENTER = GRID_SIZE.VERTICAL + this._MARGIN_BOTTOM + (this._LENGTH * 3.25);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH;


    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    triangle.moveTo(HORIZON + (LENGTH / 2), CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON + LENGTH, CENTER);
    triangle.lineTo(HORIZON + (LENGTH / 2), CENTER + (LENGTH / 3));

    // line1
    const line1 = new Path2D();
    ctx.beginPath();
    line1.moveTo(HORIZON + (LENGTH / 2), CENTER - (LENGTH / 3));
    line1.lineTo(HORIZON + (LENGTH / 2), CENTER + (LENGTH / 3));

    // line2
    const line2 = new Path2D();
    ctx.beginPath();
    line2.moveTo(HORIZON + (LENGTH / 1.25), CENTER - (LENGTH / 3));
    line2.lineTo(HORIZON + (LENGTH / 1.25), CENTER + (LENGTH / 3));

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);

    function render() {
      if (Debug.Settings.autoMove) {
        ctx.stroke(line1);
        ctx.stroke(line2);
      } else {
        ctx.fill(triangle);
      }

      ctx.stroke(circle);
    }

    return {
      render,
      rect: [(HORIZON + LENGTH) - this._RADIANS, CENTER, RADIANS]
    };
  },

}

export function renderField() {

  // background
  fillBackGround('rgb(0,0,0)');

  // line settings
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';

  // outline
  const outline = new Path2D();
  ctx.beginPath();
  outline.rect(GRID_SIZE.STANDARD, GRID_SIZE.STANDARD, GRID_SIZE.HORIZON, GRID_SIZE.VERTICAL);
  ctx.stroke(outline);

  // grid
  const grid = new Path2D();

  // horizon line
  for (let i = GRID_SIZE.STEP + GRID_SIZE.STANDARD; i < GRID_SIZE.VERTICAL; i += GRID_SIZE.STEP) {
    ctx.beginPath();
    grid.moveTo(GRID_SIZE.STANDARD, i);
    grid.lineTo(GRID_SIZE.HORIZON + GRID_SIZE.STANDARD, i);
  }
  // vertical line
  for (let i = GRID_SIZE.STEP + GRID_SIZE.STANDARD; i < GRID_SIZE.HORIZON; i += GRID_SIZE.STEP) {
    ctx.beginPath();
    grid.moveTo(i, GRID_SIZE.STANDARD);
    grid.lineTo(i, GRID_SIZE.VERTICAL + GRID_SIZE.STANDARD);
  }
  ctx.stroke(grid);

  // HUD
  ctx.font = `${TEXT.FONTSIZE + TEXT.FONT}`;
  const nextWdith = Math.floor(ctx.measureText(TEXT.NEXT).width);
  const scoreWdith = Math.floor(ctx.measureText(TEXT.SCORE).width);
  const lineWdith = Math.floor(ctx.measureText(TEXT.LINE).width);
  const scoreNumberWidth = Math.floor(ctx.measureText(State.Info._score.toString()).width);
  const lineNumberWidth = Math.floor(ctx.measureText(State.Info.completedRow.toString()).width);

  ctx.fillText(TEXT.NEXT,
    (GRID_SIZE.HORIZON + Data.canvas.width - (nextWdith / 2)) / 2,
    GRID_SIZE.STEP);
  ctx.fillText(TEXT.SCORE,
    (GRID_SIZE.HORIZON + Data.canvas.width - (scoreWdith / 2)) / 2,
    (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 7)));
  ctx.fillText(State.Info._score.toString(),
    (GRID_SIZE.HORIZON + Data.canvas.width - (scoreNumberWidth / 2)) / 2,
    (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 5)));
  ctx.fillText(TEXT.LINE,
    (GRID_SIZE.HORIZON + Data.canvas.width - (lineWdith / 2)) / 2,
    (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 3)));
  ctx.fillText(State.Info.completedRow.toString(),
    (GRID_SIZE.HORIZON + Data.canvas.width - (lineNumberWidth / 2)) / 2,
    (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 1)));

  // control description
  if (!UA.isTouchEnabled()) {
    ctx.fillText('[↑] Rotate', GRID_SIZE.STEP / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 1.5));
    ctx.fillText('[←] Left', GRID_SIZE.STEP / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 2.25));
    ctx.fillText('[→] Right', GRID_SIZE.STEP / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 3));
    ctx.fillText('[↓] Down', GRID_SIZE.STEP / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 3.75));

    ctx.fillText('[Z] Hard Down', GRID_SIZE.HORIZON / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 1.5));
    ctx.fillText('[P] Pause and Restart', GRID_SIZE.HORIZON / 2, GRID_SIZE.VERTICAL + (GRID_SIZE.STEP * 2.25));
  }

}

export function clearBlock(fieldArray: Data.field) {

  fieldArray.forEach((v, i) => {
    if (v === Data.STRING.EMPTY) {
      return;
    }

    // draw controllable block
    if (v === Data.STRING.CURRENT) {
      ctx.clearRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
    }
  })
}

export function renderButton() {

  // touch button
  if (UA.isTouchEnabled()) {
    // line settings
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';

    ctx.clearRect(0, GRID_SIZE.VERTICAL + GRID_SIZE.STEP, Data.canvas.width, GRID_SIZE.HORIZON);

    TouchAction.left().render();
    TouchAction.right().render();
    TouchAction.down().render();
    TouchAction.hardDown().render();
    TouchAction.rotate().render();
    TouchAction.pause().render();
  }
}

export function deleteCompletedBlock(fieldArray: Data.field) {

  return new Promise<void>((resolve) => {
    //let timeDelay = 0;
    //let fasterTime = -(Controll.Update.completeRowNumbers.length * 10);
    Controll.Update.completeRowNumbers.forEach((v, _, arr) => {
      [...Array(Data.NUMBER.ROW)].forEach((_, itelator) => {
        let i = v * Data.NUMBER.ROW + itelator;

        if (i >= ((arr[arr.length - 1] * Data.NUMBER.ROW) + (Data.NUMBER.ROW - 1))) {
          resolve();
        }

        ctx.clearRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
          (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
          GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);

        // setTimeout(()=>{
        //   const clearSequence = setInterval(()=> {
        //     ctx.clearRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        //               (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        //                                     GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
        //  }, 50);

        // }, timeDelay)
        // timeDelay += 50 + fasterTime;
      })
    })


  })
}

export function renderBlock(fieldArray: Data.field) {

  fieldArray.forEach((v, i) => {
    if (v === Data.STRING.EMPTY) {
      return;
    }

    // draw controllable block
    if (v === Data.STRING.CURRENT) {
      ctx.fillStyle = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
      ctx.fill();
    }

    // draw fixed block
    if (v !== Data.STRING.CURRENT && typeof v === 'number') {
      ctx.fillStyle = State.Block.deepCopy.BLOCKS[v].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
      ctx.fill();
    }
  })
}

export function renderQueue(queue: Data.field) {

  const QueueProp = Object.create(Data.Prop);

  // only one block to pick
  //const num = State.blockQueue.queue[1];
  //const block = State.rotatedBlock(QueueProp.BLOCKS[num].number, angle, false, num);
  //block.forEach(v => queue[v] = num);

  // pick block number form block queue
  const nums = State.blockQueue.queue.slice(1, 4);

  nums.forEach((v, i) => {
    let angle = 0;
    let start = 0;
    let temp = State.rotatedBlock(QueueProp.BLOCKS[v].number, angle, false, v);

    // fix horizontal position
    if (v === 0) {
      angle = 0;
    }
    if (v !== 0) {
      angle = Data.NUMBER.DEGREES;
    }
    if (v === 1) {
      temp.forEach((_, i, arr) => { arr[i] -= (Data.NUMBER.ROW - 1) })
    }
    if (v === 2) {
      angle = Data.NUMBER.DEGREES * 3;
      temp.forEach((_, i, arr) => { arr[i] -= Data.NUMBER.ROW });
    }
    if (v === 3) {
      temp.forEach((_, i, arr) => { arr[i] += (Data.NUMBER.ROW + 1) })
    }
    if (v === 4) {
      temp.forEach((_, i, arr) => { arr[i] += (Data.NUMBER.ROW + 1) })
      temp[3] -= Data.NUMBER.ROW * 2;
    }
    if (v === 5) {
      temp.forEach((_, i, arr) => { arr[i] -= (Data.NUMBER.ROW + 1) })
    }
    if (v === 6) {
      temp.forEach((_, i, arr) => { arr[i] -= 1 })
    }

    // fix vertical position 
    if (i === 0) {
      temp.forEach(w => queue[w] = v);
    }
    if (i === 1) {
      start += 30;
      temp.forEach(w => queue[w + start] = v);
    }
    if (i === 2) {
      start += 60;
      temp.forEach(w => queue[w + start] = v);
    }
  })

  queue.forEach((v, i) => {
    if (v === Data.STRING.EMPTY) {
      return;
    }
    if (typeof v === 'number') {
      ctx.fillStyle = QueueProp.BLOCKS[v].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.QUEUE_STEP) + (GRID_SIZE.HORIZON - GRID_SIZE.STEP),
        (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.QUEUE_STEP) + GRID_SIZE.STEP * 1.5,
        GRID_SIZE.QUEUE_STEP - 2, GRID_SIZE.QUEUE_STEP - 2);
      ctx.fill();
    }
  })

}