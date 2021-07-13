const width = window.innerWidth;
const height = window.innerHeight;
let a = 0;//角度
let last_scroll = 0;
let now_scroll = 0;
let lx = 0;
let ly = 0;
let rx = 0;
let ry = 0;
let scroll_y=60000;//スクロールバーの初期位置
let a_switch = false;//最初のスイッチ
let a_switch2 = false;//最初のスイッチ２
let a_switch3 = false;//スクロールをやめたら戻るためのスイッチ
var s_time;
var e_time;
let scroll_stop = false;
let down = false;
let up = false;
let v = 0;//速度
let g = 300;//重力
let bounce_count = 0;
let bounce_count2 = 0;
let bounce_kind = 0;
let bounce_low = -3000;
let bounce_high = -4000;
let img;

function preload() {
  img = loadImage("watermelon.png");
}
function setup() {
  createCanvas(width,height);
  frameRate(30);
}
//最初読み込まれた時にスクロールバーの初期位置を指定
window.onload = function() {
  $(function(){
    $(window).scrollTop(scroll_y);
  });
  a_switch = true;
};
//このサイトについて
$(function(){
  $('.js-modal-open').on('click',function(){
      $('.js-modal').fadeIn();
      return false;
  });
  $('.js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      return false;
  });
});
function draw() {
  now_scroll = $(window).scrollTop();//現在のスクロールバーの位置を代入
  a = -$(window).scrollTop() * 0.0013 + 55; //現在のスクロールバーの位置によって天秤の角度aが決まる
  //導入の跳ね返りアニメーション
  if(a_switch == true){
    $(function(){
      　 $(window).scrollTop(scroll_y);//scroll_yの位置にスクロールバーがくる
      });
    scroll_y +=v;//速度vによってスクロールバーの位置が決まる
    v += g;//重力gによって速度vが決まる
    if($(window).scrollTop() > 74000){
      bounce_count ++;
      a_switch = false;
      a_switch2 = true;
      v = -3500;
    }
  }
  if(a_switch2 == true){
    $(function(){
      　 $(window).scrollTop(scroll_y);
      });
    scroll_y +=v;
    v += g;
    if($(window).scrollTop() < 58000 && bounce_count == 1){
      bounce_count ++;
    }
    if($(window).scrollTop() > 74000 && bounce_count==2){
      a_switch2 = false;
      a_switch3 = true;
      v = 0;
    }
  }
  //導入の跳ね返りアニメーション終了

  //上の工程が終わるとスクロール可能になる
  if(a_switch3 == true){
    if(scroll_stop == false){ //スクロールしている時
      if($(window).scrollTop() < 1000){//スクロールバーの位置が頂点付近に来た時バウンドの大きさを大きくする
        bounce_kind = 1;
      }
      if(now_scroll == last_scroll){
        s_time = new Date();//最初にスクロール量がなくなった時刻を記録
        scroll_stop = true;
      }
    }
    if(scroll_stop == true){
      if(now_scroll == last_scroll){
        e_time = new Date();//スクロールしてない状態の時刻を記録し続ける（draw()によって毎度更新される）
        if((e_time.getTime() - s_time.getTime()) > 3){//e-s（スクロールしなかった時間）が十分にある時
          scroll_y = $(window).scrollTop();
          if($(window).scrollTop() > 74000){//74000とはスクロールバーが最下部にある状態
            down = false;
          }
          else{
            down = true;
            scroll_stop = false;
          }
        }
      }
      else if(now_scroll != last_scroll){
          scroll_stop = false;
      }
    }

    if(down == true){//落ちるアニメーション
      v += g;
      scroll_y += v;
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });//scroll_yの位置にスクロールバーがくる
      if($(window).scrollTop() > 74000){//スクロールバーが最下部に達した時
        bounce_count2 ++;
        //跳ね返りの高さを判別
        if(bounce_kind == 0){
          v = bounce_low;
        }
        else{
          v = bounce_high;
        }
        down = false;
        up = true;
      }
    }
    if(up == true){//跳ね返って上がるアニメーション
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });
      scroll_y +=v;
      v += g;
      if($(window).scrollTop() < 70900 && bounce_count2 == 1){
        bounce_count2 ++;
      }
      if($(window).scrollTop() > 74000 && bounce_count2==2){//再び最下部に達した時
        up = false;
        v = 0;
        bounce_count2 = 0;
        bounce_kind = 0;
      }
    }
  }
  //天秤の描画
  background(82, 179, 217);
  translate(width/2,height/2-50);
  stroke(120,80,80);
  strokeWeight(10);
  strokeJoin(ROUND);
  //rx,ryは天秤の棒の右端の座標
  rx = 140*Math.cos(a * (Math.PI / 180)); //角度aをラジアンに直している
  ry = 140*Math.sin(a * (Math.PI / 180));
  lx = 140*Math.cos(a * (Math.PI / 180)+PI);
  ly = 140*Math.sin(a * (Math.PI / 180)+PI);
  //天秤の棒
  line(lx,ly,rx,ry);
  //天秤の左右の紐
  line(lx,ly,lx+50,ly+130);
  line(lx,ly,lx-50,ly+130);
  line(rx,ry,rx+50,ry+130);
  line(rx,ry,rx-50,ry+130);
  //スイカ
  image(img,lx-38,ly+55, img.width / 5, img.height / 5);
  //その他の部品
  stroke(120,80,80);
  strokeWeight(10);
  strokeJoin(ROUND);
  fill(140,100,60);
  arc(lx,ly+130, 100,50, 0, PI);
  arc(rx,ry+130, 100,50, 0, PI);
  line(0,-50,0,250);
  fill(140,100,60);
  ellipse(0,-50,20,20);
  triangle(-130, 300, 130, 300, 0, 250);
  //紐
  noFill();
  strokeWeight(3);
  stroke(243,200,200);
  arc(rx,ry+146, 20, 39, 1.15, 5);
  arc(rx+5,ry+146, 20, 39, 1.15, 5);
  arc(rx+10,ry+146, 20, 39, 1.05, 5);
  line(rx+17,ry+130+30,rx,height);
  line(rx-9.5,ry+130+10,rx,height);
  
  last_scroll = now_scroll;
}