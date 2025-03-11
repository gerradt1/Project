///////// Homework 4 , "sIlLy CaT"////////
///// I wanted to create a funny cat image with some text to go with it //////////////
/// I will be incorporating some new features not gone over yet like alpha which essentialy fades out the color //////
//or extracts the alpha value from a p5.color object/////////

//create a p5.iamge object
let cutecat;
let fadeAlpha = 0;
// is false so when we run this code text does not show
let showText = false;
let startTime = 0;

function preload()
{
  cutecat = loadImage("images/cutecat.jpg");
}


function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
}

function draw() 
{
  background(220);
  //lets display cat
  image(cutecat, width / 2, height / 2);
//now lets begin to show text 
//we will also be using alpha so lets use a variable for that
//alpha will be the last digit in the rgb order
if (showText)
  {
    fill(250, 250, 250, fadeAlpha);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('!BOINK!', width / 2, height / 2 - 130);

    fadeAlpha +=5;

    if (fadeAlpha > 255) 
    {
      fadeAlpha = 255;
    }
    //we use millis - start time which is 0 = 4000 (4 seconds) then the text will go back to false 
    // which essentially means to be gone
    if (millis() - startTime >= 4000)
    {
      showText = false;
    }
  }
}
/// lets add a key press function that will initiate the text to show when code is running
/// we only want it to show when b or B is clicked though
/// hence, the key press function

function keyPressed()
{
  if (key === 'b' || key === 'B')
  {
    showText = true;
    fadeAlpha = 0; 
    startTime = millis(); 
    
  }
}