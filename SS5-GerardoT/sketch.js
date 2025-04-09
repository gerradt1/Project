/* //////// CirCLES////////
//for this short study i wanted to reflect from my past midterm and realized something i used heavy 
////was circles/////
//so I wanted to fuerhter work on it to see what I can come up with///
//i created to interactrive loops////
//As you see one of them is a key press where you press it and the circles begin to grow////
//the other one is if you move the mouse i mapped it to a horizontal movement///
///furthermore the more you move either left or right there will be an effect
*/





let numEllipses = 30;       // Number of ellipses
let radius = 250;           // Radius of the big invincible circle little ellipses are making
let ellipseSize = 30;       // Size of each ellipse
let centerX, centerY;      // Center of the circle

let growingCircle = false; 
let maxSize = 300;
let speedGrowth = 0.5;




function setup() {
  createCanvas(1280, 720);
  centerX = width / 2;    // X position of the circle's center
  centerY = height / 2;   // Y position of the circle's center
  textSize = (16);
}

function draw() {
  background(10, 10, 50);

  if(growingCircle)
  {
    for(let g = 0; g < 1; g++)
    {
      ellipseSize += speedGrowth;
      if (ellipseSize > maxSize)
      {
        resetEllipses();
      }
    }
  }

  //I wanted to make this piece interactive by mapping it horizontally
  //as you move more to the right the ellipses will begin to light up
  let lightingAmount = map(mouseX, 0, width, 0, numEllipses);
  // let currentSize = ellipseSize;


  for (let i = 0; i < numEllipses; i++) 
    {
      //we want to equally space out 30 ellipses around a circle, hence 2pi representing a full circle
    let angle = i * TWO_PI / numEllipses;

    // we need to calculate X and Y positions for each ellipse
    //center will be the coordinates of the big invincible circles center because we want the little ellipse to be around that
    //radius will be the distance from center point to any point on circle
    //the angle at which it will go towards the little ellipse used by the loop
    //cos determines horizontal(x) placement 
    //sin will determine y placement
    //used p5 sketch refernce for help
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
  //logic for lighitng up circles
  //if statement will determine whether a current ellipse should be lit up depending on position of mouse
    if (i < lightingAmount) {
      // i used the lerp command for the color change because it can create a cool sort of color change itll interlop a color gradient from blue to red kind of leavng like  apurple trail too
      let lerpedColor = lerpColor(color(0, 0, 255), color(255, 0, 0), i / numEllipses);
      fill(lerpedColor);
    } else {
      // Make the ellipse appear "off" (gray color)
      fill(50);  // Gray for "off" state
    }

    // Draw the ellipse at the calculated position
    ellipse(x, y, ellipseSize, ellipseSize);
  }

  fill(255);
  noStroke();
  textAlign(LEFT, BOTTOM);
  text("<--> Move mouse Horizontally", 20, height - 40);
  text("press SPACE for growth", 20, height - 20);
}

//we want to reset the ellipses by using the following logic, aswell when space bar is clicked itll expand them
//however once reaching a certain amount they need to reset
function keyPressed()
{
  if(key === ' ')
  {
    if (growingCircle)
    {
      resetEllipses();
    }
    else 
    {
      growingCircle = true;
    }
  }
}
//need to state resetEllipses back to its original state which is the following
function resetEllipses()
{
  ellipseSize = 30;
  growingCircle = false;
}







