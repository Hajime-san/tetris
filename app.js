const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let left = true;
let right = true;
let down = true;
let stop = false;
let isComplete = false;
const ROW = 9;
const COLUMN = 14;

/**
 * Array
 * @param {number} 0 - clear areas
 * @param {number} 1 - movable block area
 * @param {number} 2 - fixed block area
 */
let field = [
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  2,0,0,0,0,0,0,0,0,0,
  2,0,0,0,0,0,0,0,0,0,
  2,0,0,0,0,0,0,0,0,0,
  2,0,0,0,0,0,0,0,0,0,
  2,0,0,0,0,0,0,0,0,2,
  2,2,2,2,2,2,0,0,0,2,
  0,2,2,0,0,0,2,0,2,2,
  2,2,2,2,0,2,2,2,2,2
];

let a = 4;

let BLOCKS = {
  A : [a,a+1,a+ROW+1,a+ROW+2],
  B : [a,a+1,a+2,a+3],
  C : [a,a+1,a+2,a+ROW+2],
  D : [a,a+1,a+2,a+ROW+1],
  E : [a,a+1,a+2,a+ROW+3],
  F : [a,a+1,a+ROW,a+ROW+1],
  G : [a-1,a,a+ROW+1,a+ROW+2]
};

function updateBlocks(parts,count) {
  for(let i = 0; i < parts.length; i++){
    parts[i] += count;
  }
}

function updateField() {
  BLOCKS.C.forEach((e,i) => {
    field[BLOCKS.C[i]] = 1;
  });
}

function clearField() {
  field.forEach((e,i) => {
    if (e !== 2) {
      field[i] = 0;
    }
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, 300, 420);
}

function blockMovable() {
  left = true;
  right = true;
  down = true;

  // check movable around block
  field.forEach((e,i) => {
    if(e === 2) {
      BLOCKS.C.forEach((d,j) => {
        if(BLOCKS.C[j] === (i+1)) {
          console.log('left failed');
          left = false;
        } else if(BLOCKS.C[j] === (i-1)) {
          console.log('right failed');
          right = false;
        } else if(field[i-10] === 1) {
          console.log('down failed');
          down = false;
        }
      })
    }
  });

  
  BLOCKS.C.forEach((e,i) => {
    // check last row
    let isLastRow = field.some(v => BLOCKS.C[i] >= field.length - ROW);
    if(isLastRow) {
      console.log('down failed');
      down = false;
    }

    // check left/right walls
    if(BLOCKS.C[i].toFixed().substr(-1, 1) === (ROW+1).toFixed().substr(-1, 1)) {
      console.log('left failed');
      left = false;
    } else if(BLOCKS.C[i].toFixed().substr(-1, 1) === ROW.toFixed()) {
      console.log('right failed');
      right = false;
    }
  })
  
}


function isBlocksGathersInRow() {
  if(left === false && right === false && down === false) {
    isComplete = true;

    let oneRowArray = []; // creat Array on each rows
    let start = 0;
    let end = ROW+1;
    for(let i = 0; i < COLUMN; i++){
      let oneROW = field.slice(start,end);
      oneRowArray.push(oneROW);
      start += ROW+1;
      end += ROW+1;
    }

    let completeRowArray = []; // should delete areas
    let completeRowNumbers = []; // row number
    oneRowArray.forEach((e,i)=>{
      const isIncludeZero = e.every(item => item !== 0);
      if(isIncludeZero) {
        completeRowNumbers.push(i)
        for(let j = 0; j < ROW+1; j++){
          completeRowArray.push(i*(ROW+1)+j);
        }
      }
    })

    // delete complete rows
    completeRowArray.forEach((e,i)=>{
      field[e] = 0;
    })
    clearCanvas();
    draw();

    // move blocks
    field.forEach((e,i) => {
      if (i < completeRowNumbers[0]*(ROW+1)) {        
        if(e === 1 || e === 2) {
          field[i] = 0;
          field[i+(completeRowNumbers.length*(ROW+1))] = 2;
        }
      }
    });

    console.log(field);
    

    setTimeout(clearCanvas, 1500);
    setTimeout(draw, 1500);

    
  }
}


function draw() {
  if (canvas.getContext) {
    let outline = new Path2D();
    outline.rect(0, 0, 300, 420);
    ctx.stroke(outline);
    let rectangle = new Path2D();
    
    field.forEach((e,i)=>{
      if(e === 1) {
        rectangle.rect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
        ctx.fill(rectangle);
      } else if (e === 2) {
        rectangle.rect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
        ctx.fill(rectangle);
      } 
    })
    
  }
}

window.addEventListener('keydown', event => {
  // down direction
  if (event.isComposing || event.keyCode === 40 && down) {   
    console.log('down')
    updateBlocks(BLOCKS.C,10);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    isBlocksGathersInRow();
  // left direction
  } else if (event.isComposing || event.keyCode === 37 && left) {
    console.log('left')
    updateBlocks(BLOCKS.C,-1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    isBlocksGathersInRow();
  // right direction
  } else if (event.isComposing || event.keyCode === 39 && right) {
    console.log('right');
    updateBlocks(BLOCKS.C,1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    isBlocksGathersInRow();
  }
  
});


window.addEventListener('load',()=>{
  updateField();
  draw();
  blockMovable();
})


