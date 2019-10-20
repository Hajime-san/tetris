import * as Data from './data';
import * as Fn from './function';
import * as State from './state';

const ctx = Data.canvas.getContext('2d');
const canvasWidth = Data.canvas.width;
const canvasHeight = Data.canvas.height;

const GRID_SIZE = {
  HORIZON: 270,
  VERTICAL: 378,
  STANDARD: 7,
  STEP: 27,
}

const TEXT = {
  FONT: 'Osaka',
  FONTSIZE: '16px ',
  NEXT: 'Next',

}

export function clearField() {
	if ( !ctx) {
    return;
  }
  ctx.clearRect(GRID_SIZE.STANDARD - 7,
                GRID_SIZE.STANDARD - 7,
                canvasWidth,
                canvasHeight);
}

export function renderField() {
  if ( !ctx) {
    return;
  }

  // line settings
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  

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

  // info
  ctx.font = `${TEXT.FONTSIZE + TEXT.FONT}`;
  ctx.fillText(TEXT.NEXT, 325, 20);

}

export function renderBlock(fieldArray: Data.field) {
  if ( !ctx) {
    return;
  }

  fieldArray.forEach((v,i)=>{
    if(v === Data.STRING.EMPTY) {
      return;
    }
    
    // draw controllable block
    if(v === Data.STRING.CURRENT) {
      ctx.fillStyle = State.Block.deepCopy.BLOCKS[State.Block.blockNumber].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                  (Math.floor(i / 10) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                                        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
      ctx.fill();

    // draw fixed block
    }
    if (v !== Data.STRING.CURRENT && typeof v === 'number') {
      ctx.fillStyle = State.Block.deepCopy.BLOCKS[v].color;
      ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                  (Math.floor(i / 10) * GRID_SIZE.STEP) + (GRID_SIZE.STANDARD + 1),
                                        GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
      ctx.fill();
    }
  })
}

export function renderQueue(queue: Data.field) {
  if ( !ctx) {
    return;
  }


  const num = State.blockQueue.queue[1];
  console.log(State.blockQueue.queue[1]);
  let angle = 0;

  if(num === 0) {
    angle = 0;
  }
  if(num !== 0 && num !== 2) {
    angle = Data.NUMBER.DEGREES;
  }
  if(num === 2) {
    angle = Data.NUMBER.DEGREES * 3;
  }

  let block = State.rotatedBlock(Data.Prop.BLOCKS[num].number, angle, false);

  
  const translatedBlock = Fn.filterUndef(block.map((v,i,arr)=> {
    if(v < Data.NUMBER.QUEUE_COLUMN) {
      return Math.abs(v -= Data.NUMBER.a)
    }
    if(v > Data.NUMBER.QUEUE_COLUMN) {
      return Math.abs(v -= Data.NUMBER.QUEUE_COLUMN);
    }
  }))
  console.log(translatedBlock);
  translatedBlock.forEach(v => queue[v] = State.blockQueue.queue[1])
  console.log(queue);
  
  
  queue.forEach((v,i)=>{
    if(v === Data.STRING.EMPTY) {
      return;
    }
    
    ctx.fillStyle = Data.Prop.BLOCKS[num].color;
    ctx.fillRect((Fn.fixToFirstDigit(i) * GRID_SIZE.STEP) + (300),
                (Math.floor(i / Data.NUMBER.QUEUE_ROW) * GRID_SIZE.STEP) + (20),
                                      GRID_SIZE.STEP - 2, GRID_SIZE.STEP - 2);
    ctx.fill();
  })  

}