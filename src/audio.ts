
export const Player = {
  _audioElem: new Audio(),

  play: function () {
    this._audioElem.loop = true;
    this._audioElem.src = 'korobeiniki.mp3';
    this._audioElem.play();
  },

  stop: function () {
    this._audioElem.pause();
  }
}