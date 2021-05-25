import { Level_oni } from "./js/Level_oni.js"
import { Oni_icon } from "./js/oni_icon.js"
import { Level_1 } from "./js/Level_1.js"
import { Level_2 } from "./js/Level_2.js"
import { Level_3 } from "./js/Level_3.js"
import { Level_4 } from "./js/Level_4.js"
import { Level_5 } from "./js/Level_5.js"
import { Winner } from "./js/Winner.js"

/*
入力値でエフェクトを変える用のやつーーーーーーーー
*/
let state = 0;
let textbox = document.getElementById('number');
let value = textbox.value;
textbox.addEventListener('change', () => {
  if (value == 0) {
    state = 0;
  } else if (value > 0 && value <= 20) {
    state = 1;
  } else if (value > 20 && value <= 40) {
    state = 2;
  } else if (value > 40 && value <= 60) {
    state = 3;
  } else if (value > 60 && value <= 80) {
    state = 4;
  } else if (value > 80 && value <= 100) {
    state = 5;
  }
  console.log(state);
});


const init = () => {
  //videoーーーーーーーーーーーーーーー
  // getUserMedia によるカメラ映像の取得
  let media = navigator.mediaDevices.getUserMedia({  // メディアデバイスを取得
    video: {
      facingMode: "user",
      width: 544,
      height: 306
    },                     // カメラの映像を使う（スマホならインカメラ）
    audio: false                                     // マイクの音声は使わない
  });
  media.then((stream) => {                           // メディアデバイスが取得できたら
    video.srcObject = stream;                        // video 要素にストリームを渡す
  });
  let video = document.getElementById("video");        // video 要素を取得

  //canvasーーーーーーーーーーーーーー
  let canvas = document.getElementById("canvas");      // canvas 要素の取得
  let stage = new createjs.Stage(canvas);

  //描画更新
  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", () => { loop() });


  /*
  画像読み込みーーーーーーーーーーーーーー
  */
  //鬼の画面全体のエフェクト
  let level_oni = new Level_oni();
  level_oni.alpha = 0;
  stage.addChild(level_oni);

  let oni = new Oni_icon();
  oni.x = oni.y = 15;
  oni.visible = false;
  stage.addChild(oni);

  //0~20%の画面全体のエフェクト
  let level_1 = new Level_1();
  level_1.alpha = 0;
  stage.addChild(level_1);

  //20~40%の画面全体のエフェクト
  let level_2 = new Level_2();
  level_2.alpha = 0;
  stage.addChild(level_2);

  //40~60%の画面全体のエフェクト
  let level_3 = new Level_3();
  level_3.alpha = 0;
  stage.addChild(level_3);

  //60~80%の画面全体のエフェクト
  let level_4 = new Level_4();
  level_4.alpha = 0;
  stage.addChild(level_4);

  //80~100%の画面全体のエフェクト
  let level_5 = new Level_5();
  level_5.alpha = 0;
  stage.addChild(level_5);

  //勝った時のエフェクト
  let shape = new createjs.Shape();
  shape.graphics.beginFill("black").drawRect(0, 0, 544, 306); // 長方形を描画
  shape.alpha = 0;
  stage.addChild(shape);
  let winner = new Winner();
  winner.alpha = 0;
  stage.addChild(winner);

  //負けたときのエフェクト
  let loser = new createjs.Bitmap("img/Loser.png");
  loser.y = -306;
  stage.addChild(loser);

  let finish = false;
  /** 
  更新し続けてるところ（エフェクト）ーーーー
  */
  const loop = () => {
    if (finish == false) {//ゲーム時
      value = textbox.value;//常に値を入力!
      if (state == 0) {//鬼の画面全体のエフェクト
        stage.addChild(oni);//鬼消えろ〜
        oni.visible = true;
        ab(0);
        removeParticle();
        removeTwinkle();
      } else {
        stage.removeChild(oni);//鬼消えろ〜
        oni.visible = false;
        oni.gotoAndPlay("keep");
        if (state == 5) {//81~100%の画面全体のエフェクト
          ab(5);
          Particle();//円形のパーティクル
          Twinkle();//キラキラ
        } else {
          removeParticle();
          removeTwinkle();
          if (state == 1) {//1~20%の画面全体のエフェクト
            ab(1);
          } else if (state == 2) {//21~40%の画面全体のエフェクト
            ab(2);
          } else if (state == 3) {//41~60%の画面全体のエフェクト
            ab(3);
          } else if (state == 4) {//61~80%の画面全体のエフェクト
            ab(4);
          }
        }
      }
    } if (finish == true) {//タイムアップ時
      if (state == 0) {
        value = 0;//値入力を止める風
        removeParticle();
        removeTwinkle();
      } else {
        value = 1;//値入力を止める風
        removeParticle();
        Twinkle();
      }
    }
  }

  const ab = (num) => {
    let array = [level_oni, level_1, level_2, level_3, level_4, level_5];
    let target = array[num];
    array.splice(num, 1);
    createjs.Tween.get(target).to({ alpha: 1 }, 1000);
    for (let i = 0; i < array.length; i++) {
      let not_target = array[i];
      createjs.Tween.get(not_target).to({ alpha: 0 }, 1000);
    }
  }


  /** 
   * パーティクル用の関数
  */
  let particles = [];
  let twinkles = [];
  // 円のパーティクル用
  let Particle = () => {
    // particle発生用
    for (let p = 0; p < 1; p++) {
      let particle = new createjs.Shape();
      particle.graphics
        .beginFill(createjs.Graphics.getHSL(360 * Math.random(), 60, 60))
        .drawCircle(0, 0, 3 + 20 * Math.random());
      // パーティクルの発生場所
      particle.x = 544 / 2 - 10 + Math.random() * 20;
      particle.y = 306 / 2;
      particle.alpha = 0;
      // 速度
      particle.vx = 22 * (Math.random() - 0.45);
      particle.vy = 22 * (Math.random() - 0.45);
      particle.life = 50;
      particle.compositeOperation = "lighter";
      stage.addChild(particle);
      particles.push(particle);
      createjs.Tween.get(particle).to({ alpha: 0 }, 400)
        .to({ alpha: Math.random() - 0.1 }, 100);
    }

    // particle更新用
    for (let p = 0; p < particles.length; p++) {
      let particle = particles[p];
      // 摩擦
      particle.vx *= 1.06;
      particle.vy *= 1.06;
      // 速度を位置に適用
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;// 寿命を減らす
      // 寿命の判定
      if (particle.life <= 0) {
        stage.removeChild(particle);
        particles.splice(p, 1);// 配列からも削除
      }
    }
  }
  // パーティクル削除用
  let removeParticle = () => {
    for (let p = 0; p < particles.length; p++) {
      let particle = particles[p];
      stage.removeChild(particle);
    }
  }

  // キラキラのパーティクル用
  let Twinkle = () => {
    //キラキラ発生用
    for (let i = 0; i < 1; i++) {
      let star = new createjs.Shape();
      star.graphics.beginFill("#FFFFFF").drawPolyStar(0, 0, 8, 4, 0.8, -90);
      star.x = 544 / 2 - 15 + Math.random() * 30;
      star.y = 306 / 2;
      star.alpha = 0;
      star.vx = 20 * (Math.random() - 0.5);
      star.vy = 20 * (Math.random() - 0.5);
      star.life = 60;
      star.compositeOperation = "lighter";
      stage.addChild(star);
      twinkles.push(star);
      createjs.Tween.get(star).wait(400).to({ alpha: Math.random() - 0.1 }, 800);
    }
    //キラキラ更新用
    for (let i = 0; i < twinkles.length; i++) {
      let star = twinkles[i];
      star.vx *= 0.97;
      star.vy *= 0.97;
      star.x += star.vx;
      star.y += star.vy;
      star.life -= 1;
      if (star.life <= 0) {
        stage.removeChild(star);
        twinkles.splice(i, 1);
      }
    }
  }
  // キラキラ削除用
  let removeTwinkle = () => {
    for (let i = 0; i < twinkles.length; i++) {
      let star = twinkles[i];
      stage.removeChild(star);
    }
  }


  let timeup = () => {
    finish = true;//loop()内の処理へ
    stage.removeChild(oni);
    stage.removeChild(level_oni);
    stage.removeChild(level_1);
    stage.removeChild(level_2);
    stage.removeChild(level_3);
    stage.removeChild(level_4);
    stage.removeChild(level_5);
    if (state == 0) {
      createjs.Tween.get(loser).to({ y: 0 }, 1300, createjs.Ease.bounceOut);
    } else {
      createjs.Tween.get(shape).to({ alpha: 0.6 }, 1300, createjs.Ease.circOut);
      createjs.Tween.get(winner).to({ alpha: 1 }, 1300, createjs.Ease.circOut);
    }
  }
  setTimeout(timeup, 12000);

}
init();