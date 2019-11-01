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
  if(ScreenSize.getWidth > 400) {
    Data.canvas.width = 400;
    Data.canvas.height = 600;
  }
  if(ScreenSize.getHeight < 600) {
    Data.canvas.height = ScreenSize.getHeight;
  }
  if(ScreenSize.getWidth < 401 && ScreenSize.getWidth > 320) {
    Data.canvas.width = ScreenSize.getWidth;
    Data.canvas.height = 600;

    Render.GRID_SIZE.HORIZON = Math.floor(Render.GRID_SIZE.HORIZON * 0.9);

    Render.GRID_SIZE.STEP = Render.GRID_SIZE.HORIZON / 10;

    Render.GRID_SIZE.getVertical();

    Render.GRID_SIZE.QUEUE_STEP = Render.GRID_SIZE.STEP - Render.GRID_SIZE.STANDARD;
    
  }

  if(ScreenSize.getWidth < 321) {
    Data.canvas.width = ScreenSize.getWidth;

    Render.GRID_SIZE.HORIZON = Math.floor(Render.GRID_SIZE.HORIZON * 0.75);

    Render.GRID_SIZE.STEP = Render.GRID_SIZE.HORIZON / 10;

    Render.GRID_SIZE.getVertical();

    Render.GRID_SIZE.QUEUE_STEP = Render.GRID_SIZE.STEP - Render.GRID_SIZE.STANDARD;

  }

}