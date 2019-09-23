const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let controllableBlock = 0;
let nowBlocks = [];
let howManyFall = 0;
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
 * @param {number} 1 - moving block area
 * @param {number} 2 - fixed block area
 */
let field = [
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0,
  // 0,0,0,0,0,0,0,0,0,0
];
for(let i = 0; i < COLUMN*(ROW+1); i++){
  field.push(false)
}

const a = 4;

const BLOCKS = [
  {
    number: [a,a+1,a+ROW+1,a+ROW+2],
    color: 'red',
  },
  {
    number: [a,a+1,a+2,a+3],
    color: 'blue',
  },
  {
    number: [a,a+1,a+2,a+ROW+2],
    color: 'green',
  },
  {
    number: [a,a+1,a+2,a+ROW+1],
    color: 'yellow',
  },
  {
    number: [a,a+1,a+2,a+ROW+3],
    color: 'orange',
  },
  {
    number: [a,a+1,a+ROW,a+ROW+1],
    color: 'purple',
  },
  {
    number: [a-1,a,a+ROW+1,a+ROW+2],
    color: 'gray',
  },
];

let copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS))

function createNewBlock() {
  return controllableBlock = Math.floor( Math.random() * BLOCKS.length );
  //return controllableBlock = 1;
}

function updateBlocks(parts,count) {
  for(let i = 0; i < parts.length; i++){
    parts[i] += count;
  }
}

function resetBlocks() {
  copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));
}


function updateField() {
  copyBLOCKS[controllableBlock].number.forEach((e,i) => {
    field[e] = true;
  });
}

function clearField() {
  nowBlocks.forEach((e,i) => {
    field[e] = false;
  });
}

function controllableBlocksNumber() {
    nowBlocks.length = 0;
    field.forEach((e,i) => {
      if (e === true) {
        nowBlocks = [...nowBlocks,i]
      }
    });
}
function clearCanvas() {
  ctx.clearRect(0, 0, 300, 420);
}

function blockMovable() {
  return new Promise((resolve)=>{
    left = true;
    right = true;
    down = true;

    // check movable around block
    field.forEach((e,i) => {
      if(e !== false && e !== true) {
        copyBLOCKS[controllableBlock].number.forEach((d,j) => {
          if(copyBLOCKS[controllableBlock].number[j] === (i+1)) {
            console.log('left failed');
            left = false;
          } else if(copyBLOCKS[controllableBlock].number[j] === (i-1)) {
            console.log('right failed');
            right = false;
          } else if(field[i-(ROW+1)] === true) {
            console.log('down failed');
            down = false;
          }
        })
      }
    });
    
    
    copyBLOCKS[controllableBlock].number.forEach((e,i) => {
      // check last row
      const isLastRow = field.some(v => e >= field.length - (ROW+1));
      if(isLastRow) {
        console.log('last row');
        down = false;
      }

      // check left/right walls if its number of the first digit is 0(left)/9(right)
      if(copyBLOCKS[controllableBlock].number[i].toFixed().substr(-1, 1) === (ROW+1).toFixed().substr(-1, 1)) {
        console.log('left walled');
        left = false;
      } else if(copyBLOCKS[controllableBlock].number[i].toFixed().substr(-1, 1) === ROW.toFixed()) {
        console.log('right walled');
        right = false;
      }
    })
    resolve()
  })
  
}


function isBlocksGathersInRow() {
  return new Promise((resolve)=>{
    if(left === false && right === false && down === false) {
      isComplete = true;
  
      let oneRowArray = []; // creat Array on each rows
      let start = 0;
      let end = ROW+1;
      for(let i = 0; i < COLUMN; i++){
        let oneROW = field.slice(start,end);
        //oneRowArray.push(oneROW);
        oneRowArray = [...oneRowArray,oneRow];
        start += ROW+1;
        end += ROW+1;
      }
  
      let completeRowArray = []; // should delete areas
      let completeRowNumbers = []; // row numbers
      oneRowArray.forEach((e,i)=>{
        // skip if the row include 0
        const isIncludeZero = e.every(item => item !== 0);
        if(isIncludeZero) {
          completeRowNumbers.push(i)
          for(let j = 0; j < ROW+1; j++){
            completeRowArray.push(i*(ROW+1)+j);
          }
        }
      })
      
  
      // delete complete rows
      completeRowArray.forEach((e,i)=>{ field[e] = 0; })
      clearCanvas();
      draw();
  
      // move blocks as the amount of deleted rows
      const lowerBlocks = field.map((e,i)=>{
        if (i <= completeRowNumbers[0]*(ROW+1)) {
          if(e === 1 || e === 2) {
            field[i] = 0;
            return i+((completeRowNumbers.length)*(ROW+1));
          }
        }
      })
      lowerBlocks.forEach((e,i) => {
        field[e] = 2;
      });
  
      setTimeout(clearCanvas, 1500);
      setTimeout(draw, 1500);
  
      
      // let c = [95,103,104,105];
      // let ee = [];
      // field.forEach((e,i) => {
      //   if(e === 0) {
      //     c.forEach((d,j) => {
      //       if(field[i-(ROW+1)] === 2) {
      //         field[d] = 0;
      //         ee.push(d+(ROW+1));
      //       }
      //     })
      //   }
      // })
      
      // ee.forEach((e,i) => {
      //   field[e] = 2;
      // });
      //stop = true;
      
      resolve();
      
      
      // setTimeout(clearCanvas, 1500);
      // setTimeout(draw, 1500);
      
  
    }
  })
}


function draw() {
  if (canvas.getContext) {
    let outline = new Path2D();
    outline.rect(0, 0, 300, 420);
    ctx.stroke(outline);
    
    field.forEach((e,i)=>{
      if(e !== false && e === true) {
        ctx.fillStyle =copyBLOCKS[controllableBlock].color;
        ctx.fillRect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
        ctx.fill();
      } else if (e !== false && e !== true) {
        ctx.fillStyle =copyBLOCKS[e].color;
        ctx.fillRect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
        ctx.fill();
      }
      // } else if (e === 2) {
      //   ctx.fillStyle =　'black';
      //   ctx.fillRect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
      //   ctx.fill();
      // } 
    })
    
  }
}

window.addEventListener('keydown', event => {
  // down direction
  if (event.isComposing || event.keyCode === 40 && down) {   
    console.log('down')
    updateBlocks(copyBLOCKS[controllableBlock].number,10);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    //isBlocksGathersInRow();
  // left direction
  } else if (event.isComposing || event.keyCode === 37 && left) {
    console.log('left')
    updateBlocks(copyBLOCKS[controllableBlock].number,-1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    //isBlocksGathersInRow();
  // right direction
  } else if (event.isComposing || event.keyCode === 39 && right) {
    console.log('right');
    updateBlocks(copyBLOCKS[controllableBlock].number,1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
    //isBlocksGathersInRow();
  }
  controllableBlocksNumber();
  if(down === false) {
    console.log('CREATE!!!!!');
    console.log(controllableBlock);
    resetBlocks();
    field.forEach((e,i)=>{
      if(e === true) {
        field[i] = controllableBlock;
      }
    })
    controllableBlocksNumber();
    clearField();
    clearField();
    clearCanvas();
    createNewBlock();
    updateField();
    controllableBlocksNumber();
    draw();
    down = true;
    console.log(field);
    console.log(BLOCKS[1].number);
  }

  
});


window.addEventListener('load',()=>{
  createNewBlock();
  updateField();
  draw();
  blockMovable();
  controllableBlocksNumber();
})

