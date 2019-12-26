!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.canvas=document.getElementById("canvas"),t.canvasWidth=t.canvas.width,t.canvasHeight=t.canvas.height,t.NUMBER={ROW:10,COLUMN:16,a:4,DOWN_KEY:40,HARD_DOWN_KEY:90,UP_KEY:38,LEFT_KEY:37,RIGHT_KEY:39,ENTER_KEY:13,PAUSE_KEY:80,LEFT_MOVE:-1,RIGHT_MOVE:1,DEGREES:90,QUEUE_ROW:6,QUEUE_COLUMN:8},t.STRING={EMPTY:"empty",CURRENT:"current",LEFT:"left",RIGHT:"right",DOWN:"down"},t.rgba=[[240,241,77,1],[105,241,240,1],[27,68,241,1],[240,161,63,1],[163,77,240,1],[114,242,63,1],[237,56,51,1]],t.Prop={BLOCKS:[{number:[t.NUMBER.a,t.NUMBER.a+1,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+t.NUMBER.ROW+1],color:`rgba(${t.rgba[0]})`},{number:[t.NUMBER.a,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+2*t.NUMBER.ROW,t.NUMBER.a+3*t.NUMBER.ROW],color:`rgba(${t.rgba[1]})`},{number:[t.NUMBER.a,t.NUMBER.a+1,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+2*t.NUMBER.ROW],color:`rgba(${t.rgba[2]})`},{number:[t.NUMBER.a,t.NUMBER.a+1,t.NUMBER.a+t.NUMBER.ROW+1,t.NUMBER.a+2*t.NUMBER.ROW+1],color:`rgba(${t.rgba[3]})`},{number:[t.NUMBER.a,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+t.NUMBER.ROW+1,t.NUMBER.a+2*t.NUMBER.ROW],color:`rgba(${t.rgba[4]})`},{number:[t.NUMBER.a,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+t.NUMBER.ROW+1,t.NUMBER.a+2*t.NUMBER.ROW+1],color:`rgba(${t.rgba[5]})`},{number:[t.NUMBER.a+1,t.NUMBER.a+t.NUMBER.ROW,t.NUMBER.a+t.NUMBER.ROW+1,t.NUMBER.a+2*t.NUMBER.ROW],color:`rgba(${t.rgba[6]})`}]}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(0));function i(e){if(e<o.NUMBER.ROW)return e;const t=e=>+e==~~e,n=e;let r=0;for(;e>=1;)t(e)?(r=0,r=e):r=e,e/=o.NUMBER.ROW;return n%(Math.floor(r)*o.NUMBER.ROW)}t.fixToFirstDigit=i,t.filterUndef=function(e){return e.filter(e=>!!e)},t.shuffle=Symbol("shuffle"),Array.prototype.shuffle=function(){return this.map(e=>[e,Math.random()]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])},t.sleep=function(e){return new Promise(t=>setTimeout(t,e))},t.translateNumberToRect=function(e,t){let n;if(e<=t&&t-e<=2)n=[i(e)-i(t),0];else if(e>=t&&e-t<=2)n=[i(e)-i(t),0];else if(e<=t&&t-e>=3&&t-e<=13)n=[i(e)-i(t),1];else if(e>=t&&e-t>=3&&e-t<=13)n=[i(e)-i(t),-1];else if(e<=t&&t-e>=3&&t-e>=13)n=[i(e)-i(t),2];else{if(!(e>=t&&e-t>=3&&e-t>=13))return[0,0];n=[i(e)-i(t),-2]}return n},t.rotateMatrix=function(e){const t=Math.PI/180*o.NUMBER.DEGREES,n=Math.cos(t),r=Math.sin(t),i=n*(e[0]-0)+r*(e[1]-0),c=n*(e[1]-0)-r*(e[0]-0);return[Math.round(i),Math.round(c)]},t.translateRectToNum=function(e){return 0===e[0]&&e[1]>0?-e[1]*o.NUMBER.ROW:0===e[0]&&e[1]<0?-e[1]*o.NUMBER.ROW:0===e[0]&&e[1]>0?e[1]*o.NUMBER.ROW:e[0]>0&&0===e[1]?e[0]:e[0]<0&&0===e[1]?e[0]:e[0]>0&&e[1]>0?-e[1]*o.NUMBER.ROW+e[0]:e[0]>0&&e[1]<0?-e[1]*o.NUMBER.ROW+e[0]:e[0]<0&&e[1]>0?-e[1]*o.NUMBER.ROW+e[0]:e[0]<0&&e[1]<0?-e[1]*o.NUMBER.ROW+e[0]:(0===e[0]&&e[1],0)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Settings={autoMove:!0,console:!1,antiAliasing:!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isTouchEnabled=function(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(0)),i=r(n(1)),c=r(n(5));t.Direction={left:e=>e.map(e=>e+=o.NUMBER.LEFT_MOVE),right:e=>e.map(e=>e+=o.NUMBER.RIGHT_MOVE),down:e=>e.map(e=>e+=o.NUMBER.ROW)},t.Update={field:[],initField:function(){return this.field=[...Array(o.NUMBER.COLUMN*o.NUMBER.ROW)].map(e=>o.STRING.EMPTY)},queueField:[],initQueueField:function(){return this.queueField=[...Array(o.NUMBER.QUEUE_COLUMN*o.NUMBER.ROW)].map(e=>o.STRING.EMPTY)},oneRowArray:[],resetOneRowArray:function(){this.oneRowArray=[]},completeRowNumbers:[],resetCompleteRowNumbers:function(){this.completeRowNumbers=[]},remainRowArray:[],resetRemainRowArray:function(){this.remainRowArray=[]},remainRowNumbers:[],resetRemainRowNumbers:function(){this.remainRowNumbers=[]},deleteRow:function(e){let t=[];this.oneRowArray.forEach((e,n)=>{const r=e.some(e=>e===o.STRING.EMPTY),i=e.some(e=>e===o.STRING.CURRENT),c=e.some(e=>"number"==typeof e),a=e.every(e=>e!==o.STRING.EMPTY);(r&&c||i&&!a)&&(this.remainRowArray.push(e),this.remainRowNumbers.push(n)),a&&(this.completeRowNumbers.push(n),[...Array(o.NUMBER.ROW)].forEach((e,r)=>{t.push(n*o.NUMBER.ROW+r)}))}),t.forEach(t=>e[t]=o.STRING.EMPTY)},dropRow:function(e){if(this.remainRowNumbers.length>0){const t=this.remainRowNumbers.reverse(),n=this.remainRowArray.reverse(),r=()=>{t.forEach((t,r)=>{let c=t*o.NUMBER.ROW+o.NUMBER.ROW;if(c>=this.field.length)return;i.filterUndef(e.map((e,t)=>{if(t>=c&&t<=c+o.NUMBER.ROW-1)return t})).every(t=>e[t]===o.STRING.EMPTY)&&[...Array(o.NUMBER.ROW)].forEach((t,i)=>{let a=n[r][i];e[c+i]=a,e[c-o.NUMBER.ROW+i]=o.STRING.EMPTY})})},c=()=>{[...Array(t.length)].forEach((e,n)=>{t[n]>=o.NUMBER.COLUMN||(t[n]+=1)})};[...Array(o.NUMBER.COLUMN)].forEach(()=>{r(),c()})}},transferToFix:e=>{e.forEach((t,n)=>{t===o.STRING.CURRENT&&(e[n]=c.Block.blockNumber)})},transfer:(e,t)=>{e.forEach(e=>{t[e]=o.STRING.CURRENT})},clear:(e,t)=>{e.forEach(e=>t[e]=o.STRING.EMPTY)}}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),i=r(n(0)),c=r(n(4)),a=r(n(2));t.Movable={_flag:!1,left:function(e,t){return this._flag=!0,e.forEach((e,n)=>{"number"==typeof e&&t.forEach(e=>{e===n+i.NUMBER.RIGHT_MOVE&&(a.Settings.console&&console.log(`${i.STRING.LEFT} failed`),this._flag=!1)})}),t.forEach((e,t,n)=>{o.fixToFirstDigit(n[t])===o.fixToFirstDigit(i.NUMBER.ROW)&&(a.Settings.console&&console.log(`${i.STRING.LEFT} walled`),this._flag=!1)}),this._flag},right:function(e,t){return this._flag=!0,e.forEach((e,n)=>{"number"==typeof e&&t.forEach(e=>{e===n+i.NUMBER.LEFT_MOVE&&(a.Settings.console&&console.log(`${i.STRING.RIGHT} failed`),this._flag=!1)})}),t.forEach((e,t,n)=>{o.fixToFirstDigit(n[t])===o.fixToFirstDigit(i.NUMBER.ROW+i.NUMBER.LEFT_MOVE)&&(a.Settings.console&&console.log(`${i.STRING.RIGHT} walled`),this._flag=!1)}),this._flag},down:function(e,t){return this._flag=!0,e.forEach((e,n,r)=>{"number"==typeof e&&t.forEach(()=>{if(r[n-i.NUMBER.ROW]===i.STRING.CURRENT)return a.Settings.console&&console.log(`${i.STRING.DOWN} failed`),this._flag=!1})}),t.forEach(t=>{if(e.some(n=>t>=e.length-i.NUMBER.ROW))return a.Settings.console&&console.log("last row"),this._flag=!1}),this._flag},rotate:function(e,n,r,c){let l=!0,s=!0,u=!0;const E=t.Block.angle+i.NUMBER.DEGREES,R=t.rotatedBlock(r,E,!0,t.Block.blockNumber);(n=R).forEach(t=>{e.some(n=>t>=e.length-i.NUMBER.ROW)&&(u=!1),o.fixToFirstDigit(t)===o.fixToFirstDigit(i.NUMBER.ROW)&&(l=!1),o.fixToFirstDigit(t)===o.fixToFirstDigit(i.NUMBER.ROW+i.NUMBER.LEFT_MOVE)&&(s=!1)}),n.forEach(t=>{e.some(n=>t>=e.length-i.NUMBER.ROW)&&(u=!1)});let h=!0;return e.forEach((e,t)=>{"number"==typeof e&&n.forEach(e=>{t===e&&(h=!1)})}),(l||s)&&u&&h?this._flag=!0:(a.Settings.console&&console.log("cant rotate"),this._flag=!1),this._flag},_pause:!1,get pause(){return this._pause},set pause(e){this._pause=!!e},_checkTIme:!1,get checkTime(){return this._checkTIme},set checkTime(e){this._checkTIme=!!e}},t.Complete={_flag:!1,check:function(e){let t=0,n=i.NUMBER.ROW;const r=[...Array(i.NUMBER.COLUMN)].map(()=>{let r=e.slice(t,n);return t+=i.NUMBER.ROW,n+=i.NUMBER.ROW,r});return r.forEach(e=>{e.every(e=>e!==i.STRING.EMPTY)&&(a.Settings.console&&console.log("complete!!!!!!"),c.Update.oneRowArray=r,this._flag=!0)}),this._flag||a.Settings.console&&console.log("complete failed"),this._flag},resetCheck:function(){return this._flag=!1}},t.blockQueue={creatQueue:function(e){if(e>=1&&this._queue.shift(),1===e&&[...Array(i.Prop.BLOCKS.length)].map((e,t)=>t).shuffle().forEach(e=>this._queue.push(e)),this._queue.length>0&&this._queue.length<4){const e=()=>Math.floor(Math.random()*i.Prop.BLOCKS.length);for(;;){let t=e();if(!this._queue.includes(t)){this._queue.push(t);break}}}},_queue:[],set queue(e){this._queue=e},get queue(){return this._queue},resetQueue:function(){return this._queue=[]}},t.Block={deepCopy:Object.create(i.Prop),get blockNumber(){return t.blockQueue.queue[0]},_angle:0,get angle(){return this._angle},set angle(e){this._angle+=e,this._angle===4*e&&(this._angle=0)},resetAngle:function(){this._angle=0},current:[],get _current(){return this._current},set _current(e){this._current.length=0,e.forEach((e,t)=>{e===i.STRING.CURRENT&&(this._current=[...this._current,t])})}},t.rotatedBlock=(e,n,r,c)=>{let a,l;if(0===c)return r?t.Block.current:t.Block.deepCopy.BLOCKS[c].number;return 1===c&&(a=1),l=1===c&&0===n?0:1===c&&n===3*i.NUMBER.DEGREES?0:1,2===c&&(l=0),a=2===c&&0===n?2:2===c&&n===i.NUMBER.DEGREES?2:1,3===c&&(l=0),3===c&&0===n?a=1:3===c&&n===i.NUMBER.DEGREES?a=2:3===c&&n===2*i.NUMBER.DEGREES?a=2:3===c&&n===3*i.NUMBER.DEGREES&&(a=1),4===c&&(l=0),4===c&&0===n?a=0:4===c&&n===i.NUMBER.DEGREES?a=2:4===c&&n===2*i.NUMBER.DEGREES?a=3:4===c&&n===3*i.NUMBER.DEGREES&&(a=1),5===c&&(l=0),5===c&&0===n?(a=3,l=-(i.NUMBER.ROW+i.NUMBER.RIGHT_MOVE)):5===c&&n===i.NUMBER.DEGREES?a=2:5===c&&n===2*i.NUMBER.DEGREES?a=3:5===c&&n===3*i.NUMBER.DEGREES&&(a=2,l=i.NUMBER.ROW+i.NUMBER.LEFT_MOVE),6===c&&(a=2,l=0),6===c&&0===n&&(l=-(i.NUMBER.ROW+i.NUMBER.RIGHT_MOVE)),6===c&&n===3*i.NUMBER.DEGREES&&(l=i.NUMBER.ROW+i.NUMBER.LEFT_MOVE),r||(l=0),e.map(t=>{let n=o.translateNumberToRect(t,e[a]),r=o.rotateMatrix(n);return o.translateRectToNum(r)+e[a]+l}).sort((e,t)=>e-t)},t.Info={count:0,incrementCount:function(){return this.count+=1},resetCount:function(){return this.count=0},completedRow:0,incrementCompletedRow:function(){return this.completedRow+=c.Update.completeRowNumbers.length},resetCompletedRow:function(){return this.completedRow=0},speed:1e3,level:0,multipleNumber:10,incrementLevelandSpeed:function(){if(0!==this.completedRow)return this.completedRow%this.multipleNumber<4&&this.completedRow/this.multipleNumber>=1?(this.speed>=100&&(this.multipleNumber+=10,this.speed-=100),this.level+=1):void 0},resetLevelandSpeed:function(){return this.level=0,this.speed=1e3},_score:0,incrementScore:function(){if(0===c.Update.completeRowNumbers.length&&(this._score+=10),c.Update.completeRowNumbers.length<1)return;let e=1,t=0;c.Update.completeRowNumbers.map((n,r)=>{e*=1.2+(t+=.2),this._score+=Math.floor(50*e)})},resetScore:function(){this._score=0}},t.Playable={_flag:!0,continue:function(e){return e.forEach((e,n,r)=>{i.Prop.BLOCKS[t.blockQueue.queue[1]].number.forEach(e=>{"number"==typeof r[e]?this._flag=!1:this._flag=!0})}),this._flag},resetContinue:function(){return this._flag=!0}}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(3)),i=r(n(0)),c=r(n(2)),a=r(n(7));t.onCanvas={rect:i.canvas.getBoundingClientRect(),rectX:0,rectY:0,point:function(e){this.rect=i.canvas.getBoundingClientRect();const t=e.clientX-this.rect.left,n=e.clientY-this.rect.top;return this.rectX=t,this.rectY=n},figure:"",square:{x:0,y:0,w:0,h:0,r:0},hit:function(){if(""!==this.figure)return"square"===this.figure?this.square.x<=this.rectX&&this.rectX<=this.square.x+this.square.w&&this.square.y<=this.rectY&&this.rectY<=this.square.y+this.square.h:"circle"===this.figure?Math.pow(this.square.x-this.rectX,2)+Math.pow(this.square.y-this.rectY,2)<=Math.pow(this.square.r,2):void 0;c.Settings.console&&console.log("property:figure not defined")}},t.UserEvent={_flag:!1,rotate:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.rotate().rect[0],r.square.y=a.TouchAction.rotate().rect[1],r.square.r=a.TouchAction.rotate().rect[2],r.hit()?(c.Settings.console&&console.log("rotate tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.UP_KEY?(c.Settings.console&&console.log("up inputted"),this._flag=!0):this._flag=!1},left:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.left().rect[0],r.square.y=a.TouchAction.left().rect[1],r.square.r=a.TouchAction.left().rect[2],r.hit()?(c.Settings.console&&console.log("left tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.LEFT_KEY?(c.Settings.console&&console.log("left inputted"),this._flag=!0):this._flag=!1},right:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.right().rect[0],r.square.y=a.TouchAction.right().rect[1],r.square.r=a.TouchAction.right().rect[2],r.hit()?(c.Settings.console&&console.log("right tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.RIGHT_KEY?(c.Settings.console&&console.log("right inputted"),this._flag=!0):this._flag=!1},down:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.down().rect[0],r.square.y=a.TouchAction.down().rect[1],r.square.r=a.TouchAction.down().rect[2],r.hit()?(c.Settings.console&&console.log("down tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.DOWN_KEY?(c.Settings.console&&console.log("down inputted"),this._flag=!0):this._flag=!1},hardDown:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.hardDown().rect[0],r.square.y=a.TouchAction.hardDown().rect[1],r.square.r=a.TouchAction.hardDown().rect[2],r.hit()?(c.Settings.console&&console.log("hard down tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.HARD_DOWN_KEY?(c.Settings.console&&console.log("hard down inputted"),this._flag=!0):this._flag=!1},confirm:function(e){return o.isTouchEnabled(),e.keyCode===i.NUMBER.ENTER_KEY?(c.Settings.console&&console.log("enter inputted"),this._flag=!0):this._flag=!1},pause:function(e){if(o.isTouchEnabled()){const n=e,r=Object.create(t.onCanvas);return r.point(n),r.figure="circle",r.square.x=a.TouchAction.pause().rect[0],r.square.y=a.TouchAction.pause().rect[1],r.square.r=a.TouchAction.pause().rect[2],r.hit()?(c.Settings.console&&console.log("pause tapped"),this._flag=!0):this._flag=!1}return e.keyCode===i.NUMBER.PAUSE_KEY?(c.Settings.console&&console.log("pause inputted"),this._flag=!0):this._flag=!1}}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(0)),i=r(n(1)),c=r(n(3)),a=r(n(5)),l=r(n(6)),s=r(n(2)),u=r(n(4));t.ctx=o.canvas.getContext("2d"),s.Settings.antiAliasing&&t.ctx.translate(.5,.5),t.ScreenSize={getWidth:window.parent.screen.width,getHeight:window.parent.screen.height},t.resizeCanvasArea=function(){t.ScreenSize.getWidth>400&&(o.canvas.width=400,o.canvas.height=600),t.ScreenSize.getHeight<600&&(o.canvas.height=Math.floor(.9*t.ScreenSize.getHeight)),t.ScreenSize.getWidth<420&&t.ScreenSize.getWidth>320&&(o.canvas.width=t.ScreenSize.getWidth,o.canvas.height=600,t.GRID_SIZE.HORIZON=Math.floor(.9*t.GRID_SIZE.HORIZON),t.GRID_SIZE.STEP=t.GRID_SIZE.HORIZON/10,t.GRID_SIZE.getVertical(),t.GRID_SIZE.QUEUE_STEP=t.GRID_SIZE.STEP-t.GRID_SIZE.STANDARD),t.ScreenSize.getWidth<321&&(o.canvas.width=t.ScreenSize.getWidth,t.GRID_SIZE.HORIZON=Math.floor(.85*t.GRID_SIZE.HORIZON),t.GRID_SIZE.STEP=t.GRID_SIZE.HORIZON/10,t.GRID_SIZE.getVertical(),t.GRID_SIZE.QUEUE_STEP=t.GRID_SIZE.STEP-t.GRID_SIZE.STANDARD)},t.GRID_SIZE={HORIZON:270,VERTICAL:378,STANDARD:7,STEP:27,QUEUE_STEP:20,getVertical:function(){this.VERTICAL=this.STEP*o.NUMBER.COLUMN}},t.GRID_SIZE.getVertical();const E={FONT:"Osaka",FONTSIZE:"16px ",FONTSIZE2:"18px ",NEXT:"Next",LINE:"Line",SCORE:"Score",PLAY:"Play ?",GAMEOVER:"Game Over",REPLAY:"Replay ?"};function R(){t.ctx.fillStyle="rgb(0,0,0)",t.ctx.fillRect(0,0,o.canvas.width,o.canvas.height),t.ctx.fill()}t.clearAll=function(){t.ctx.clearRect(0,0,o.canvas.width,o.canvas.height)},t.Division={start:function(e){R(),t.ctx.font=`${E.FONTSIZE2+E.FONT}`,t.ctx.fillStyle="rgba(255,255,255,0.9)";const n=Math.floor(t.ctx.measureText(E.PLAY).width);t.ctx.fillText(E.PLAY,(o.canvas.width-n)/2,o.canvas.height/2);const r=t=>{const c=Object.create(l.onCanvas);c.point(t),c.figure="square",c.square.x=(o.canvas.width-n)/2,c.square.y=o.canvas.height/2-20,c.square.w=n,c.square.h=40,c.hit()&&(o.canvas.removeEventListener("click",r,!1),window.removeEventListener("keydown",i,!1),e())};o.canvas.addEventListener("click",r,!1);const i=t=>{l.UserEvent.confirm(t)&&(o.canvas.removeEventListener("click",r,!1),window.removeEventListener("keydown",i,!1),e())};window.addEventListener("keydown",i,!1)},gameOver:function(e){t.ctx.fillStyle="rgba(255,255,255,0.9)",t.ctx.fillRect(0,0,o.canvas.width,o.canvas.height),t.ctx.fill(),t.ctx.font=`${E.FONTSIZE2+E.FONT}`,t.ctx.fillStyle="rgba(51,51,51,1.0)";const n=Math.floor(t.ctx.measureText(E.GAMEOVER).width),r=Math.floor(t.ctx.measureText(E.REPLAY).width);t.ctx.fillText(E.GAMEOVER,(o.canvas.width-n)/2,o.canvas.height/2),t.ctx.fillText(E.REPLAY,(o.canvas.width-r)/2,o.canvas.height/2+40);const i=t=>{const n=Object.create(l.onCanvas);n.point(t),n.figure="square",n.square.x=(o.canvas.width-r)/2,n.square.y=o.canvas.height/2,n.square.w=r,n.square.h=40,n.hit()&&(o.canvas.removeEventListener("click",i,!1),window.removeEventListener("keydown",c,!1),e())};o.canvas.addEventListener("click",i,!1);const c=t=>{l.UserEvent.confirm(t)&&(o.canvas.removeEventListener("click",i,!1),window.removeEventListener("keydown",c,!1),e())};window.addEventListener("keydown",c,!1)}},t.TouchAction={_MARGIN_BOTTOM:60,_LENGTH:15,_RADIANS:5,left:function(){const e=o.canvas.width/2-(o.canvas.width/2-2*this._LENGTH),n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM,r=this._LENGTH,i=this._LENGTH+this._RADIANS,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r/2,n-r/3),c.lineTo(e,n),c.lineTo(e+r/2,n+r/3);const a=new Path2D;t.ctx.beginPath(),a.moveTo(e,n),a.lineTo(e+(r+5),n);const l=new Path2D;return t.ctx.beginPath(),l.arc(e+10,n,i,0,2*Math.PI),{render:function(){t.ctx.stroke(c),t.ctx.stroke(a),t.ctx.stroke(l)},rect:[e+r-this._RADIANS,n,i]}},right:function(){const e=o.canvas.width/2+(o.canvas.width/2-3*this._LENGTH),n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM,r=this._LENGTH,i=this._LENGTH+this._RADIANS,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r,n-r/3),c.lineTo(e+r/.7,n),c.lineTo(e+r,n+r/3);const a=new Path2D;t.ctx.beginPath(),a.moveTo(e,n),a.lineTo(e+(r+5),n);const l=new Path2D;return t.ctx.beginPath(),l.arc(e+10,n,i,0,2*Math.PI),{render:function(){t.ctx.stroke(c),t.ctx.stroke(a),t.ctx.stroke(l)},rect:[e+r-this._RADIANS,n,i]}},down:function(){const e=o.canvas.width/2-o.canvas.width/2/2.5,n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM+3*this._LENGTH,r=this._LENGTH,i=this._LENGTH+this._RADIANS,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r/2.7,n+r/5),c.lineTo(e+r/1.5,n+r/1.8),c.lineTo(e+r/1,n+r/5);const a=new Path2D;t.ctx.beginPath(),a.moveTo(e+r/1.5,n-r/1.8),a.lineTo(e+r/1.5,n+r/1.8);const l=new Path2D;return t.ctx.beginPath(),l.arc(e+10,n,i,0,2*Math.PI),{render:function(){t.ctx.stroke(c),t.ctx.stroke(a),t.ctx.stroke(l)},rect:[e+r-this._RADIANS,n,i]}},hardDown:function(){const e=o.canvas.width/2,n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM+3*this._LENGTH,r=this._LENGTH,i=this._LENGTH+this._RADIANS,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r/2.7,n+r/5),c.lineTo(e+r/1.5,n+r/1.8),c.lineTo(e+r/1,n+r/5);const a=new Path2D;t.ctx.beginPath(),a.moveTo(e+r/2.7,n+r/9),a.lineTo(e+r/1.5,n+r/5.8),a.lineTo(e+r/1,n+r/9);const l=new Path2D;return t.ctx.beginPath(),l.arc(e+10,n,i,0,2*Math.PI),{render:function(){t.ctx.stroke(c),t.ctx.stroke(a),t.ctx.stroke(l)},rect:[e+r-this._RADIANS,n,i]}},rotate:function(){const e=o.canvas.width/2+o.canvas.width/2/2.5,n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM+3*this._LENGTH,r=this._LENGTH,i=this._LENGTH+this._RADIANS,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r/1.2,n-r/3),c.lineTo(e+r/.8,n),c.lineTo(e+r/.6,n-r/3);const a=new Path2D;t.ctx.beginPath(),a.arc(e+10,n,i/2,0,180);const l=new Path2D;return t.ctx.beginPath(),l.arc(e+10,n,i,0,2*Math.PI),{render:function(){t.ctx.stroke(c),t.ctx.stroke(a),t.ctx.stroke(l)},rect:[e+r-this._RADIANS,n,i]}},pause:function(){const e=o.canvas.width/2-(o.canvas.width/2-1.75*this._LENGTH),n=t.GRID_SIZE.VERTICAL+this._MARGIN_BOTTOM+3.25*this._LENGTH,r=this._LENGTH,i=this._LENGTH,c=new Path2D;t.ctx.beginPath(),c.moveTo(e+r/2,n-r/3),c.lineTo(e+r,n),c.lineTo(e+r/2,n+r/3);const a=new Path2D;t.ctx.beginPath(),a.moveTo(e+r/2,n-r/3),a.lineTo(e+r/2,n+r/3);const l=new Path2D;t.ctx.beginPath(),l.moveTo(e+r/1.25,n-r/3),l.lineTo(e+r/1.25,n+r/3);const u=new Path2D;return t.ctx.beginPath(),u.arc(e+10,n,i,0,2*Math.PI),{render:function(){s.Settings.autoMove?(t.ctx.stroke(a),t.ctx.stroke(l)):t.ctx.fill(c),t.ctx.stroke(u)},rect:[e+r-this._RADIANS,n,i]}}},t.renderField=function(){R(),t.ctx.lineWidth=1,t.ctx.strokeStyle="rgba(255,255,255,0.6)",t.ctx.fillStyle="rgba(255,255,255,0.7)";const e=new Path2D;t.ctx.beginPath(),e.rect(t.GRID_SIZE.STANDARD,t.GRID_SIZE.STANDARD,t.GRID_SIZE.HORIZON,t.GRID_SIZE.VERTICAL),t.ctx.stroke(e);const n=new Path2D;for(let e=t.GRID_SIZE.STEP+t.GRID_SIZE.STANDARD;e<t.GRID_SIZE.VERTICAL;e+=t.GRID_SIZE.STEP)t.ctx.beginPath(),n.moveTo(t.GRID_SIZE.STANDARD,e),n.lineTo(t.GRID_SIZE.HORIZON+t.GRID_SIZE.STANDARD,e);for(let e=t.GRID_SIZE.STEP+t.GRID_SIZE.STANDARD;e<t.GRID_SIZE.HORIZON;e+=t.GRID_SIZE.STEP)t.ctx.beginPath(),n.moveTo(e,t.GRID_SIZE.STANDARD),n.lineTo(e,t.GRID_SIZE.VERTICAL+t.GRID_SIZE.STANDARD);t.ctx.stroke(n),t.ctx.font=`${E.FONTSIZE+E.FONT}`;const r=Math.floor(t.ctx.measureText(E.NEXT).width),i=Math.floor(t.ctx.measureText(E.SCORE).width),c=Math.floor(t.ctx.measureText(E.LINE).width),l=Math.floor(t.ctx.measureText(a.Info._score.toString()).width),s=Math.floor(t.ctx.measureText(a.Info.completedRow.toString()).width);t.ctx.fillText(E.NEXT,(t.GRID_SIZE.HORIZON+o.canvas.width-r/2)/2,t.GRID_SIZE.STEP),t.ctx.fillText(E.SCORE,(t.GRID_SIZE.HORIZON+o.canvas.width-i/2)/2,t.GRID_SIZE.VERTICAL-7*t.GRID_SIZE.QUEUE_STEP),t.ctx.fillText(a.Info._score.toString(),(t.GRID_SIZE.HORIZON+o.canvas.width-l/2)/2,t.GRID_SIZE.VERTICAL-5*t.GRID_SIZE.QUEUE_STEP),t.ctx.fillText(E.LINE,(t.GRID_SIZE.HORIZON+o.canvas.width-c/2)/2,t.GRID_SIZE.VERTICAL-3*t.GRID_SIZE.QUEUE_STEP),t.ctx.fillText(a.Info.completedRow.toString(),(t.GRID_SIZE.HORIZON+o.canvas.width-s/2)/2,t.GRID_SIZE.VERTICAL-1*t.GRID_SIZE.QUEUE_STEP)},t.clearBlock=function(e){e.forEach((e,n)=>{e!==o.STRING.EMPTY&&e===o.STRING.CURRENT&&t.ctx.clearRect(i.fixToFirstDigit(n)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),Math.floor(n/o.NUMBER.ROW)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),t.GRID_SIZE.STEP-2,t.GRID_SIZE.STEP-2)})},t.renderButton=function(){t.ctx.lineWidth=1,t.ctx.strokeStyle="rgba(255,255,255,0.6)",t.ctx.fillStyle="rgba(255,255,255,0.7)",t.ctx.clearRect(0,t.GRID_SIZE.VERTICAL+t.GRID_SIZE.STEP,o.canvas.width,t.GRID_SIZE.HORIZON),c.isTouchEnabled()&&(t.TouchAction.left().render(),t.TouchAction.right().render(),t.TouchAction.down().render(),t.TouchAction.hardDown().render(),t.TouchAction.rotate().render(),t.TouchAction.pause().render())},t.deleteCompletedBlock=function(e){return new Promise(e=>{u.Update.completeRowNumbers.forEach((n,r,c)=>{[...Array(o.NUMBER.ROW)].forEach((r,a)=>{let l=n*o.NUMBER.ROW+a;l>=c[c.length-1]*o.NUMBER.ROW+(o.NUMBER.ROW-1)&&e(),t.ctx.clearRect(i.fixToFirstDigit(l)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),Math.floor(l/o.NUMBER.ROW)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),t.GRID_SIZE.STEP-2,t.GRID_SIZE.STEP-2)})})})},t.renderBlock=function(e){e.forEach((e,n)=>{e!==o.STRING.EMPTY&&(e===o.STRING.CURRENT&&(t.ctx.fillStyle=a.Block.deepCopy.BLOCKS[a.Block.blockNumber].color,t.ctx.fillRect(i.fixToFirstDigit(n)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),Math.floor(n/o.NUMBER.ROW)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),t.GRID_SIZE.STEP-2,t.GRID_SIZE.STEP-2),t.ctx.fill()),e!==o.STRING.CURRENT&&"number"==typeof e&&(t.ctx.fillStyle=a.Block.deepCopy.BLOCKS[e].color,t.ctx.fillRect(i.fixToFirstDigit(n)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),Math.floor(n/o.NUMBER.ROW)*t.GRID_SIZE.STEP+(t.GRID_SIZE.STANDARD+1),t.GRID_SIZE.STEP-2,t.GRID_SIZE.STEP-2),t.ctx.fill()))})},t.renderQueue=function(e){const n=Object.create(o.Prop);a.blockQueue.queue.slice(1,4).forEach((t,r)=>{let i=0,c=0,l=a.rotatedBlock(n.BLOCKS[t].number,i,!1,t);0===t&&(i=0),0!==t&&(i=o.NUMBER.DEGREES),1===t&&l.forEach((e,t,n)=>{n[t]-=o.NUMBER.ROW-1}),2===t&&(i=3*o.NUMBER.DEGREES,l.forEach((e,t,n)=>{n[t]-=o.NUMBER.ROW})),3===t&&l.forEach((e,t,n)=>{n[t]+=o.NUMBER.ROW+1}),4===t&&(l.forEach((e,t,n)=>{n[t]+=o.NUMBER.ROW+1}),l[3]-=2*o.NUMBER.ROW),5===t&&l.forEach((e,t,n)=>{n[t]-=o.NUMBER.ROW+1}),6===t&&l.forEach((e,t,n)=>{n[t]-=1}),0===r&&l.forEach(n=>e[n]=t),1===r&&(c+=30,l.forEach(n=>e[n+c]=t)),2===r&&(c+=60,l.forEach(n=>e[n+c]=t))}),e.forEach((e,r)=>{e!==o.STRING.EMPTY&&"number"==typeof e&&(t.ctx.fillStyle=n.BLOCKS[e].color,t.ctx.fillRect(i.fixToFirstDigit(r)*t.GRID_SIZE.QUEUE_STEP+(t.GRID_SIZE.HORIZON-t.GRID_SIZE.STEP),Math.floor(r/o.NUMBER.ROW)*t.GRID_SIZE.QUEUE_STEP+1.5*t.GRID_SIZE.STEP,t.GRID_SIZE.QUEUE_STEP-2,t.GRID_SIZE.QUEUE_STEP-2),t.ctx.fill())})}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function c(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}l((r=r.apply(e,t||[])).next())}))},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const i=o(n(0)),c=o(n(3)),a=o(n(1)),l=o(n(4)),s=o(n(5)),u=o(n(6)),E=o(n(7)),R=o(n(9)),h=o(n(2)),f=function(){s.Movable.pause=!1,s.Movable.checkTime=!1;let e=n(),t=o();function n(){if(h.Settings.autoMove)return window.setInterval(_,s.Info.speed)}function o(){if(h.Settings.autoMove)return window.setInterval(()=>{s.Movable.down(l.Update.field,s.Block.current)||(clearInterval(e),clearInterval(t),T(),I())},s.Info.speed)}function d(){if(s.Info.incrementCount(),s.Info.incrementLevelandSpeed(),s.Info.incrementScore(),!s.Playable.continue(l.Update.field))return window.removeEventListener("keydown",N,!1),E.Division.gameOver(f),c.isTouchEnabled()?i.canvas.removeEventListener("click",N):window.removeEventListener("keydown",N),s.Block.resetAngle(),l.Update.resetCompleteRowNumbers(),l.Update.resetOneRowArray(),l.Update.resetRemainRowNumbers(),l.Update.resetRemainRowArray(),s.Complete.resetCheck(),l.Update.initQueueField(),s.Info.resetCount(),s.Info.resetCompletedRow(),s.Info.resetLevelandSpeed(),void R.Player.stop();s.Block.resetAngle(),l.Update.resetCompleteRowNumbers(),l.Update.resetOneRowArray(),l.Update.resetRemainRowNumbers(),l.Update.resetRemainRowArray(),s.Complete.resetCheck(),l.Update.initQueueField(),s.blockQueue.creatQueue(s.Info.count),s.Block.current=s.Block.deepCopy.BLOCKS[s.Block.blockNumber].number,l.Update.transfer(s.Block.current,l.Update.field),E.clearAll(),E.renderField(),E.renderButton(),E.renderBlock(l.Update.field),E.renderQueue(l.Update.queueField),s.Movable.pause=!1,s.Movable.checkTime=!1,clearInterval(e),e=n(),clearInterval(t),t=o()}function _(){s.Movable.down(l.Update.field,s.Block.current)&&(E.clearBlock(l.Update.field),l.Update.clear(s.Block.current,l.Update.field),l.Update.transfer(l.Direction.down(s.Block.current),l.Update.field),s.Block.current=l.Direction.down(s.Block.current),E.renderBlock(l.Update.field))}function T(){!s.Movable.down(l.Update.field,s.Block.current)&&s.Complete.check(l.Update.field)&&(s.Movable.pause=!0,s.Movable.checkTime=!0,clearInterval(e),clearInterval(t),(()=>r(this,void 0,void 0,(function*(){yield a.sleep(300),l.Update.deleteRow(l.Update.field),s.Info.incrementCompletedRow(),yield E.deleteCompletedBlock(l.Update.field),yield a.sleep(500),l.Update.dropRow(l.Update.field),E.renderBlock(l.Update.field),l.Update.transferToFix(l.Update.field),yield a.sleep(300),d()})))())}function I(){s.Movable.down(l.Update.field,s.Block.current)||s.Complete.check(l.Update.field)||(s.Movable.pause=!0,clearInterval(e),clearInterval(t),(()=>r(this,void 0,void 0,(function*(){if(yield a.sleep(500),s.Movable.down(l.Update.field,s.Block.current))return s.Movable.pause=!1,e=n(),void(t=o());s.Movable.pause=!0,s.Movable.checkTime=!0,l.Update.transferToFix(l.Update.field),yield a.sleep(100),d()})))())}E.clearAll(),l.Update.initField(),l.Update.initQueueField(),s.Info.incrementCount(),s.blockQueue.creatQueue(s.Info.count),s.Block.blockNumber,s.Block.current=s.Block.deepCopy.BLOCKS[s.Block.blockNumber].number,l.Update.transfer(s.Block.current,l.Update.field),E.renderField(),E.renderButton(),E.renderBlock(l.Update.field),E.renderQueue(l.Update.queueField),R.Player.play();const N=r=>{r.isTrusted&&(u.UserEvent.pause(r)?s.Movable.pause||s.Movable.checkTime?(s.Movable.checkTime=!1,h.Settings.autoMove=!0,E.renderButton(),R.Player.play(),h.Settings.autoMove&&(s.Movable.pause=!1,clearInterval(e),e=n(),clearInterval(t),t=o())):(s.Movable.checkTime=!0,h.Settings.autoMove=!1,E.renderButton(),R.Player.pause(),h.Settings.autoMove||(s.Movable.pause=!0,clearInterval(e),clearInterval(t))):s.Movable.checkTime||(u.UserEvent.left(r)&&s.Movable.left(l.Update.field,s.Block.current)&&(E.clearBlock(l.Update.field),l.Update.clear(s.Block.current,l.Update.field),l.Update.transfer(l.Direction.left(s.Block.current),l.Update.field),s.Block.current=l.Direction.left(s.Block.current),E.renderBlock(l.Update.field)),u.UserEvent.right(r)&&s.Movable.right(l.Update.field,s.Block.current)&&(E.clearBlock(l.Update.field),l.Update.clear(s.Block.current,l.Update.field),l.Update.transfer(l.Direction.right(s.Block.current),l.Update.field),s.Block.current=l.Direction.right(s.Block.current),E.renderBlock(l.Update.field)),u.UserEvent.rotate(r)&&s.Movable.rotate(l.Update.field,s.rotatedBlock(s.Block.current,s.Block.angle,!0,s.Block.blockNumber),s.Block.current,s.Block.blockNumber)&&(s.Block.angle=i.NUMBER.DEGREES,E.clearBlock(l.Update.field),l.Update.clear(s.Block.current,l.Update.field),s.Block.current=s.rotatedBlock(s.Block.current,s.Block.angle,!0,s.Block.blockNumber),l.Update.transfer(s.Block.current,l.Update.field),E.renderBlock(l.Update.field)),s.Movable.pause||(u.UserEvent.down(r)&&_(),u.UserEvent.hardDown(r)&&function(){for(E.clearBlock(l.Update.field);s.Movable.down(l.Update.field,s.Block.current);)l.Update.clear(s.Block.current,l.Update.field),l.Update.transfer(l.Direction.down(s.Block.current),l.Update.field),s.Block.current=l.Direction.down(s.Block.current);E.renderBlock(l.Update.field)}(),T(),I())))};c.isTouchEnabled()?i.canvas.addEventListener("click",N,{passive:!1}):window.addEventListener("keydown",N,{passive:!1})};document.addEventListener("DOMContentLoaded",()=>{R.Player.init()}),window.addEventListener("load",()=>{E.resizeCanvasArea(),E.Division.start(f)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Player={_audioElem:new Audio,init:function(){this._audioElem.src="korobeiniki.mp3",this._audioElem.loop=!0},play:function(){this._audioElem.play()},pause:function(){this._audioElem.pause()},stop:function(){this._audioElem.pause(),this._audioElem.currentTime=0}}}]);