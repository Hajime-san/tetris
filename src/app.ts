const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let controllableBlock = 0;
let nowBlocks: Array<number> = [];
let tmpBlocks: Array<number> = [];
let howManyFall = 0;
let left = true;
let right = true;
let down = true;
let angle = 0;
// let stop = false;
let isComplete = false;
const ROW = 10;
const COLUMN = 14;


let field: Array< string | number> = [...Array(COLUMN*ROW)].map(v => v = 'empty');


const a = 4;

interface Blocks {
  number: Array<number>;
  color: string;
}

const BLOCKS: Blocks[] = [
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
  //controllableBlock = 5;
  return controllableBlock = Math.floor( Math.random() * BLOCKS.length );
}

function updateBlocks(parts: Array<number>,direction: string) {
  const plus: number = (
    (direction === 'down') ? ROW
  : (direction === 'left') ? -1
  : (direction === 'right') ? 1
  : (direction === 'rotate') ? 0
  : 0 );

  parts.forEach((_,i,arr)=>{
    arr[i] += plus;
  })
  
}

function fixToFirstDigit(digit: number) {
  return Number(digit.toFixed().substr(-1, 1));
}

function resetBlocks() {
  copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));
}


function updateField(array: Array<number>) {
  array.forEach((v) => field[v] = 'current' );
}

function clearField() {
  nowBlocks.forEach((v) => field[v] = 'empty' );
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
	if (!ctx) {
    return;
  }
	ctx.clearRect(0, 0, 300, 420);
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
    copyBLOCKS[controllableBlock].number.forEach((w: number) => {
      if(w === (i+1)) {
        console.log('left failed');
        left = false;
      }
      if(w === (i-1)) {
        console.log('right failed');
        right = false;
      }
      if(field[i-ROW] === 'current') {
        console.log('down failed');
        down = false;
      }
    })
  })
  
  
  
  copyBLOCKS[controllableBlock].number.forEach((v: number,i: number,arr: Array<number>) => {
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

function angleToRadians(num: number) {
	let radians = 1.57;
	radians += (Math.PI / 180) * (num);
	return Number(radians.toFixed(2));
}


function translateNumberToRect(num: number,o: number) {
  let rect: Array<number>;
  if(num <= o && (o - num) <= 2 ) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  } else if (num >= o && (num - o) <= 2) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];
  } else if (num <= o && (o - num) >= 3 && (o - num) <= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 1];
  } else if (num >= o && (num - o) >= 3 && (num - o) <= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -1];
  } else if (num <= o && (o - num) >= 3 && (o - num) >= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 2];
  } else if (num >= o && (num - o) >= 3 && (num - o) >= 13) {
    rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -2];
  } else {
    return [0, 0];
  }
  return rect;
}

function rotate(rect: Array<number>) {
  const radians = (Math.PI / 180) * 90,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (rect[0] - 0)) + (sin * (rect[1] - 0)),
      ny = (cos * (rect[1] - 0)) - (sin * (rect[0] - 0));
  return [Math.round(nx), Math.round(ny)];
}

function translateRectToNum(rotateRect: Array<number>) {
  if(rotateRect[0] === 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW);
  } else if(rotateRect[0] === 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW);
  } else if(rotateRect[0] === 0 && rotateRect[1] > 0 ){
    return (rotateRect[1]*ROW);
  } else if(rotateRect[0] > 0 && rotateRect[1] === 0 ){
    return rotateRect[0];
  } else if(rotateRect[0] < 0 && rotateRect[1] === 0 ){
    return rotateRect[0];
  } else if(rotateRect[0] > 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  } else if(rotateRect[0] > 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  } else if(rotateRect[0] < 0 && rotateRect[1] > 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  } else if(rotateRect[0] < 0 && rotateRect[1] < 0 ){
    return -(rotateRect[1]*ROW)+rotateRect[0]
  } else if(rotateRect[0] === 0 && rotateRect[1] === 0 ){
    return 0;
  } else {
    return 0;
  }
}

function isRotate(array: Array<number>) {
  let leftWall = true;
  let rightWall = true;
  // wall check left/right
  array.forEach((v)=>{
    if(fixToFirstDigit(v) === fixToFirstDigit(ROW)) {
      leftWall = false;
    }
    if(fixToFirstDigit(v) === fixToFirstDigit(ROW-1)) {
      rightWall = false;
    }
  })

  // fixed block check
  let isFilled = true;

  field.forEach((v,i)=>{
    if(typeof v !== "number") {
      return;
    }
    array.forEach((w)=>{
      if(i === w) {
        isFilled = false;
      }
    })
  })
  
  
  if(!leftWall && !rightWall || !isFilled) {  
    angle -= 90;
    copyBLOCKS[controllableBlock].number = tmpBlocks;
    return false;
  } else {
    return true;
  }
}

function blockRotatableArray() {
  // position of organization point
  let center: number;
  // fix position after rotated
  let fixPosition: number;
  
  // can't rotate |+| block
  if(controllableBlock === 0) {
    return copyBLOCKS[controllableBlock].number;
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
        let num: Array<number> = translateNumberToRect(v,nowBlocks[center]),
            rect = rotate(num),
            update = translateRectToNum(rect);
    return update+nowBlocks[center]+fixPosition;

  })
  rotateBlocks.sort((a, b) => a - b);
  tmpBlocks = copyBLOCKS[controllableBlock].number;
  return copyBLOCKS[controllableBlock].number = rotateBlocks;
}

function filterUndef<T>(ts: (T | undefined)[]): T[] {
	return ts.filter((t: T | undefined): t is T => !!t)
}


function isBlocksGathersInRow() {
  if(left === false && right === false && down === false) {
    isComplete = true;
		
		// creat Array on each rows
    let start = 0;
		let end = ROW;
    const oneRowArray = [...Array(COLUMN)].map(()=>{
			let oneROW = field.slice(start,end);
      start += ROW;
      end += ROW;
      return oneROW;
		})
		
    let completeRowArray: Array<number> = []; // should delete areas
    let completeRowNumbers: Array<number> = []; // row numbers
    oneRowArray.forEach((v,i)=>{
      // skip if the row include 0
      const isIncludeEmpty = v.every(item => item !== 'empty');
      if(isIncludeEmpty) {
        
        completeRowNumbers.push(i);

        [...Array(ROW)].forEach((_,j)=>{
          completeRowArray.push((i*ROW)+j);
        })
      }
    })
		
    // delete complete rows
		completeRowArray.forEach((v)=> field[v] = 'empty');
		
    clearCanvas();
    draw();

		// move blocks as the amount of deleted rows
		const lowerBlocks: [string|number,number][] = filterUndef(field.map((v,i,arr)=>{
      if (i >= completeRowNumbers[0]*ROW) {
        return;
      }
      if(v !== 'empty') {
        arr[i] = 'empty';
        return [v,i+(completeRowNumbers.length*ROW)];
      }
		}));
		
    lowerBlocks.forEach((v) =>{
			const index = v[1];
			field[index] = v[0] 
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
  if (!ctx) {
    return;
  }
  let outline = new Path2D();
  outline.rect(0, 0, 300, 420);
  ctx.stroke(outline);
  
  field.forEach((v,i)=>{
    // draw controllable block
    if(v !== 'empty' && v === 'current') {
      ctx.fillStyle = copyBLOCKS[controllableBlock].color;
      ctx.fillRect(fixToFirstDigit(i)*30, Math.floor(i/10)*30, 30, 30);
      ctx.fill();
    // draw fixed block
    }
    if (v !== 'empty' && v !== 'current') {
      ctx.fillStyle = copyBLOCKS[v].color;
      ctx.fillRect(fixToFirstDigit(i)*30, Math.floor(i/10)*30, 30, 30);
      ctx.fill();
    }
  })
}


window.addEventListener('keydown', event => {
	if(!event.isTrusted) {
		return;
	}
  // down direction
  if (event.keyCode === 40 && down) {   
    console.log('down')
    updateBlocks(copyBLOCKS[controllableBlock].number,'down');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();

  // left direction
  } else if (event.keyCode === 37 && left) {
    console.log('left')
    updateBlocks(copyBLOCKS[controllableBlock].number,'left');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();

  // right direction
  } else if (event.keyCode === 39 && right) {
    console.log('right');
    updateBlocks(copyBLOCKS[controllableBlock].number,'right');
    clearField();
    clearCanvas();
    updateField(copyBLOCKS[controllableBlock].number);
    draw();
    
  } else if (event.keyCode === 38 && rotate) {
    rotateAngle();
    
    if( !isRotate(blockRotatableArray()) ) {
      console.log('cant rotate');
      updateField(copyBLOCKS[controllableBlock].number);
      return;
    } else {
      console.log('rotate');
      clearField();
      clearCanvas();
      updateField(blockRotatableArray());
      updateBlocks(copyBLOCKS[controllableBlock].number,'rotate');
      draw();
    }
    
  }

  
  blockMovable();
  
	controllableBlocksNumber();
	
	isBlocksGathersInRow();
  
 if(down === false) {
   console.log('check');
  angle = 0;
   resetBlocks();
   field.forEach((v,i)=>{
     if(v === 'current') {
       field[i] = controllableBlock;
     }
   })
   controllableBlocksNumber();
   clearField();
   clearCanvas();
   createNewBlock();
	 updateField(copyBLOCKS[controllableBlock].number);
	 controllableBlocksNumber();
	 draw();
	 down = true;
  }
  // console.log(angle);
	// console.log(nowBlocks);
	// console.log(field);
	
});


window.addEventListener('load',()=>{
  createNewBlock();
  updateField(copyBLOCKS[controllableBlock].number);
  draw();
  controllableBlocksNumber();
  blockMovable();
})

