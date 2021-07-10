const width = window.innerWidth;
const height = window.innerHeight;
let a = 0;
let last_scroll = 0;
let now_scroll = 0;
let lx = 0;
let ly = 0;
let rx = 0;
let ry = 0;
let scroll_y=60000;
let a_switch = false; //最初のスイッチ
let a_switch2 = false; //最初のスイッチ２
let a_switch3 = false;//スクロールをやめたら戻るためのスイッチ
var s_time;
var e_time;
let scroll_stop = false;
let down = false;
let up = false;
let v = 0;
let g = 300;
let bounce_count = 0;
let bounce_count2 = 0;
let bounce_kind = 0;
let bounce_low = -3000;
let bounce_high = -6000;

function setup() {
  createCanvas(width,height);
  frameRate(30);
  console.log(v);
  console.log($(window).scrollTop());
  console.log("1");
}
window.onload = function() {
  $(function(){
    $(window).scrollTop(scroll_y);
    });
  //window.scrollTo(0,scroll_y);
  a_switch = true;
  console.log(v);
  console.log($(window).scrollTop());
  console.log("2");
};

function draw() {
  console.log(bounce_kind);
  now_scroll = $(window).scrollTop();
  a = -$(window).scrollTop() * 0.001 + 60; //初期角度0
  console.log(v);
  console.log($(window).scrollTop());
  console.log("3");
  if(a_switch == true){
    $(function(){
      　 $(window).scrollTop(scroll_y);
      });//scroll_yの位置にスクロールバーがくる
    scroll_y +=v;
    v += g;
    console.log(v);
    console.log($(window).scrollTop());
    console.log("4");
    if($(window).scrollTop() > 99000){
      bounce_count ++;
      a_switch = false;
      a_switch2 = true;
      v = -4000;
      console.log(v);
      console.log($(window).scrollTop());
      console.log("5");
    }
  }
  if(a_switch2 == true){
    console.log(v);
    console.log($(window).scrollTop());
    console.log("6");
    $(function(){
      　 $(window).scrollTop(scroll_y);
      });
    scroll_y +=v;
    v += g;
    if($(window).scrollTop() < 78000 && bounce_count == 1){
      bounce_count ++;
      console.log(v);
      console.log($(window).scrollTop());
      console.log("7");
    }
    if($(window).scrollTop() > 99000 && bounce_count==2){
      a_switch2 = false;
      a_switch3 = true;
      v = 0;
      console.log(v);
      console.log($(window).scrollTop());
      console.log("8");
    }
  }
  if(a_switch3 == true){
    console.log(v);
    console.log($(window).scrollTop());
    console.log("8");
    if(scroll_stop == false){ //スクロールしている時
      if($(window).scrollTop() < 1000){
        bounce_kind = 1;
      }
      if(now_scroll == last_scroll){ // スクロールをやめたら
        console.log(v);
        console.log($(window).scrollTop());
        console.log("9");
        s_time = new Date();
        scroll_stop = true;
      }
    }
    if(scroll_stop == true){
      if(now_scroll == last_scroll){
        e_time = new Date();
        console.log(v);
        console.log($(window).scrollTop());
        console.log("10");
        if((e_time.getTime() - s_time.getTime()) > 3){
          scroll_y = $(window).scrollTop();
          console.log(v);
          console.log($(window).scrollTop());
          console.log("11");
          if($(window).scrollTop() > 99000){
            down = false;
            console.log(v);
            console.log($(window).scrollTop());
            console.log("12");
          }
          else{
            down = true;
            scroll_stop = false;
            console.log(v);
            console.log($(window).scrollTop());
            console.log("13");
          }
        }
      }
      else if(now_scroll != last_scroll){
          scroll_stop = false;
          console.log(v);
          console.log($(window).scrollTop());
          console.log("14");
      }
    }

    if(down == true){
      v += g;
      scroll_y += v;
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });//scroll_yの位置にスクロールバーがくる
        console.log(v);
        console.log($(window).scrollTop());
        console.log(scroll_y);
        console.log("ダウンしてる時");
      if($(window).scrollTop() > 99000){
        bounce_count2 ++;
        if(bounce_kind == 0){
          v = bounce_low;
        }
        else{
          v = bounce_high;
        }
        down = false;
        up = true;
        console.log(v);
        console.log($(window).scrollTop());
        console.log("16");
      }
    }
    if(up == true){
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });
      scroll_y +=v;
      v += g;
      console.log(v);
      console.log($(window).scrollTop());
      console.log(scroll_y);
      console.log("17");
      if($(window).scrollTop() < 95900 && bounce_count2 == 1){
        bounce_count2 ++;
        console.log(v);
        console.log($(window).scrollTop());
        console.log("18");
      }
      if($(window).scrollTop() > 99000 && bounce_count2==2){
        up = false;
        v = 0;
        bounce_count2 = 0;
        bounce_kind = 0;
        console.log(v);
        console.log($(window).scrollTop());
        console.log("19");
      }
    }
  }
  background(70, 202, 255);
  translate(width/2,height/2-50);
  stroke(120,80,80);
  strokeWeight(10);
  strokeJoin(ROUND);
  rx = 150*Math.cos(a * (Math.PI / 180)); //角度aをラジアンに直している
  ry = 150*Math.sin(a * (Math.PI / 180));
  lx = 150*Math.cos(a * (Math.PI / 180)+PI);
  ly = 150*Math.sin(a * (Math.PI / 180)+PI);
  line(lx,ly,rx,ry);
  line(lx,ly,lx+50,ly+130);
  line(lx,ly,lx-50,ly+130);
  line(rx,ry,rx+50,ry+130);
  line(rx,ry,rx-50,ry+130);
  fill(200,100,100);
  ellipse(lx,ly+120,60,60);
  fill(140,100,60);
  arc(lx,ly+130, 100,50, 0, PI);
  arc(rx,ry+130, 100,50, 0, PI);
  line(0,-50,0,250);
  fill(140,100,60);
  ellipse(0,-50,30,30);
  triangle(-130, 300, 130, 300, 0, 250);
  last_scroll = now_scroll;
}