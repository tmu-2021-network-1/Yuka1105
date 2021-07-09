const width = window.innerWidth;
const height = window.innerHeight;
let a = 0;
let last_scroll = 0;
let now_scroll = 0;
let lx = 0;
let ly = 0;
let rx = 0;
let ry = 0;
let a_switch = false; //最初のスイッチ
let a_switch2 = false;//スクロールをやめたら戻るためのスイッチ

function setup() {
  createCanvas(width,height);
  frameRate(30);
}
window.onload = function() {
  scrollTo(0,50000);
  a_switch = true;
};

function draw() {
  now_scroll = window.scrollY;
  if(a_switch == true){
    a--;
    if(a <-50){
      a_switch = false;
    }
  }
  if(a_switch == false && a_switch2 == false){
    a = -window.scrollY * 0.001;//　最下部でa=-50;
    if(now_scroll == last_scroll){
      //a_switch2 = true;
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
  console.log(scroll);
  last_scroll = now_scroll;
}

window.addEventListener('load', (event) => {
  window.addEventListener('scroll', (event) => {
    if(now_scroll > last_scroll){
      console.log('力を上に加えている');
      console.log(a);
      //a-=(now_scroll - last_scroll)*0.001;
      
    }
    else if(now_scroll < last_scroll){
      console.log('力を下に加えている');
      console.log(a);
      //a+=(last_scroll - now_scroll)*0.001;
    }
    else{
      console.log('力は加えられていない');
    }
  });
});

