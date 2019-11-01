import * as Data from './data';
import * as Fn from './function';
import * as State from './state';
import * as Action from './event';
import * as Debug from './dev';
const clonedeep = require('lodash/cloneDeep');

export const ctx = Data.canvas.getContext('2d') as CanvasRenderingContext2D;
// use anti-aliasing or not
if(Debug.Settings.antiAliasing) {
  ctx.translate(0.5, 0.5);
}

const QueueProp: Data.Prop = clonedeep(Data.Prop);

export const GRID_SIZE = {
  HORIZON: 270,
  VERTICAL: 378,
  STANDARD: 7,
  STEP: 27,
  QUEUE_STEP: 20,
  getVertical: function() {
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
  LEVEL: 'Level',
  PLAY: 'Play ?',
  GAMEOVER: 'Game Over',
  REPLAY: 'Replay ?',

}

export function clearAll() {
  ctx.clearRect(0,0,Data.canvas.width,Data.canvas.height);
}

export function clearField() {
  ctx.clearRect(GRID_SIZE.STANDARD - 7,
                GRID_SIZE.STANDARD - 7,
                GRID_SIZE.HORIZON+10,
                GRID_SIZE.VERTICAL+10);
}

export function clearQueue() {
  ctx.clearRect(GRID_SIZE.HORIZON + 7,
                0,
                Data.canvas.width,
                Data.canvas.height);
}

function fillBackGround() {
  // background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,Data.canvas.width,Data.canvas.height);
  ctx.fill();
}

export const Division = {

  start: function (callback: () => void) {

    fillBackGround();

    ctx.font = `${TEXT.FONTSIZE2 + TEXT.FONT}`;
    ctx.fillStyle = 'rgb(255,255,255,0.9)';
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
        Data.canvas.removeEventListener('click', play ,false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }

    }

    Data.canvas.addEventListener('click', play ,false);

    // if enter key pressed
    const keyDown = (event: KeyboardEvent) => {
      if(Action.UserEvent.confirm(event)) {
        Data.canvas.removeEventListener('click', play ,false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }
    }

    window.addEventListener('keydown', keyDown, false);
  },

  gameOver: function(callback: () => void) {
  
    // text
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(0,0,Data.canvas.width,Data.canvas.height);
    ctx.fill();
    ctx.font = `${TEXT.FONTSIZE2 + TEXT.FONT}`;
    ctx.fillStyle = 'rgb(51,51,51,1.0)';
    const gameWdith = Math.floor(ctx.measureText(TEXT.GAMEOVER).width);
    const replayWdith = Math.floor(ctx.measureText(TEXT.REPLAY).width);
    ctx.fillText(TEXT.GAMEOVER,
      (Data.canvas.width - gameWdith) / 2,
      Data.canvas.height / 2);
    ctx.fillText(TEXT.REPLAY,
      (Data.canvas.width - replayWdith) / 2,
      (Data.canvas.height / 2)+40);

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
        Data.canvas.removeEventListener('click', replay ,false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }

    }

    Data.canvas.addEventListener('click', replay ,false);

    // if enter key pressed
    const keyDown = (event: KeyboardEvent) => {
      if(Action.UserEvent.confirm(event)) {
        Data.canvas.removeEventListener('click', replay ,false);
        window.removeEventListener('keydown', keyDown, false);
        callback();
      }
    }
    
    window.addEventListener('keydown', keyDown, false);
    
  }
}

export const TouchAction = {
  _HORIZON: ((GRID_SIZE.HORIZON + (GRID_SIZE.STANDARD * 2)) / 2),
  MARGIN_BOTTOM: 60,
  _LENGTH: 15,

  // left button
  left: function () {
    
    const HORIZON = this._HORIZON - (this._HORIZON / 1.4);
    const CENTER = GRID_SIZE.VERTICAL + this.MARGIN_BOTTOM;
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + 5;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    triangle.moveTo(HORIZON + (LENGTH / 2), CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON, CENTER);
    triangle.lineTo(HORIZON + (LENGTH / 2), CENTER + (LENGTH / 3));
    ctx.stroke(triangle);

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON, CENTER);
    line.lineTo(HORIZON + (LENGTH + 5), CENTER);
    ctx.stroke(line);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);
    ctx.stroke(circle);
  
    
    return [HORIZON+LENGTH,CENTER,RADIANS];
  },

  // right button
  right: function () {
    const HORIZON = this._HORIZON + (this._HORIZON / 1.4) - this._LENGTH;
    const CENTER = GRID_SIZE.VERTICAL + this.MARGIN_BOTTOM;
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + 5;

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    triangle.moveTo(HORIZON + LENGTH, CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON + (LENGTH / 0.7), CENTER);
    triangle.lineTo(HORIZON + LENGTH, CENTER + (LENGTH / 3));
    ctx.stroke(triangle);

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON, CENTER);
    line.lineTo(HORIZON + (LENGTH + 5), CENTER);
    ctx.stroke(line);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);
    ctx.stroke(circle);
    
    return [HORIZON+LENGTH,CENTER,RADIANS];
  },

  // down button
  down: function () {
    const HORIZON = this._HORIZON - (this._HORIZON / 3);
    const CENTER = GRID_SIZE.VERTICAL + this.MARGIN_BOTTOM + (this._LENGTH * 3);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + 5;
    

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    triangle.moveTo(HORIZON + (LENGTH / 2.7), CENTER + (LENGTH / 5));
    triangle.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 1.8));
    triangle.lineTo(HORIZON + (LENGTH / 1), CENTER + (LENGTH / 5));
    ctx.stroke(triangle);

    // line
    const line = new Path2D();
    ctx.beginPath();
    line.moveTo(HORIZON + (LENGTH / 1.5), CENTER - (LENGTH / 1.8));
    line.lineTo(HORIZON + (LENGTH / 1.5), CENTER + (LENGTH / 1.8));
    ctx.stroke(line);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);
    ctx.stroke(circle);
    
    return [HORIZON+LENGTH,CENTER,RADIANS];
  },

  // rotate button
  rotate: function () {
    const HORIZON = this._HORIZON + (this._HORIZON / 4);
    const CENTER = GRID_SIZE.VERTICAL + this.MARGIN_BOTTOM + (this._LENGTH * 3);
    const LENGTH = this._LENGTH;
    const RADIANS = this._LENGTH + 5;
    

    // triangle
    const triangle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    triangle.moveTo(HORIZON + (LENGTH / 1.2), CENTER - (LENGTH / 3));
    triangle.lineTo(HORIZON + (LENGTH / 0.8), CENTER);
    triangle.lineTo(HORIZON + (LENGTH / 0.6), CENTER - (LENGTH / 3));
    ctx.stroke(triangle);

    // circleLine
    const circleLine = new Path2D();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    circleLine.arc(HORIZON + 10, CENTER, RADIANS / 2, 0, 180);
    ctx.stroke(circleLine);

    // circle
    const circle = new Path2D();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    circle.arc(HORIZON + 10, CENTER, RADIANS, 0, 2 * Math.PI);
    ctx.stroke(circle);
    
    return [HORIZON+LENGTH,CENTER,RADIANS];
  },
  
}

export function renderField() {

  // background
  fillBackGround();

  // line settings
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  
  // outline
  const outline = new Path2D();
  outline.rect(GRID_SIZE.STANDARD, GRID_SIZE.STANDARD, GRID_SIZE.HORIZON, GRID_SIZE.VERTICAL);
  ctx.stroke(outline);

  // grid
  const grid = new Path2D();

  // horizon line
  for (let i = GRID_SIZE.STEP + GRID_SIZE.STANDARD; i < GRID_SIZE.VERTICAL; i += GRID_SIZE.STEP){
    grid.moveTo(GRID_SIZE.STANDARD, i);
    grid.lineTo(GRID_SIZE.HORIZON + GRID_SIZE.STANDARD, i);
  }
  // vertical line
  for (let i = GRID_SIZE.STEP + GRID_SIZE.STANDARD; i < GRID_SIZE.HORIZON; i += GRID_SIZE.STEP){
    grid.moveTo(i, GRID_SIZE.STANDARD);
    grid.lineTo(i, GRID_SIZE.VERTICAL + GRID_SIZE.STANDARD);
  }
  ctx.stroke(grid);

  // touch button
  TouchAction.left();
  TouchAction.right();
  TouchAction.down();
  TouchAction.rotate();

  // HUD
  ctx.font = `${TEXT.FONTSIZE + TEXT.FONT}`;
  ctx.fillStyle = 'rgb(255,255,255,0.9)';
  const nextWdith = Math.floor(ctx.measureText(TEXT.NEXT).width);
  const levelWdith = Math.floor(ctx.measureText(TEXT.LEVEL).width);
  const lineWdith = Math.floor(ctx.measureText(TEXT.LINE).width);
  const levelNumberWidth = Math.floor(ctx.measureText(State.Info.level.toString()).width);
  const lineNumberWidth = Math.floor(ctx.measureText(State.Info.completedRow.toString()).width);
  
  ctx.fillText(TEXT.NEXT,
            (GRID_SIZE.HORIZON + Data.canvas.width - (nextWdith / 2)) / 2,
            GRID_SIZE.STEP - GRID_SIZE.STANDARD);
  ctx.fillText(TEXT.LEVEL,
            (GRID_SIZE.HORIZON + Data.canvas.width - (levelWdith / 2)) / 2,
            (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 7)) );
  ctx.fillText(State.Info.level.toString(),
            (GRID_SIZE.HORIZON + Data.canvas.width - (levelNumberWidth / 2)) / 2,
            (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 5) ) );
  ctx.fillText(TEXT.LINE,
            (GRID_SIZE.HORIZON + Data.canvas.width - (lineWdith / 2)) / 2,
            (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 3) ) );
  ctx.fillText(State.Info.completedRow.toString(),
            (GRID_SIZE.HORIZON + Data.canvas.width - (lineNumberWidth / 2)) / 2,
            (GRID_SIZE.VERTICAL - (GRID_SIZE.QUEUE_STEP * 1) ) );

  if(Debug.Settings.console) {
    ctx.fillText('bottom',Data.canvas.width / 2, GRID_SIZE.VERTICAL)
  }
}

export function renderBlock(fieldArray: Data.field) {

  fieldArray.forEach((v,i)=>{
    if(v === Data.STRING.EMPTY) {
      return;
    }
    
    // draw controllable block
    if(v === Data.STRING.CURRENT) {
      ctx.fillStyle = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                  (Math.floor(i / Data.NUMBER.ROW) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                                        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
      ctx.fill();

    // draw fixed block
    }
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

  // only one block to pick
  //const num = State.blockQueue.queue[1];
  //const block = State.rotatedBlock(QueueProp.BLOCKS[num].number, angle, false, num);
  //block.forEach(v => queue[v] = num);
  
  // pick block number form block queue
  const nums = State.blockQueue.queue.slice(1, 4);

  nums.forEach((v,i)=> {
    let angle = 0;
    let start = 0;
    let temp = State.rotatedBlock(QueueProp.BLOCKS[v].number, angle, false, v);

    // fix positions
    if(v === 0) {
      angle = 0;
    }
    if(v !== 0) {
      angle = Data.NUMBER.DEGREES;
    }
    if(v === 1) {
      temp.forEach((_,i,arr) => { arr[i] -= (Data.NUMBER.ROW - 1) })
    }
    if(v === 2) {
      angle = Data.NUMBER.DEGREES * 3;
      temp.forEach((_,i,arr) => { arr[i] -= Data.NUMBER.ROW });
    }
    if(v === 3) {
      temp.forEach((_,i,arr) => { arr[i] += (Data.NUMBER.ROW + 1) }) 
    }
    if(v === 4) {
      temp.forEach((_,i,arr) => { arr[i] += (Data.NUMBER.ROW + 1) })
      temp[3] -= Data.NUMBER.ROW * 2;
    }
    if(v === 5) {
      temp.forEach((_,i,arr) => { arr[i] -= (Data.NUMBER.ROW + 1) })
    }
    if(v === 6) {
      temp.forEach((_,i,arr) => { arr[i] -= 1 })
    }
  
    
    if( i === 0) {
      temp.forEach(w => queue[w] = v);
    }
    if( i === 1) {
      start += 30;
      temp.forEach(w => queue[w+start] = v);
    }
    if( i === 2) {
      start += 60;
      temp.forEach(w => queue[w+start] = v);
    }
  })
  
  queue.forEach((v,i)=>{
    if(v === Data.STRING.EMPTY) {
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