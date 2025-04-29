////Work Study #6 //////
////I kept alot from the past homework onto this one but essentially changed the main dynamics///
///I wanted to create a popping effect that whenever a certain key is pressed the circle from previous will pop///
///Aswell if it is clicked in the middle the colors will change to any random color in the middle/////

let numEllipses = 30;
let radius = 250;
let ellipseSize = 30;
let centerX, centerY;
let circleColors = [];  //we used an array to incorporate the color of the ellipses
let isPopping = false;
let shootDistance = 0;

function setup() 
{
  createCanvas(1280, 720);
  centerX = width / 2;
  centerY = height / 2;
  resetColors();
}

function draw() 
{
  background(10, 10, 250);
  
  // Shooting animation that says when true, all ellipses will shoot a certain 'shoot Distance'
  //after reaching a certain distance it will reset
  if (isPopping) 
  {
    shootDistance += 2;
    if (shootDistance > 300) 
    {
      shootDistance = 0;
      isPopping = false;
    }
  }
  
  // Used from the last work study, using a loop to create locations for the ellipses in a circle shape
  for (let i = 0; i < numEllipses; i++) 
  {
    let angle = i * TWO_PI / numEllipses;
    let x, y;
    
    // this creates a trail behind the popping ellipses, adding the shoot distance to the radius, but still keeping it in the circular format
    //all in all there will be 4 trails, the first state in which the ellipses are in then the next three as shown below
    if (isPopping) 
      {
      x = centerX + (radius + shootDistance) * cos(angle);
      y = centerY + (radius + shootDistance) * sin(angle);
      
      // 1st trail, closest to the main ellipse when popping
      fill(red(circleColors[i]), green(circleColors[i]), blue(circleColors[i]), 150);
      ellipse
      ( centerX + (radius + shootDistance * 0.7) * cos(angle),
        centerY + (radius + shootDistance * 0.7) * sin(angle),
        ellipseSize * 0.8);
      
      // 2nd trail
      fill(red(circleColors[i]), green(circleColors[i]), blue(circleColors[i]), 100);
      ellipse
      ( centerX + (radius + shootDistance * 0.5) * cos(angle),
        centerY + (radius + shootDistance * 0.5) * sin(angle),
        ellipseSize * 0.6);
      
      // 3rd trail in the back, each trail going back the transparency increases
      fill(red(circleColors[i]), green(circleColors[i]), blue(circleColors[i]), 50);
      ellipse
      ( centerX + (radius + shootDistance * 0.3) * cos(angle),
        centerY + (radius + shootDistance * 0.3) * sin(angle),
        ellipseSize * 0.4);
    } 
    else 
    {
      x = centerX + radius * cos(angle);
      y = centerY + radius * sin(angle);
    }
    
    // Main ellipse trail / locations
    fill(circleColors[i]);
    ellipse(x, y, ellipseSize, ellipseSize);
  }
  
  // added instructions to help the user navigate
  fill(255);
  noStroke();
  textAlign(LEFT, BOTTOM);
  text("Click: Random Colors | R: Reset | P: Pop!", 20, height - 20);
}

//now we want to change the color of the ellipses after we click in the center for ALL of the ellipses
function mousePressed() 
{
  for (let i = 0; i < numEllipses; i++) 
  {
    circleColors[i] = color(random(100, 255), random(100, 255), random(100, 255));
  }
}
//simple key press to reset the colors back to its original color and another one to initiate the popping animation
function keyPressed() 
{
  if (key === 'r' || key === 'R') 
  {
    resetColors();
  }
  if (key === 'p' || key === 'P') 
  {
    isPopping = true;
    shootDistance = 0;
  }
}
//We need to state the function reset colors in order for the ellipses to return color
function resetColors() 
{
  for (let i = 0; i < numEllipses; i++)
  {
    circleColors[i] = color(50);
  }
}


