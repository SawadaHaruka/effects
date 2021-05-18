//81~100%の画面全体のエフェクト
export class Level_5 extends createjs.Sprite {
  constructor() {
    function* range(start, end) {//framesの数字の省略用
      for (let i = start; i < end; i++) {
        yield i;
      }
    }

    function* turn_range(t_start, t_end) {
      for (let ii = t_start; ii > t_end; ii--) {
        yield ii;
      }
    }

    //SpriteSheetのデータを定義
    let data = {
      framerate: 30,  //１秒間に
      images: ["./img/Level_5.png"],
      frames: { width: 548, height: 310, regX: 0, regY: 0 },
      animations: {
        keep: {
          frames: [...turn_range(10, -1), ...range(0, 11)],
          speed: 0.6,
        }
      }
    }

    //スプライトシートのデータを使って SpritSheet をインスタンス化
    let spriteSheet = new createjs.SpriteSheet(data);

    //継承元の Sprite クラスに spriteSheetを渡して、Spriteのインスタンスを作る
    //1つ目が spriteSheet のインスタンス、2つ目が初期値
    super(spriteSheet, "keep");

  }
}