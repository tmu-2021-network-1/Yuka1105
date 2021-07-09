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
let a_switch2 = false;//スクロールをやめたら戻るためのスイッチ
var s_time;
var e_time;
let scroll_stop = false;
let down = false;
let add = 1;

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
    scroll_y +=add;
    add *=1.3;
    console.log($(window).scrollTop());
    if($(window).scrollTop() > 99000){
      a_switch = false;
      a_switch2 = true;
      add = 1;
    }
  }
  if(a_switch2 == true){
    console.log("１");
    if(scroll_stop == false){
      console.log("2");
      if(now_scroll == last_scroll){
        console.log("３");
        s_time = new Date();
        scroll_stop = true;
      }
    }
    if(scroll_stop == true){
      console.log("４");
      if(now_scroll == last_scroll){
        console.log("5");
        e_time = new Date();
        if((e_time.getTime() - s_time.getTime()) > 3){
          console.log("超えたよお");
          scroll_y = $(window).scrollTop();
          down = true;
          scroll_false = false;
        }
      }
      else if(now_scroll != last_scroll){
        console.log("6");
        scroll_stop = false;
      }
    }
    if(down == true){
      $(function(){
        　 $(window).scrollTop(scroll_y);
        });//scroll_yの位置にスクロールバーがくる
      scroll_y += add;
      add *=1.3;
      if($(window).scrollTop() > 99000){
        add = 1;
        down = false;
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

// window.addEventListener('load', (event) => {
//   window.addEventListener('scroll', (event) => {
//     if(now_scroll > last_scroll){
//       console.log('力を上に加えている');
//       console.log(a);
//       //a-=(now_scroll - last_scroll)*0.001;
      
//     }
//     else if(now_scroll < last_scroll){
//       console.log('力を下に加えている');
//       console.log(a);
//       //a+=(last_scroll - now_scroll)*0.001;
//     }
//     else{
//       console.log('力は加えられていない');
//     }
//   });
// });

