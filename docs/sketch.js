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

function setup() {
  createCanvas(width,height);
  frameRate(30);
}
window.onload = function() {
  $(function(){
    $(window).scrollTop(scroll_y);
    });
  //window.scrollTo(0,scroll_y);
  a_switch = true;
};

function draw() {
  now_scroll = $(window).scrollTop();
  a = -$(window).scrollTop() * 0.001 + 60; //初期角度0
  if(a_switch == true){
    $(function(){
      　 $(window).scrollTop(scroll_y);
      });//scroll_yの位置にスクロールバーがくる
    scroll_y +=v;
    v += g;
    console.log(v);
    console.log($(window).scrollTop());
    if($(window).scrollTop() > 99000){
      bounce_count ++;
      a_switch = false;
      a_switch2 = true;
      v = -4000;
    }
  }
  if(a_switch2 == true){
    console.log($(window).scrollTop());
    $(function(){
      　 $(window).scrollTop(scroll_y);
      });
    scroll_y +=v;
    v += g;
    if($(window).scrollTop() < 78000 && bounce_count == 1){
      bounce_count ++;
    }
    if($(window).scrollTop() > 99000 && bounce_count==2){
      console.log($(window).scrollTop());
      a_switch2 = false;
      a_switch3 = true;
      v = 0;
    }
  }
  if(a_switch3 == true){
    if(scroll_stop == false){
      if(now_scroll == last_scroll){ // スクロールをやめたら
        s_time = new Date();
        scroll_stop = true;
      }
    }
    if(scroll_stop == true){
      if(now_scroll == last_scroll){
        e_time = new Date();
        if((e_time.getTime() - s_time.getTime()) > 3){
          scroll_y = $(window).scrollTop();
          if($(window).scrollTop() > 99000){
            down = false;
          }
          else{
            console.log(v);
            down = true;
            console.log(down);
            scroll_stop = false;
          }
        }
      }
      else if(now_scroll != last_scroll){
        scroll_stop = false;
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
      if($(window).scrollTop() > 99000){
        bounce_count2 ++;
        v = -2000;
        down = false;
        up = true;
        console.log(v);
        console.log($(window).scrollTop());
      }
    }
    if(up == true){
      console.log($(window).scrollTop());
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });
      scroll_y +=v;
      v += g;
      if($(window).scrollTop() < 95900 && bounce_count2 == 1){
        bounce_count2 ++;
      }
      if($(window).scrollTop() > 99000 && bounce_count2==2){
        console.log($(window).scrollTop());
        up = false;
        v = 0;
        bounce_count2 = 0;
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