// Classes circles /////
// Gerardo T
// Short Study #//////
// I wanted to get used to the class functions and how they work
//so a relatively simple code but still crossing out all the requierement of the assignemnt
//Hold mousepad to increase the size of the circles

// This sketch makes a group of friendly ellipses bounce around the screen.
// When you click, they all grow a little!

let ellipses = []; // Array to store all the ellipse objects
let numEllipses = 6; // You can change this to have more or fewer ellipses

function setup() 
{
  createCanvas(600, 400);
  // Create ellipse objects into the array
  for (let i = 0; i < numEllipses; i++) 
    {
    let x = random(width);
    let y = random(height);
    let c = [random(100, 255), random(100, 255), random(100, 255)]; //this ramdomizes the color from the ranges of 100-255
    ellipses.push(new Circleball(x, y, c));
  }
}

function draw() 
{
  background(30); // dark background to see the colors better

  // Loop through all the ellipses and display them
  for (let e of ellipses) 
  {
    e.move();     // Make them bounce around
    e.display();  // Draw each one
  }

  // If mouse is pressed, grow all ellipses
  if (mouseIsPressed) 
  {
    for (let e of ellipses) 
    {
      e.grow();   // Make them get bigger
    }
  }
}

// This is the class for our bouncing ellipse friends
class Circleball 
{
  constructor(x, y, color) 
  {
    this.x = x;
    this.y = y;
    this.c = color;       // color of ellipse
    this.w = 40;          // Width  ellipse
    this.h = 30;          // Height of ellipse
    this.dx = random(-2, 2); // Speed in x direction ( horizontal)
    this.dy = random(-2, 2); // Speed in y (vertyical direction)
  }

  // This what allows the ball to move in its direction x and y
  move() 
  {
    this.x += this.dx;
    this.y += this.dy;

    // i want it to bounce off the canvas so this is where it goes , we change direction of bvall
    if (this.x < 0 || this.x > width) 
    {
      this.dx *= -1;
    }
    if (this.y < 0 || this.y > height) 
    {
      this.dy *= -1;
    }
  }

  // This is what draws the ellipse
  display() 
  {
    noStroke();
    fill(this.c[0], this.c[1], this.c[2]);
    ellipse(this.x, this.y, this.w, this.h);
  }
  // This will make the ellipse grow based off the mouse click 
  grow() 
  {
    this.w += 0.5;
    this.h += 0.3;
  }
}
