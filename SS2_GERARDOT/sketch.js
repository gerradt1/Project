/*
////////"Stage Setup" pt 2////////
/////By. Gerardo Tolentino///
/////////////////////////////
//Second Draft/////
//okay to move this project forward I wanted to add some change of light in the led//
//Main goal of this draft is to be able to have some sort of effect on the led panel//
//lets do brightness//
*/
//lets set some constants we can use throughout the whole code
let ledbrightness = 150; // Initial brightness of the LED panel
let x1 = 400;  //ellipse x1
let y1 = 340;   //ellipse y1
function setup() {
  //we will only be exeprimenting on one stage for 2nd project
  createCanvas(750, 750);
  
}
function draw(){
  background(10, 10, 50);
  fill(200);
  strokeWeight(2);
  rect(200, 100, 400, 500);

  //lets add some "LED" panels as circle in the lower center of each structure
  //Lets shade them in something bright like yellow aswell
  fill(ledbrightness, ledbrightness * 0.8, 0); 
  noStroke();
  //lets center out the ellipse
  ellipse(x1, y1, 200, 100);
  }
//lets begin mouse click process
function mousePressed() {
  //lets set the inital starting point of where the mouse click will take effect
  let d = dist(mouseX, mouseY, x1, y1);
  //next we must add an 'if' of <100 which sets a 100 pixel radius of our d
  if (d < 100) {
    //we increase brightness by 25
    ledbrightness += 25;
    //if brightness goes over 255 it will reset back to 100
  if (ledbrightness > 255) {
    ledbrightness = 100;
       }
    }
  }