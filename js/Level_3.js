//41~60%の画面全体のエフェクト
export class Level_3 extends createjs.Sprite {
  constructor() {
    function* range(start, end) {//framesの数字の省略用
      for (let i = start; i < end; i++) {
        yield i;
      }
    }

    //SpriteSheetのデータを定義
    let data = {
      framerate: 30,  //１秒間に
      images: ["./img/Level_3.png"],
      frames: { width: 548, height: 310, regX: 0, regY: 0 },
      animations: {
        keep: {
          frames: [...range(0, 30)],
          speed: 0.4
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