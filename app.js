const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let left = true;
let right = true;
let down = true;
const ROW = 9;

let field = [
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,2,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,2,
  0,0,0,0,0,0,2,2,2,2
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
    if (field[i] !== 2) {
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

  field.forEach((e,i) => {
    if(field[i] === 2) {
      BLOCKS.C.forEach((d,j) => {
        console.log(field[i-10]);
        
        if(BLOCKS.C[j] === ( i+1)) {
          console.log('left failed');
          left = false;
        } else if(BLOCKS.C[j] === ( i-1)) {
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


function draw() {
  if (canvas.getContext) {
    let outline = new Path2D();
    outline.rect(0, 0, 300, 420);
    ctx.stroke(outline);
    let rectangle = new Path2D();
    
    field.forEach((e,i)=>{
      if(field[i] === 1) {
        rectangle.rect((i.toFixed().substr(-1, 1))*30, Math.floor(i/10)*30, 30, 30);
        ctx.fill(rectangle);
      } else if (field[i] === 2) {
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
  // left direction
  } else if (event.isComposing || event.keyCode === 37 && left) {
    console.log('left')
    updateBlocks(BLOCKS.C,-1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
  // right direction
  } else if (event.isComposing || event.keyCode === 39 && right) {
    console.log('right');
    updateBlocks(BLOCKS.C,1);
    clearField();
    clearCanvas();
    updateField();
    draw();
    blockMovable();
  }
});


window.addEventListener('load',()=>{
  updateField();
  draw();
  blockMovable();
})


