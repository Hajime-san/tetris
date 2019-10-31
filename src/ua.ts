import * as Data from './data';
import * as Render from './render';

// check touch device
export function isTouchEnabled() { 
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) ||  
         ( navigator.msMaxTouchPoints > 0 ); 
}

// check device screen size
export const ScreenSize = {

  getWidth: window.parent.screen.width,

  getHeight: window.parent.screen.height,

}

// resize canvas size
export function resizeCanvasArea() {
  if(ScreenSize.getWidth < 401) {
    Data.canvas.width = ScreenSize.getWidth * 0.9;

    //Render.GRID_SIZE.HORIZON = Math.floor(Render.GRID_SIZE.HORIZON * 0.675);

    //Render.GRID_SIZE.STEP = Render.GRID_SIZE.HORIZON / 10;

    //Render.GRID_SIZE.QUEUE_STEP = Render.GRID_SIZE.STEP - Render.GRID_SIZE.STANDARD;
  }
}