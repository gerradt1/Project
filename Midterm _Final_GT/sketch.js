/* ////////////                   ///////////
////////////////MIDTERM FINAL////////////////
For the final I wanted to showcase some of the things I learnt throughout the class
Aswell as create something since when I first began
I wanted to create controll between user and program which makes it interactive for the user aswell as dynamic at the same time
Im invested more into the lighting part and wanted to make that a focus///
*/

let lightsOn = false; //when code runs lights are off, hence the black
let flashTime = 1500; //sets the duration of the flashing effect, youll notice more on slower frequencies
let initialFlash = 0; //this helps us know when the last flash occured to control the timing of it, helps us set timing of flashes
let currentFlash = false; //this helps us know if the lights should be on or off in the flashing sequence, not static like the black
let flashing = false;   // this actually initiates the flashing effect, hence its false meaning when code runs its set to false which should be off
let sceneBegin = 1


function setup() {
 
 createCanvas(1280, 720);
 currentColor = color(255, 255, 255);   //current color will represent the random change in color for the draw menu
}
 function draw()   
 {
 background(10, 10, 50);

 if (sceneBegin === 1)
 {
  drawMenu();
 }
 else if (sceneBegin === 2)
 {
  drawStage();
 }
}

//We must set some variable before we can create the random colors in the letters that will show in the menu
lastColorChange = 0;  
colorChangeTiming = 100;  //we must state color change

 function drawMenu()
 {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  let waveEffect = millis() * 1.1;  //i called it wave effect to try and give it a wave effect

  if (millis() - lastColorChange > colorChangeTiming) //this checks the time passed since the last color change
{
    lastColorChange = millis();
    currentColor = color(random(100, 255), random(100, 255), random(100,255)); //this assigns the random color order to the current color variable and important to know it runs on a loop
}
  fill(currentColor);    
  text("Welcome to the Light Show", width / 2, height / 3);
  textSize(20);
  text("press SPACE to start", width / 2, height - 100);
  }

 function drawStage()
 {
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

 line(125, 390, 240, 435);
 line(260, 435, 375, 390);
 line(860, 390, 980, 435);
 line(1000, 435, 1115, 395);


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
     currentFlash = !currentFlash; //if currentFlash is false, it will become true and vice versa //not operator
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
   noStroke();
   for (let i = 0; i < 3; i++)
   {
    let x = lerp(125, 240, i / 2);
    let y = lerp(390, 435, i / 2);
    ellipse(x, y, 20, 20);
   }
   noStroke();
   for (let i = 0; i < 3; i++)
   {
    let x = lerp(260, 375, i / 2 );
    let y = lerp(435, 390, i / 2);
    ellipse(x, y, 20, 20);
   } 
   noStroke();
   for (let i = 0; i < 3; i++)
   {
    let x = lerp(860, 980, i / 2 );
    let y = lerp(390, 435, i / 2);
    ellipse(x, y, 20, 20);
   } 
   noStroke();
   for (let i = 0; i < 3; i++)
   {
    let x = lerp(1000, 1115, i / 2 );
    let y = lerp(435, 390, i / 2);
    ellipse(x, y, 20, 20);
   } 

   fill(255);
   textSize(15);
   textAlign(LEFT, BOTTOM);
   text("1: Turn on Lights", 10, height - 30);
   text("r: Start Flashing Sequence", 10, height - 15);
   text("Up Arrow: Increase Flash Frequency", 200, height - 30);
   text("Down Arrow: Decrease Flash Frequency", 200, height - 15);
   text("l: return to Menu", 500, height - 30);

}
// we want to make it that when the 1 key is pressed itll turn on the lights
// pressing 'r' after the fact that the lights were turned on will initiate the flashing
// it will not work if the lights are off
//secondly by pressing the upkey and downkey it will increase the time in which the flashing occurs
//FLASH WARNING, if set to high
function keyPressed()
{
  if (key === ' ')
  {
    sceneBegin = 2;
  }
 if (key === '1')
 {
   lightsOn = !lightsOn;  //lights on were initallty set to false meaning off at the start of the code, but if the 1 key is pressed the lightsOn statement becomes true with the '!'
   if (!lightsOn)
     {
       flashing = false;   //this prevents pressing r when the lights are not on to flash
     }
 }
 if (key === 'r' && lightsOn)  //&& represents and
 {
   flashing = !flashing;
 }
 if (keyCode === UP_ARROW)
 {
   if(flashTime > 100) //this sets a limit to how quick the flashes can occur
   {
     flashTime -= 50; //this is what makes the flash increase, by decreasing flash time by 50
   }  
 }
 if (keyCode === DOWN_ARROW)
 {
   flashTime += 50;
 }
 if (key === 'l')
 {
  sceneBegin = 1;
 }
}

