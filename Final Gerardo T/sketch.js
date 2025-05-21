//FIREWORKS GRAND FINALE////
//for my finale I wanted to incorporate my skills making fireworks to create
//a finale. And so I created three parts of the finale that take place
//first we have the fireworks coming from both sides, coming together 
//then we have them going from one side to another
//then the finale is just alot of fireworks
//i wanted this to be a time duration of around 40 seconds
//links used for guidance
//https://www.youtube.com/watch?v=YPKidHmretc&t=529s
///// https://www.youtube.com/watch?v=CKeyIbT3vXI&t=145s

//
//PRESS SPACE TO START///////
// Mega Fireworks Finale
let buildings = [];
let windows = [];
let finaleRunning = false;
let finaleStartTime = 0;
let fireworks = [];
let gravity;
let finaleDuration = 40000; // Duration i wanted the fireworks
let hasTriggered = false; //prevents the code from running again if space bar is clicked again

function setup() 
{
  createCanvas(1400, 750);
  gravity = createVector(0, 0.2);
  generateCity(); //instead of building a skyline with buiudlings manually, i decided to generate them randomoly
  frameRate(60);
}

function draw() 
{
  drawSky();
  drawBuildings();

    if (!finaleRunning && !hasTriggered)
    {
        fill(255);
        textSize(32);
        textAlign(CENTER, TOP);
        text("Press SPACE BAR to start", width / 2, 20);
    }
    if (finaleRunning)
    {
     let elapsed = millis() - finaleStartTime;

    // Phase 1: launch fireworks from sides comming to middle
    if (elapsed < 10000) 
    {
      if (frameCount % 30 === 0) 
      {
        let offset = map(elapsed, 0, 10000, 0, width / 2 - 100); //calculates horizontal distance from the edges inward toward the middle
        fireworks.push(new Firework(width - offset, height, true));
        fireworks.push(new Firework(offset, height, true));  //TRUE sets the angles in which particles can explode in
      }
    }

    // Phase 2: Trail fireworks across screen from right to left
    else if (elapsed < 20000) 
    {
      if (frameCount % 13 === 0) 
      {
        let x = map(frameCount % 140, 0, 140, width, 0);
        fireworks.push(new Firework(x, height, true, true)); //makes the fireworks move left after 10seconds
      }
    }

    // Phase 3: Finale
    else if (elapsed < 40000) 
    {
      if (frameCount % 8 === 0) 
      {
        for (let i = 0; i < 5; i++) 
        {
          let x = random(width);
          fireworks.push(new Firework(x, height, false, false, false));
        }
      }
    }

    if (elapsed >= finaleDuration) 
    {
      finaleRunning = false;
      hasTriggered = false;
    } 
  }



  // Update and show all fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) 
  {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].done()) 
    {
      fireworks.splice(i, 1);
    }
  }



  for (let i = fireworks.length - 1; i >= 0; i--) 
  {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].done()) 
    {
      fireworks.splice(i, 1);
    }
  }
}

function keyPressed() 
{
  if (key === ' ' && !finaleRunning && !hasTriggered) 
  {
    finaleRunning = true;
    finaleStartTime = millis();
    hasTriggered = true;
  }
}

// I wanted to create a loop for making a city skyline
function generateCity() 
{
  for (let i = 0; i < width; i += random(50, 100)) 
  {
    let w = random(50, 100);
    let h = random(150, 400);
    buildings.push(new Building(i, height - h, w, h));
  }
}

function drawBuildings() 
{
  for (let b of buildings) 
  {
    b.show(); //show buiding
  }
}
//create a nice color change from the sky
function drawSky()
{
  for (let y = 0; y < height; y++) 
  {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(10, 30, 80), color(0, 0, 0), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

class Building 
{
  constructor(x, y, w, h) 
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.win = [];  //array position for our randmoly generated windows
    this.color = color(random(30, 70));
    for (let i = 0; i < this.h - 20; i += 20) 
    {
      for (let j = 10; j < this.w - 10; j += 20) 
      {
        if (random() < 0.4) 
        {
          this.win.push({ x: j, y: i });
        }
      }
    }
  }

  show() 
  {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    fill(255, 255, 100); //window lights
    for (let w of this.win) 
    {
      rect(this.x + w.x, this.y + w.y, 10, 15); //draws a window in the this.win array
    }
  }
}
class Firework 
{
  constructor(x, y, mirrored = false, trail = false, radial = false) 
  {
    this.pos = createVector(x, y);
    this.vel = createVector(0, random(-15, -18));
    this.exploded = false;
    this.particles = [];
    this.color = color(random(180, 255), random(180, 255), random(180, 255));
    this.trail = trail;
    this.radial = radial;  //controols how the the paricles spread out after explosion 
    this.mirrored = mirrored;
  }

  update() 
  {
    if (!this.exploded) 
    {
      this.vel.add(gravity);
      this.pos.add(this.vel);
      if (this.vel.y >= 0 || this.pos.y < height / 4) 
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
  }

  explode() 
  {
    let count = this.radial ? 6 : this.mirrored ? 12 : 6;
    let angles = this.radial
      ? [PI / 6, PI / 3, PI / 2, (2 * PI) / 3, PI]  //get the angles for explosion
      : Array.from({ length: count }, () => random(TWO_PI));

    for (let a of angles) 
    {
      this.particles.push(new Particle(this.pos.x, this.pos.y, a, this.color));
    }
  }

  done() 
  {
    return this.exploded && this.particles.length === 0;
  }

  display() 
  {
    if (!this.exploded) 
    {
      stroke(this.color);
      strokeWeight(this.trail ? 6 : 4);
      point(this.pos.x, this.pos.y);
    }
    for (let p of this.particles) 
    {
      p.display();
    }
  }
}

class Particle 
{
  constructor(x, y, angle, col) 
  {
    this.pos = createVector(x, y);
    let speed = random(2, 5);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.fade = 255;
    this.color = col;
  }

  update() 
  {
    this.pos.add(this.vel);
    this.fade -= 4;
  }

  display() {
    stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.fade);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}


