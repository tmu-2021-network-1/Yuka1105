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
let bounce_high = -4000;
let img;

function preload() {
  img = loadImage("watermelon.png");
}
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
  console.log(bounce_kind);
  now_scroll = $(window).scrollTop();
  a = -$(window).scrollTop() * 0.0013 + 55; //初期角度0
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
    if($(window).scrollTop() > 74000){
      bounce_count ++;
      a_switch = false;
      a_switch2 = true;
      v = -3500;
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
    if($(window).scrollTop() < 58000 && bounce_count == 1){
      bounce_count ++;
      console.log(v);
      console.log($(window).scrollTop());
      console.log("7");
    }
    if($(window).scrollTop() > 74000 && bounce_count==2){
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
          if($(window).scrollTop() > 74000){
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
      if($(window).scrollTop() > 74000){
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
      if($(window).scrollTop() < 70900 && bounce_count2 == 1){
        bounce_count2 ++;
        console.log(v);
        console.log($(window).scrollTop());
        console.log("18");
      }
      if($(window).scrollTop() > 74000 && bounce_count2==2){
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
  background(82, 179, 217);
  translate(width/2,height/2-50);
  stroke(120,80,80);
  strokeWeight(10);
  strokeJoin(ROUND);
  rx = 140*Math.cos(a * (Math.PI / 180)); //角度aをラジアンに直している
  ry = 140*Math.sin(a * (Math.PI / 180));
  lx = 140*Math.cos(a * (Math.PI / 180)+PI);
  ly = 140*Math.sin(a * (Math.PI / 180)+PI);
  line(lx,ly,rx,ry);
  line(lx,ly,lx+50,ly+130);
  line(lx,ly,lx-50,ly+130);
  line(rx,ry,rx+50,ry+130);
  line(rx,ry,rx-50,ry+130);
  image(img,lx-38,ly+55, img.width / 5, img.height / 5);
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