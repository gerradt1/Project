/*
////////"Stage Setup"////////
/////By. Gerardo Tolentino///
/////////////////////////////
//First Draft/////
//Since my track in the entertainment technology field is scenery design////
//i wanted to build a stage with the gopes of being able to animate and just//// 
//create something that looks good////
*/
function setup() {
  //set canvas size
  createCanvas(1280, 720);
  ///set background were lookingn for a dark blue almost night time scene
  background(10, 10, 50);
  //the stages should be in grey for now to indicate a structure of some sort
  fill(200);
  //lets also add a strokeweight to better indicate the structure
  strokeWeight(2);
  ///We want to build stage so lets start with sqaures or rectangle and will shade in as grey for now
  rect(100, 100, 350, 500);
  rect(450, 200, 350, 400);
  rect(800, 100, 350, 500);
  //lets add some "LED" panels as circle in the lower center of each structure
  //Lets shade them in something bright like yellow aswell
  fill(255, 200, 0);
  ellipse(263, 340, 200, 100);
  ellipse(630, 400, 200, 100);
  ellipse(990, 340, 200, 100);
  //now lets make the stage area and lets make that as a triangle for now
  //before we do that we must also make it black also
  fill(0);
  triangle(457, 600, 630, 500, 790, 600);
  

}


