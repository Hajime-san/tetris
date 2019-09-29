const canvas = document.getElementById('canvas').getContext('2d');
let controllableBlock = 0;
let nowBlocks = [];
let howManyFall = 0;
let left = true;
let right = true;
let down = true;
let angle = 0;
let stop = false;
let isComplete = false;
const ROW = 10;
const COLUMN = 14;

/**
 * Array
 * @param {number} 0 - clear areas
 * @param {number} 1 - moving block area
 * @param {number} 2 - fixed block area
 */
let field = [
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',
  'empty','empty','empty','empty','empty','empty','empty',1,'empty','empty',
  'empty','empty','empty','empty','empty','empty','empty',1,'empty','empty',
  0,0,'empty','empty','empty','empty','empty',1,0,0,
  0,0,1,1,1,1,'empty',1,0,0
];
//let field = [...Array(COLUMN*ROW)].forEach(()=> field = false);

const a = 4;

const BLOCKS = [
  {
    number: [a,a+1,a+ROW,a+ROW+1],
    color: 'red',
  },
  {
    number: [a,a+ROW,a+(ROW*2),a+(ROW*3)],
    color: 'blue',
  },
  {
    number: [a,a+1,a+ROW,a+(ROW*2)],
    color: 'green',
  },
  {
    number: [a,a+1,a+ROW+1,a+(ROW*2)+1],
    color: 'orange',
  },
  {
    number: [a,a+ROW,a+ROW+1,a+(ROW*2)],
    color: 'yellow',
  },
  {
    number: [a,a+ROW,a+ROW+1,a+(ROW*2)+1],
    color: 'purple',
  },
  {
    number: [a+1,a+ROW,a+ROW+1,a+(ROW*2)],
    color: 'pink',
  },
];

let copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));


function createNewBlock() {
  controllableBlock = 5;
  //return controllableBlock = Math.floor( Math.random() * BLOCKS.length );
}

function updateBlocks(parts,direction) {
  const dir = (
    (direction === 'down') ? ROW
  : (direction === 'left') ? -1
  : (direction === 'right') ? 1
  : null );
  for(let i = 0; i < parts.length; i++){
    parts[i] += dir;
  }
}

function fixToFirstDigit(number) {
  return number.toFixed().substr(-1, 1);
}

function resetBlocks() {
  copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));
}


function updateField(array) {
  array.forEach((v) => {
    field[v] = 'current';
  });
}

function clearField() {
  nowBlocks.forEach((v) => {
    field[v] = 'empty';
  });
}

function controllableBlocksNumber() {
  nowBlocks.length = 0;
  field.forEach((v,i) => {
    if (v === 'current') {
      nowBlocks = [...nowBlocks,i];
    }
  });
}
function clearCanvas() {
  canvas.clearRect(0, 0, 300, 420);
}

function blockMovable() {
  left = true;
  right = true;
  down = true;

  // check movable around block
  field.forEach((v,i) => {
    if(typeof v !== "number") {
      return;
    }
    copyBLOCKS[controllableBlock].number.forEach((_,j,arr) => {
      if(arr[j] === (i+1)) {
        console.log('left failed');
        left = false;
      }
      if(arr[j] === (i-1)) {
        console.log('right failed');
        right = false;
      }
      if(field[i-ROW] === true) {
        console.log('down failed');
        down = false;
      }
    })
  })
  
  
  
  copyBLOCKS[controllableBlock].number.forEach((v,i,arr) => {
    // check last row
    const isLastRow = field.some(some => v >= field.length - ROW);
    if(isLastRow) {
      console.log('last row');
      down = false;
    }

    // check left/right walls if its number of the first digit is 0(left)/9(right)
    if(fixToFirstDigit(arr[i]) === fixToFirstDigit(ROW)) {
      console.log('left walled');
      left = false;
    }
    if(fixToFirstDigit(arr[i]) === fixToFirstDigit(ROW-1)) {
      console.log('right walled');
      right = false;
    }
  })
  
}

function rotateAngle() {
  angle += 90
  if(angle === 360) {
    angle = 0;
  }
}


function translateNumberToRect(num,o) {
  if(num <= o && (o - num) <= 2 ) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  }
  if (num >= o && (num - o) <= 2) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  }
  if (num <= o && (o - num) >= 3 && (o - num) <= 13) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), 1];
  }
  if (num >= o && (num - o) >= 3 && (num - o) <= 13) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), -1];
  }
  if (num <= o && (o - num) >= 3 && (o - num) >= 13) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), 2];
  }
  if (num >= o && (num - o) >= 3 && (num - o) >= 13) {
    return [fixToFirstDigit(num) - fixToFirstDigit(o), -2];
  }
}

function rotate(rect) {
  const radians = (Math.PI / 180) * 90,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (rect[0] - 0)) + (sin * (rect[1] - 0));
      ny = (cos * (rect[1] - 0)) - (sin * (rect[0] - 0));
  return [Math.round(nx), Math.round(ny)];
}

function translateRectToNum(rotateRect) {
  if(rotateRect[0] === 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW);
  }
  if(rotateRect[0] === 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW);
  }
  if(rotateRect[0] === 0 && rotateRect[1] > 0 ){
    return (rotateRect[1]*ROW);
  }
  if(rotateRect[0] > 0 && rotateRect[1] === 0 ){
    return rotateRect[0];
  }
  if(rotateRect[0] < 0 && rotateRect[1] === 0 ){
    return rotateRect[0];
  }
  if(rotateRect[0] > 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  }
  if(rotateRect[0] > 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  }
  if(rotateRect[0] < 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  }
  if(rotateRect[0] < 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  }
  if(rotateRect[0] === 0 && rotateRect[1] === 0 ){
    return 0;
  }
}



function blockRotatableArray() {
  // position of organization point
  let center;
  // fix position after rotated
  let fixPosition;
  
  // cant rotate when it's square
  if(controllableBlock === 0) {
    return;
  }

  // bar block
  if(controllableBlock === 1){
    center = 1;
  }
  if(controllableBlock === 1 && angle === 0){
    fixPosition = 0;
  } else if(controllableBlock === 1 && angle === 270){
    fixPosition = 0;
  } else {
    fixPosition = 1;
  }

  // reverse L block
  if(controllableBlock === 2){
    fixPosition = 0;
  }
  if(controllableBlock === 2 && angle === 0){
    center = 2;
  } else if (controllableBlock === 2 && angle === 90) {
    center = 2;
  } else {
    center = 1;
  }

  // L block
  if(controllableBlock === 3){
    fixPosition = 0;
  }
  if(controllableBlock === 3 && angle === 0){
    center = 1;
  } else if (controllableBlock === 3 && angle === 90) {
    center = 2;
  } else if (controllableBlock === 3 && angle === 180) {
    center = 2;
  } else if (controllableBlock === 3 && angle === 270) {
    center = 1;
  }

  // T block
  if(controllableBlock === 4){
    fixPosition = 0;
  }
  if(controllableBlock === 4 && angle === 0){
    center = 0;
  } else if (controllableBlock === 4 && angle === 90) {
    center = 2;
  } else if (controllableBlock === 4 && angle === 180) {
    center = 3;
  } else if (controllableBlock === 4 && angle === 270) {
    center = 1;
  }

  // _| block
  if(controllableBlock === 5){
    fixPosition = 0;
  }
  if(controllableBlock === 5 && angle === 0){
    center = 3;
    fixPosition = -(ROW+1);
  } else if (controllableBlock === 5 && angle === 90) {
    center = 2;
  } else if (controllableBlock === 5 && angle === 180) {
    center = 3;
  } else if (controllableBlock === 5 && angle === 270) {
    center = 2;
    fixPosition = ROW-1;
  }

  // |_ block
  if(controllableBlock === 6){
    center = 2;
    fixPosition = 0;
  }
  if (controllableBlock === 6 && angle === 0) {
    fixPosition = -(ROW+1);
  }
  if (controllableBlock === 6 && angle === 270) {
    fixPosition = ROW-1;
  }
  
  
  const rotateBlocks = nowBlocks.map((v)=>{
            num = translateNumberToRect(v,nowBlocks[center])
            rect = rotate(num)
            update = translateRectToNum(rect)
    return update+nowBlocks[center]+fixPosition;

  })
  return rotateBlocks;
}




function isBlocksGathersInRow() {
  if(left === false && right === false && down === false) {
    isComplete = true;

    let start = 0;
    let end = ROW;
    const oneRowArray = [...Array(COLUMN)].map(()=>{
      oneROW = field.slice(start,end);
      start += ROW;
      end += ROW;
      return oneROW;
    })

    let completeRowArray = []; // should delete areas
    let completeRowNumbers = []; // row numbers
    oneRowArray.forEach((v,i)=>{
      // skip if the row include 0
      const isIncludeZero = v.every(item => item !== 'empty');
      if(isIncludeZero) {
        
        completeRowNumbers.push(i);

        [...Array(ROW)].forEach((_,j)=>{
          completeRowArray.push((i*ROW)+j);
        })
      }
    })

    // delete complete rows
    completeRowArray.forEach((v)=>{ field[v] = 'empty'; })
    clearCanvas();
    draw();

    // move blocks as the amount of deleted rows
    const lowerBlocks = field.map((v,i,arr)=>{
      if (i >= completeRowNumbers[0]*ROW) {
        return;
      }
      if(v !== 'empty') {
        arr[i] = 'empty';
        return [v,i+(completeRowNumbers.length*ROW)];
      }
    }).filter(f => f);
    
    lowerBlocks.forEach((v) => {
      field[v[1]] = v[0]
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

  }
}


function draw() {
  if (!canvas) {
    return;
  }
  let outline = new Path2D();
  outline.rect(0, 0, 300, 420);
  canvas.stroke(outline);
  
  field.forEach((v,i)=>{
    // draw controllable block
    if(v !== 'empty' && v === 'current') {
      canvas.fillStyle = copyBLOCKS[controllableBlock].color;
      canvas.fillRect(fixToFirstDigit(i)*30, Math.floor(i/10)*30, 30, 30);
      canvas.fill();
    // draw fixed block
    }
    if (v !== 'empty' && v !== 'current') {
      canvas.fillStyle = copyBLOCKS[v].color;
      canvas.fillRect(fixToFirstDigit(i)*30, Math.floor(i/10)*30, 30, 30);
      canvas.fill();
    }
  })
}

window.addEventListener('keydown', event => {
  // down direction
  if (event.isComposing || event.keyCode === 40 && down) {   
    console.log('down')
    updateBlocks(copyBLOCKS[controllableBlock].number,'down');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();

  // left direction
  } else if (event.isComposing || event.keyCode === 37 && left) {
    console.log('left')
    updateBlocks(copyBLOCKS[controllableBlock].number,'left');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();

  // right direction
  } else if (event.isComposing || event.keyCode === 39 && right) {
    console.log('right');
    updateBlocks(copyBLOCKS[controllableBlock].number,'right');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();
    
  } else if (event.isComposing || event.keyCode === 38 && rotate) {
    console.log('rotate');
    rotateAngle();
    console.log(angle);
    clearField();
    clearCanvas();
    updateField(blockRotatableArray());
    draw();
    
  }

  
  blockMovable();
  
  controllableBlocksNumber();
  
  if(down === false) {
    resetBlocks();
    field.forEach((v,i)=>{
      if(v === 'current') {
        field[i] = controllableBlock;
      }
    })
  //   controllableBlocksNumber();
  //   clearField();
  //   clearCanvas();
  //   createNewBlock();
  //   updateField();
  //   controllableBlocksNumber();
  //   draw();
  //   down = true;
  }

  isBlocksGathersInRow();
  console.log(field);
  console.log(nowBlocks);
  
});


window.addEventListener('load',()=>{
  createNewBlock();
  updateField(copyBLOCKS[controllableBlock].number);
  draw();
  controllableBlocksNumber();
  blockMovable();
  console.log(field);
})
