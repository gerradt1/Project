////Final Project 2 ////
////In the second phase of my project, i got the funciton of the firework to actually work, 
////now i just wanted to get more control and see what else i can mess aorund with befoe implemneting a skyline view
//So for this project I wanted to create a fireworks that exploded all in unison, meaning itll have a uniform shape 
//I also wanted to see what I can see how i can adjust the color, which youll see upon explosion
//there is kind of a glow 
///sources used, https://www.youtube.com/watch?v=YPKidHmretc&t=529s
///// https://www.youtube.com/watch?v=CKeyIbT3vXI&t=145s

let fireworks = [];  //creates a new firework when mouse is clicked
let gravity; //universal variable to control the gravity effect on the firework


function setup() 
{
  createCanvas(400, 400);
  gravity = createVector(.01, 0.1); //gravity can change the direction we want the firework to head, altering the values can make it move left or right or faster into ai
}

function draw() 
{
  background(0);
for (let i = fireworks.length - 1; i >= 0; i--)
 {
  fireworks[i].update();  //updates fireworks physics
  fireworks[i].display();

if (fireworks[i].execute)
  {
  fireworks.splice(i,1); //removes firework from array to help run code more smoothly ( referenced from video)
  }
 }  
}

function mousePressed()
{
  fireworks.push(new Firework(mouseX, height));
}

function keyPressed()
{
  if (key === 'a' || key == 'A')
  {
    fireworks.push(new Firework(random(width), height, true));
  }
}

class Firework
{
  constructor(x,y, uniform = false)
  {
    this.pos = createVector(x,y);
    this.vel = createVector(0, random(-5, -8)); // this allows the height to be changed whenever a firework explodes(velocity=speed)
    this.exploded = false;  // define exploded to essentially initiate the action of explosion, tells us whether or not it has actually exploded or not
    this.particles = [];
    this.execute = false;
    this.uniform = uniform; //this ill determine the explosion style
    let r = random([255, random(180, 255)]);
    let g = random([255, random(180, 255)]);
    let b = random([255, random(180, 255)]);
    this.color = color(r, g, b); // we wanne use bright colors and random so we use an array to hold those values and 255 to get those colors
  }

  update() //takes the velocity and adds it to the position
  {
    if (this.exploded === false)
    {
      this.vel.add(gravity);  //adds gravtity to velocity
      this.pos.add(this.vel); //adds velocity to inital position
      
      if(this.vel.y >= 0 || this.pos.y <= height * 0.25)  //we want the height of the fireworks to not pass no more than or equal to 1/4 of the canvas height
      {
        this.exploded = true;
        this.explode();
      }
    }  

      for (let i = this.particles.length - 1; i >= 0; i--)
      {
        this.particles[i].update();
        if (this.particles[i].fade <= 0)
        {
          this.particles.splice(i, 1);
        }
      }
      if (this.exploded && this.particles.length === 0) 
      {
        this.execute = true;
      }
  }
//this explode function gives it its shape (circle 2pi)
  explode()
  {
    if (this.uniform)
    {
      for (let i = 0; i < 22; i++)
      {
        let angle = map(i, 0, 22, 0, TWO_PI); //spreads the particles in a circle shape evenly
        this.particles.push(new Explosion(this.pos.x, this.pos.y, angle, this.color, true));
      }
    }
    else
    {
    for (let i = 0; i < 6; i++)
      {
        let angle = random(TWO_PI); //this will spread the particles in a circle but a random angle making them jsut scatter
        this.particles.push(new Explosion(this.pos.x, this.pos.y, angle, this.color, false));
      }
    }
  }

  display()
  {
    if (this.exploded === false)
    {
      stroke(this.color);
      drawingContext.shadowBlur = 150; //this is the glow effect
      drawingContext.shadowColor = this.color;
      strokeWeight(7);
      point(this.pos.x, this.pos.y);   
    }
      for (let i = 0; i < this.particles.length; i++)//checks to make sure all particles are faded out to know the firework is finished
      {
        this.particles[i].display(); //tell the code to display the particles
      }
  } 
}  

class Explosion  // will give the explosion of particles initial speed and direction
{
  constructor(x, y, angle, col, uniform = false)
  {
    this.pos = createVector (x,y);
    let speed; 
    if (uniform)
    {
      speed = 2;
    } 
    else
    {
      speed = random(0.5, 3);
    }
    
    // let speed = random(.5,3);
    this.vel = createVector(cos(angle) * speed, sin(angle) * speed);
    this.fade = 255;
    this.color = col;
  }

  update()
  {
    // this.vel.add(gravity);
    this.pos.add(this.vel);
    this.fade -= 3; //this will set the timer for the overall visibility in which the firework will fadeout
  }

  display()
  {
    drawingContext.shadowBlur = 150;
    drawingContext.shadowColor = color(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.fade);
    stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.fade);
    strokeWeight(7);
    point(this.pos.x, this.pos.y)
  }
}

