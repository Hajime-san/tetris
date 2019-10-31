import * as UA from './ua';
import * as Data from './data';
import * as Debug from './dev';
import * as Render from './render';

export const UserEvent =　 {

  _flag: false,

  rotate: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
    }
    if (event.keyCode === Data.NUMBER.UP_KEY) {
      if(Debug.Settings.console) {
        console.log('up inputted');
      }
      return this._flag = true;
    }
    return this._flag = false;
  },
  left: function(event: Event) {
    // when touch device
    if(UA.isTouchEnabled()) {
      const mouse = event as MouseEvent;
      // crate hit area
      const button = Object.create(onCanvas);
      button.point(mouse);
      button.figure = 'circle';
      button.square.x = Render.TouchAction.left()[0];
      button.square.y = Render.TouchAction.left()[1];
      button.square.r = Render.TouchAction.left()[2];

      console.log(button);
    
      if (button.hit()) {
        if(Debug.Settings.console) {
          console.log('left tapped');
        }
        return this._flag = true;
      }
      return this._flag = false;
    }

    const key = event as KeyboardEvent;
    if (key.keyCode === Data.NUMBER.LEFT_KEY) {
      if(Debug.Settings.console) {
        console.log('left inputted');
      }
      return this._flag = true;
    }
    return this._flag = false;
  },
  right: function(event: Event) {
    // when touch device
    if(UA.isTouchEnabled()) {
      const mouse = event as MouseEvent;
      // crate hit area
      const button = Object.create(onCanvas);
      button.point(mouse);
      button.figure = 'circle';
      button.square.x = Render.TouchAction.right()[0];
      button.square.y = Render.TouchAction.right()[1];
      button.square.r = Render.TouchAction.right()[2];

      console.log(button);
    
      if (button.hit()) {
        if(Debug.Settings.console) {
          console.log('right tapped');
        }
        return this._flag = true;
      }
      return this._flag = false;
    }

    const key = event as KeyboardEvent;
    if (key.keyCode === Data.NUMBER.RIGHT_KEY) {
      if(Debug.Settings.console) {
        console.log('right inputted');
      }
      return this._flag = true;
    }
    return this._flag = false;
  },
  down: function(event: Event) {
    // when touch device
    if(UA.isTouchEnabled()) {
      const mouse = event as MouseEvent;
      // crate hit area
      const button = Object.create(onCanvas);
      button.point(mouse);
      button.figure = 'circle';
      button.square.x = Render.TouchAction.down()[0];
      button.square.y = Render.TouchAction.down()[1];
      button.square.r = Render.TouchAction.down()[2];
    
      console.log(button);
      
      if (button.hit()) {
        if(Debug.Settings.console) {
          console.log('down tapped');
        }
        return this._flag = true;
      }
      return this._flag = false;
    }

    const key = event as KeyboardEvent;
    if (key.keyCode === Data.NUMBER.DOWN_KEY) {
      if(Debug.Settings.console) {
        console.log('down inputted');
      }
      return this._flag = true;
    }
    return this._flag = false;
  },

  confirm: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
      
    }
    if (event.keyCode === Data.NUMBER.ENTER_KEY) {
      if(Debug.Settings.console) {
        console.log('enter inputted');
      }
      return this._flag = true;
    }
    return this._flag = false;
  },

  pauseInput: function() {
    return this._flag = false;
  }
}

export const onCanvas =　 {

  rect: Data.canvas.getBoundingClientRect(),
  rectX: 0,
  rectY: 0,
  point: function(event: MouseEvent) {
    const x = event.clientX - this.rect.left,
          y = event.clientY - this.rect.top;
    return this.rectX = x, this.rectY = y;
  },
  
  figure: '',

  // tap area
  square: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    r: 0
  },
  // hit check
  hit : function() {
    if(this.figure === '') {
      if(Debug.Settings.console) {
        console.log('property:figure not defined');
      }
      return
    }
    if(this.figure === 'square') {
      return (this.square.x <= this.rectX && this.rectX <= this.square.x + this.square.w)
      && (this.square.y <= this.rectY && this.rectY <= this.square.y + this.square.h)
    }
    if(this.figure === 'circle') {
      return Math.pow(this.square.x - this.rectX, 2) + Math.pow(this.square.y - this.rectY, 2) <= Math.pow(this.square.r, 2);
    }
  }
}