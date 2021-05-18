//鬼のアイコンのエフェクト
export class Oni_icon extends createjs.Sprite {
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
      images: ["./img/oni.png"],
      frames: { width: 76, height: 76, regX: 0, regY: 0 },
      animations: {
        keep: {
          frames: [...range(0, 21)],
          speed: 1,
          next: "stay"
        },
        stay: {
          frames: [21]
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