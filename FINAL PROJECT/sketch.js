////Final Project////
////the beginning fazes of this project is just to get the firework aspect to work
////Through my research I figured the use of a vector would be my best route to go with
///it allows the use of velocity which will allow us to show the direction of firwork
////and it also allows us to control the aspect of the popping of the firework giving each particle its veloity and position aswell
///sources used, https://www.youtube.com/watch?v=YPKidHmretc&t=529s
///// https://www.youtube.com/watch?v=CKeyIbT3vXI&t=145s

let fireworks = [];  //creates a new firework when mouse is clicked
let gravity; //universal variable to control the gravity effect on the firework


function setup() 
{
  createCanvas(400, 400);
  gravity = createVector(-.0, 0.1); //gravity can change the direction we want the firework to head, altering the values can make it move left or right or faster into ai
}

function draw() 
{
  background(0);
for (let i = fireworks.length - 1; i >= 0; i--)
 {
  fireworks[i].update();
  fireworks[i].display();

if (fireworks[i].execute)
  {
  fireworks.splice(i,1);
  }
 }  
}

function mousePressed()
{
  fireworks.push(new Firework(mouseX, height));
}

class Firework
{
  constructor(x,y)
  {
    this.pos = createVector(x,y);
    this.vel = createVector(0, random(-5, -8)); // this allows the height to be changed whenever a firework explodes
    this.exploded = false;  // define exploded to essentially initiate the action of explosion, tells us whether or not it has actually exploded or not
    this.particles = [];
    this.execute = false;
  }

  update() //takes the velocity and adds it to the position
  {
    if (this.exploded === false)
    {
      this.vel.add(gravity);
      this.pos.add(this.vel);
      
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
    for (let i = 0; i < 22; i++)
      {
        let angle = random(TWO_PI);
        this.particles.push(new Explosion(this.pos.x, this.pos.y, angle));
      }
  }


  display()
  {
    if (this.exploded === false)
    {
      stroke(255, 0, 0);
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
  constructor(x,y,angle)
  {
    this.pos = createVector (x,y);
    let speed = random(.5,3);
    this.vel = createVector(cos(angle) * speed, sin(angle) * speed);
    this.fade = 255;
  }

  update()
  {
    // this.vel.add(gravity);
    this.pos.add(this.vel);
    this.fade -= 3; //this will set the timer for the overall visibility in which the firework will fadeout
  }

  display()
  {
    stroke(100, 150, 255, this.fade);
    strokeWeight(7);
    point(this.pos.x, this.pos.y)
  }
}

