/*
////////"lighting" pt 3////////
/////By. Gerardo Tolentino///
/////////////////////////////
//third Draft/////
//okay to move this project forward I wanted to add some change of light in the led//
//Main goal of this draft is to be able to have some sort of effect on the led panel//
//lets do change of color set to a random point, were gonna do this aswell by adding some led panels aswell//
*/
//lets set some variable we can use throughout the whole code
//is there a a way to group all of my rgb's so it can just be like one varibale to equate for all of them
let ledbrightness = 150; // Initial brightness of the LED panel
let x1 = 400;  //ellipse x1
let y1 = 340;   //ellipse y1
let rgb1 = 0, rgb2 = 0, rgb3 = 0; //setting the screen as black
let rgb4 = 0, rgb5 = 0, rgb6 = 0; //setting 2nd rectangle as black
//they are listed this way in order to keep organization and not take up to much space even though this is still to much space

function setup() {
  createCanvas(750, 750);
}
function draw(){
  background(10, 10, 50);
  fill(200);
  strokeWeight(2);
  rect(200, 100, 400, 500);
  rect(x1 - 100, y1 - 70, 200, 20);

  //were gonna add an LED panel on top and below of ellipse
  //this will be top of ellipse
  //the fill, we will want black at first so we set it from the variables in the beginning
  fill(rgb1, rgb2, rgb3);
  rect(x1 - 100, y1 - 84, 200, 20);

  //this one will be the led below the ellipse
  //same we want an initial black screen
  fill(rgb4, rgb5, rgb6);
  rect(x1 - 100, y1 + 60, 200, 20);

  fill(ledbrightness, ledbrightness * 0.8, 0); 
  noStroke();
  ellipse(x1, y1, 200, 100);
  }
//lets begin mouse click process
function mousePressed() {
  //lets set the inital starting point of where the mouse click will take effect
  let d = dist(mouseX, mouseY, x1, y1);
  //next we must add an 'if' of <100 which sets a 100 pixel radius of our d
  if (d < 55) {
    //we increase brightness by 25
    ledbrightness += 25;
    //if brightness goes over 255 it will reset back to 100
  if (ledbrightness > 255) {
    ledbrightness = 100;
       }
    }
  }

  //okay now our goal is to make the led rectangles have a random color effect when the key "c" is pressed
  //we do this by setting the color inside of rectangle to be random each time c or C is clicked
  function keyPressed(){
    if (key === 'c' || key === 'C'){
      rgb1 = random(255);
      rgb2 = random(255);
      rgb3 = random(255);

      rgb4 = random(255);
      rgb5 = random(255);
      rgb6 = random(255);

      //now lets try to reset it back to black with a key press 'r' that means 
      //all rgb varibales must be back at '0' in order to turn back to black

    } else if (key === 'r'){
      rgb1 = 0, rgb2 = 0, rgb3 = 0;
      rgb4 = 0, rgb5 = 0, rgb6 = 0;
    }
  }