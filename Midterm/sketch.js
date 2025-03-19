/* ///// MIDTERM DRAFT///////
////WARNING FLASHING WARNING !!!/////
For my first midterm draft I wanted to continue on my stage design I started out with
I still have yet to complete a menu and guide of some sort, that should be included for the future
The main point however was to create a user experience with the code
For this project I included lights and made the first initial ellipse lights aswell
the lights currently are meant to represent a truss
the lights should load in as black to represent they are "off"
I incorparated a preset for the lights which is a flash effect(more will be coded in the future)
however in order to use the preset the user must first turn on the lights by using the key '1' it should then turn red
Again nothing will not happen if the lights are not on
once red the user can press the 'r' key and the lights will flash red and blue
I also incorparated a key press where the user can increase or decrease the frequency in the flashing lights
*/

// set some variables
let lightsOn = false; //when code runs lights are off, hence the black
let flashTime = 1500; //sets the duration of the flashing effect, youll notice more on slower frequencies
let initialFlash = 0; //this helps us know when the last flash occured to control the timing of it, helps us set timing of flashes
let currentFlash = false; //this helps us know if the lights should be on or off in the flashing sequence, not static like the black
let flashing = false;   // this actually initiates the flashing effect, hence its false meaning when code runs its set to false which should be off

function setup() {
   
  createCanvas(1280, 720);
}
  
function draw(){
  background(10, 10, 50);
  fill(200);
  strokeWeight(2);
  rect(100, 100, 350, 500);
  rect(450, 200, 350, 400);
  rect(800, 100, 350, 500);

  fill(0);
  triangle(457, 600, 630, 500, 790, 600);
// i added these tuss bars manually to my design tried to make it symmetrical
  stroke (0);
  strokeWeight(2);
  line(170, 255, 370, 255);
  line(870, 255, 1100, 255);
  line(480, 398, 575, 330);
  line(480, 422, 575, 489);
  line(675, 480, 773, 405);
  line(765, 377, 670, 327);

  //This begins the flashing sequence
  //lets set important variable lightColor which determines color of ellipses in the proper sequence
  let lightColor;
  //if lights on is true it will check whether the light is flashing or not(determined in key press)
  if (lightsOn)
  {
  if(flashing) //flashing will bounce back from red and blue
  {
    let currentTime = millis();  //lets us know the number of milliseconds that passed since code started
    //current time tracks current time in program
    if (currentTime - initialFlash > flashTime) //this determines how long it stays red or blue before changing by checking the difference of current time and initial flash
    {
      currentFlash = !currentFlash; //if currentFlash is false, it will become true and vice versa
      initialFlash = currentTime;    //this essentially means almost like a reset button on timer since the time of the last flash,making each flash of light change at the exact time
    }
    if (currentFlash)
    {
      lightColor = color(255, 0, 0);
    }
    else
    {
      lightColor = color(0, 0, 255);
    }
  }
   else
   {
    lightColor = color(255, 0, 0);
   }
  } 
   else
   {
    lightColor = color(0, 0, 0);
   } 
  fill(lightColor);
  strokeWeight(0);
  ellipse(263, 340, 200, 100);
  ellipse(630, 400, 200, 100);
  ellipse(990, 340, 200, 100);
  
///the light color right now was last left at black, hence the program should run and show lights at black
//to draw circes i incorporated a new methode 'lerp' I wanted to create circles on a line all equidistand from eachother 
// I found lerp in the p5 reference 
  fill (lightColor);
  noStroke();
  //to begin lerp uses (first value (start), second point, (end) and a amt, which is amt(amount)
  //we first start off by creating a loop by setting to 0. the condition i < 5 will make it so the loop stops running and does not pass by 5, because we want 5 circles, i ++ increases the value by one starting by 0 because we set it to i = 0.
  for (let i = 0; i < 5; i++)
    {
      let x = lerp(170, 370, i / 4); //170 is our starting x point, 370 is our second point, now the amount we want 5 circles on the line, that means there should be 4 equally distant segments to spread out 5 ellipse
      ellipse(x, 255, 20, 20);
    }
    noStroke();
    for (let i = 0; i < 5; i++)
    {
      let x = lerp(870, 1100, i / 4);
      ellipse(x, 255, 20, 20);
    }
    noStroke();
    for (let i = 0; i < 3; i++)
    {
      let x = lerp(480, 575, i / 2);
      let y = lerp(398, 330, i / 2);   //since the line is diagnol the y positions will end up in different places so we must represent y using the same lerp command as before, if we dont ellipse will end up in horizontal postion not following the diagnol line
      ellipse(x, y , 20, 20);
    }
    noStroke();
    for (let i = 0; i < 3; i++)
    {
      let x = lerp(480, 575, i / 2);
      let y = lerp(422, 489, i / 2);
      ellipse(x, y, 20, 20);
    }
    noStroke();
    for (let i = 0; i < 3; i++)
    {
      let x = lerp(675, 773, i / 2);
      let y = lerp(480, 405, i / 2);
      ellipse(x, y, 20, 20);
    }
    noStroke();
    for (let i = 0; i < 3; i++)
    {
      let x = lerp (765, 670, i / 2);
      let y = lerp(377, 327, i / 2);
      ellipse(x, y, 20, 20);
    }
  
}
function keyPressed()
{
  if (key === '1')
  {
    lightsOn = !lightsOn;
    if (!lightsOn)
      {
        flashing = false;
      }
  }
  if (key === 'r' && lightsOn)  //&& represents and 
  {
    flashing = !flashing;
  }
  if (keyCode === UP_ARROW)
  {
    if(flashTime > 100)
    {
      flashTime -= 50;
    }   
  }
  if (keyCode === DOWN_ARROW)
  {
    flashTime += 50;
  }
}

