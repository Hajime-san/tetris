declare global {
  interface Window {
    webkitAudioContext: AudioContext,
  }
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const Player = {
  _audioElem: new Audio(),

  init: function () {
    this._audioElem.src = 'korobeiniki.mp3';
    this._audioElem.loop = true;
  },

  play: function () {
    this._audioElem.currentTime = 45;
    this._audioElem.play();
  },

  pause: function () {
    this._audioElem.pause();
  },

  stop: function () {
    this._audioElem.pause();
    this._audioElem.currentTime = 0;
  },

}