import * as UA from './ua';
import * as Data from './data';
import * as State from './state';

export const UserEvent =　 {

  _flag: false,

  rotate: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
    }
    if (event.keyCode === Data.NUMBER.UP_KEY) {
      console.log('up inputted');
      return this._flag = true;
    }
    return this._flag = false;
  },
  left: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
      
    }
    if (event.keyCode === Data.NUMBER.LEFT_KEY) {
      console.log('left inputted');
      return this._flag = true;
    }
    return this._flag = false;
  },
  right: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
      
    }
    if (event.keyCode === Data.NUMBER.RIGHT_KEY) {
      console.log('right inputted');
      return this._flag = true;
    }
    return this._flag = false;
  },
  down: function(event: KeyboardEvent) {
    if(UA.isTouchEnabled) {
      
    }
    if (event.keyCode === Data.NUMBER.DOWN_KEY) {
      console.log('down inputted');
      return this._flag = true;
    }
    return this._flag = false;
  },

  pauseInput: function() {
    return this._flag = false;
  }
}

export const addMultipleEventListener = (element: Element | null, eventNames: string, listener: EventListener): void => {
  const target = element as EventTarget;
  const events = eventNames.split(" ");
  events.forEach((event: string) =>
    target.addEventListener(event, listener, false)
  );
};