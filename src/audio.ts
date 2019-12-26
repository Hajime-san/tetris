
export const Player = {
  _audioElem: new Audio(),

  init: function () {
    this._audioElem.src = 'korobeiniki.mp3';
    this._audioElem.loop = true;
  },

  play: function () {
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

const context = new AudioContext();

//再生するバッファを準備
const prepareBuffer = async (path: string) => {
  //2. fetch APIで音声ファイルを取得
  const res = await fetch(path);
  //ArrayBufferを取得
  const arr = await res.arrayBuffer();
  //3. 音声ファイルをデコード
  const buf = await context.decodeAudioData(arr);

  return buf;
}


const play = async () => {
  const source = context.createBufferSource(); //4. Sourceノードを作成
  source.buffer = await prepareBuffer("./korobeiniki.mp3"); //5. 再生するバッファを指定
  source.connect(context.destination); // SourceノードをDestinationにつなぐ
  source.start(0);//6. 再生開始

}

play();