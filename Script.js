// draggable class Ship
// time track
// case choose
// noLoop()? Doesn't work
// Fightmonster function (set up array)
// death
// add sound

var stage = 0; // Variable to keep in track which scene to show
let stage1Time = 0; // Varible to record the start time of the game
let pressTime = 0;
let xTheta = 0;
let yTheta = 0;
let isPressed = false;
let turnOnLight = false;
let tentacles = [];
let monsters = [];
let tentacleCount = 0;
let ships = [];
let reefs = [];
let preMillis = 0;
let interval = 10000;
let beginTime = 100;
let oceanWave;
let seaNight;
let thunder;
let morning;
function preload() {
  background1 = loadImage("background1.png");
  tentacle1 = loadImage("tentacle1.png");
  monster1 = loadImage("monster1.png");
  ship2 = loadImage("ship2.png");
  reef1 = loadImage("reef1.png");
  oceanWave = loadSound("ocean-wave-2.mp3");
  seaNight = loadSound("sea-at-night-17353.mp3");
  thunder = loadSound(
    "big-thunder-recorded-in-stereo-with-rain-fall-and-lightning-67697.mp3"
  );
  morning = loadSound("morning-breeze-and-birds-35105.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(0.6);
}
function stopAllMusic() {
  if (oceanWave.isPlaying()) {
    oceanWave.stop();
  }
  if (seaNight.isPlaying()) {
    seaNight.stop();
  }
  if (thunder.isPlaying()) {
    thunder.stop();
  }
  if (morning.isPlaying()) {
    morning.stop();
  }
}

function draw() {
  rectMode(CORNER);
  if (stage == 0) {
    inital();
    if (!oceanWave.isPlaying()) {
      stopAllMusic();
      oceanWave.setVolume(0.2);
      oceanWave.play();
    }
  }
  if (stage == 1) {
    inside();
    if (!seaNight.isPlaying()) {
      stopAllMusic();
      seaNight.setVolume(1);
      seaNight.play();
    }
  }
  if (stage == 2) {
    gameOver();
    if (!thunder.isPlaying()) {
      stopAllMusic();
      thunder.setVolume(0.3);
      thunder.play();
    }
  }
  if (stage == 3) {
    success();
    if (!morning.isPlaying()) {
      stopAllMusic();
      morning.setVolume(0.4);
      morning.play();
    }
  }
}

function inital() {
  // background: ocean
  background("rgb(28,55,106)");
  // game title: lighthouse
  fill("white");
  textSize(50);
  text("Lighthouse", width * 0.37, height * 0.4);
  // instruction
  noStroke();
  fill("#AFBACF");
  rect(width * 0.21, height * 0.67, width * 0.35, height * 0.26);
  fill("#724747");
  textSize(20);
  text(
    "Press the space bar to turn on (off) the light beam ",
    width * 0.23,
    height * 0.7
  );
  text("Use the mouse to drag the ship ", width * 0.23, height * 0.75);
  text("Be careful with the monster and reefs ", width * 0.23, height * 0.8);
  text("May you see the daylight ", width * 0.23, height * 0.85);
  text("-- Last lighthouse keeper", width * 0.39, height * 0.9);
  // start Button
  fill("rgb(41,47,88)");
  stroke("#436097");
  strokeWeight(3);
  rect(width * 0.37, height * 0.5, 200, 70, 20);
  fill("white");
  textSize(30);
  text("Start", width * 0.37 + 60, height * 0.5 + 45);
  // draw the lighthouse
  // base
  push();
  translate(width * 0.6, height * 0.5);
  scale(0.5);
  noStroke();
  fill("rgb(114,71,71)");
  arc(0, 250, 180, 40, -0.5 * PI, 0.5 * PI);
  fill("rgb(133,104,104)");
  beginShape();
  vertex(-90, 300);
  vertex(-90, 360);
  arc(0, 360, 180, 40, 0, PI);
  vertex(90, 360);
  vertex(90, 300);
  arc(0, 300, 180, 40, 0, PI);
  endShape(CLOSE);
  fill("rgb(201,201,201)");
  ellipse(0, 300, 180, 40);
  // lighthouse itself
  fill("black");
  rect(-3, -10, 6, 20);
  fill("grey");
  triangle(-25, 25, 25, 25, 0, 0);
  fill("rgb(191,191,191)");
  rect(-25, 25, 50, 40);
  fill("grey");
  rect(-35, 65, 70, 20);
  rect(-45, 85, 90, 15);
  fill("rgb(206,199,145)");
  beginShape();
  vertex(-25, 100);
  vertex(-40, 300);
  arc(0, 300, 80, 20, 0, PI);
  vertex(40, 300);
  vertex(25, 100);
  endShape(CLOSE);
  // windows
  fill("black");
  rect(20, 110, 5, 15);
  rect(21, 150, 5, 15);
  rect(23, 190, 5, 15);
  rect(26, 230, 5, 15);
  // guardrail
  fill("rgb(114,71,71)");
  beginShape();
  vertex(90, 250);
  quadraticVertex(50, 270, 0, 270);
  vertex(0, 270);
  vertex(0, 320);
  arc(0, 300, 180, 40, 0, 0.5 * PI);
  vertex(90, 300);
  endShape(CLOSE);
  // frame of the base
  noFill();
  stroke("rgb(88,54,54)");
  strokeWeight(5);
  arc(0, 360, 180, 40, 0, PI);
  arc(0, 300, 180, 40, 0, PI);
  line(-90, 300, -90, 360);
  line(90, 300, 90, 360);
  // flashing light from the light room
  if (second() % 2 == 0) {
    noStroke();
    fill("rgba(236,236,30,0.54)");
    rect(-20, 30, 40, 30);
  }
  pop();
  // calling the wave function to draw the ocean waves
  wave();
  // calling the startButton function to interact
  startButton();
  beginTime++;
}

function wave() {
  // this is a function that handles the wave drawing portion of the code
  // set a value to determine how much waves fluctuate
  let yRadius = 5;
  // wave color
  stroke("rgb(67,97,153)");
  // reverse the direction of waves flowing by one second
  let millisecond = millis() % 2000;
  let phase;
  if (millisecond < 1000) {
    phase = map(millisecond, 0, 1000, -1, 1);
  } else {
    phase = map(millisecond, 1000, 2000, 1, -1);
  }
  // draw three waves
  for (let y = height * 0.74; y <= yRadius * 2 + height * 0.74; y++) {
    for (let x = width * 0.58; x < width * 0.58 + 100; x++) {
      let angle = map(x, width * 0.58, width * 0.58 + 100, 0, 4 * PI);
      point(x, sin(angle) * yRadius * phase + y);
    }
  }
  for (let y = height * 0.78; y <= yRadius * 2 + height * 0.78; y++) {
    for (let x = width * 0.6; x < width * 0.6 + 80; x++) {
      let angle = map(x, width * 0.6, width * 0.6 + 80, 0, 4 * PI);
      point(x, sin(angle) * yRadius * phase + y);
    }
  }
  for (let y = height * 0.82; y <= yRadius * 2 + height * 0.82; y++) {
    for (let x = width * 0.62; x < width * 0.62 + 60; x++) {
      let angle = map(x, width * 0.62, width * 0.62 + 60, 0, 4 * PI);
      point(x, sin(angle) * yRadius * phase + y);
    }
  }
}

function startButton() {
  if (
    mouseX > width * 0.37 &&
    mouseX < width * 0.37 + 200 &&
    mouseY > height * 0.5 &&
    mouseY < height * 0.5 + 70 &&
    stage == 0 &&
    beginTime > 20
  ) {
    // if mouse hovering the button, change color
    fill("rgb(152,161,218)");
    strokeWeight(3);
    rect(width * 0.37, height * 0.5, 200, 70, 20);
    fill("white");
    textSize(30);
    text("Start", width * 0.37 + 60, height * 0.5 + 45);
    // if the button is pressed, enter the next stage and record the start time
    if (mouseIsPressed) {
      stage = 1;
      stage1Time = millis();
      preMillis = millis();
      chooseCase();
    }
  }
}
class Tentacle {
  constructor() {
    //generate random x, y position inside the window
    this.tentacleX = random(450, 820);
    this.tentacleY = random(50, 100);
    // tentacle life bar
    this.health = 100;
    // check if the tentacle is being attacked
    this.beingAttacked = false;
    // radar point
    this.circlexPos = map(this.tentacleX, 450, 820, 320, 400);
    this.circleyPos = map(this.tentacleY, 50, 100, 120, 180);
  }
  drawTentacle() {
    // import the tentacle img
    push();
    translate(this.tentacleX, this.tentacleY);
    image(tentacle1, 0, 0);
    // draw the life bar
    fill(224, 230, 121);
    rect(0, 0, this.health, 10);
    pop();
    // draw the radar point
    push();
    translate(this.circlexPos, this.circleyPos);
    noStroke();
    fill("red");
    circle(0, 0, 5);
    pop();
  }
  decreaseHealth() {
    // if the light beam is shooting the tentacle, the tentacle is being attacked
    if (
      mouseX > this.tentacleX + 50 &&
      mouseX < this.tentacleX + 110 &&
      mouseY > this.tentacleY &&
      mouseY < this.tentacleY + 250
    ) {
      if (turnOnLight) {
        this.beingAttacked = true;
      } else {
        this.beingAttacked = false;
      }
    } else {
      this.beingAttacked = false;
    }
    // life bar goes down when being attacked
    // red box to show the injured state
    if (this.beingAttacked) {
      if (this.health > 0) {
        this.health--;
        noStroke();
        fill("#FF000051");
        rect(this.tentacleX + 15, this.tentacleY + 20, 60, 230);
      }
    }
  }
}
class Monster {
  constructor() {
    // generate random x around the center of the window
    this.monsterX = random(625, 725);
    this.monsterY = random(50, 100);
    // traget point is around the edges
    this.targetX = random(200, 300);
    // acutally wanna choose random value from both the left side and the right side
    if (this.targetX <= 250) {
      this.targetX += 850; // go to the right side
    }
    this.targetY = random(0, 10);
    // lerp movement variables
    this.lerpAmt = 0;
    this.speed = 0.005;
    this.currentX = 0;
    this.currentY = 0;
    // monster life bar
    this.health = 150;
    // check if the monster is being attacked
    this.beingAttacked = false;
    // radar point
    this.circlexPos = map(this.monsterX, 625, 725, 320, 400);
    this.circleyPos = map(this.monsterY, 50, 100, 120, 180);
  }
  drawMonster() {
    // lerp movement
    this.lerpAmt += this.speed;
    this.lerpAmt = constrain(this.lerpAmt, 0, 1);
    this.currentX = lerp(this.monsterX, this.targetX, this.lerpAmt);
    this.currentY = lerp(this.monsterY, this.targetY, this.lerpAmt);
    image(monster1, this.currentX, this.currentY);
    // draw the life bar
    fill(224, 230, 121);
    rect(this.currentX, this.currentY, this.health, 10);
    // draw the radar point
    this.circlexPos = map(this.currentX, 200, 1100, 320, 400);
    this.circleyPos = map(this.currentY, 0, 100, 120, 180);
    noStroke();
    fill("red");
    circle(this.circlexPos, this.circleyPos, 5);
  }
  decreaseHealth() {
    // if the light beam is shooting the monster, the monster is being attacked
    if (
      mouseX > this.currentX + 7 &&
      mouseX < this.currentX + 147 &&
      mouseY > this.currentY + 40 &&
      mouseY < this.currentY + 210
    ) {
      if (turnOnLight) {
        this.beingAttacked = true;
      } else {
        this.beingAttacked = false;
      }
    } else {
      this.beingAttacked = false;
    }
    // life bar goes down when being attacked
    // red box to show the injured state
    // speed decreases to half
    if (this.beingAttacked) {
      if (this.health > 0) {
        this.health--;
        noStroke();
        fill("#FF000051");
        rect(this.currentX + 7, this.currentY + 40, 140, 170);
        this.speed = 0.0025;
      }
    } else {
      this.speed = 0.005;
    }
  }
}
class Draggable {
  constructor() {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.crash = false;
    this.arrived = false;
    this.shipX = random(400, 500);
    this.shipY = random(80, 120);
    // choose random value from both the left side and the right side
    if (this.shipX <= 450) {
      this.shipX += 370; // go to the right side
    }
    if (this.shipY <= 100) {
      this.shipY += 150; // go to the lower side
    }
    this.currentX = this.shipX;
    this.currentY = this.shipY;

    // Dimensions
    //this.size = rect(this.shipX+10,this.shipY +5, 70, 72);
    // radar point
    this.circlexPos = map(this.shipX, 400, 950, 320, 400);
    this.circleyPos = map(this.shipY, 100, 300, 120, 180);
  }

  over() {
    // Is mouse over object
    if (
      mouseX - 50 > this.shipX + 10 &&
      mouseX - 50 < this.shipX + 80 &&
      mouseY > this.shipY + 5 &&
      mouseY < this.shipY + 77
    ) {
      //rect(this.shipX + 10, this.shipY + 5, 70, 72);
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      // 适中的拖拽范围
      if (mouseX > 400 && mouseX < 950 && mouseY > 80 && mouseY < 290) {
        this.shipX = mouseX + this.offsetX;
        this.shipY = mouseY + this.offsetY;
      }
    }
    this.circlexPos = map(this.shipX, 300, 970, 330, 400);
    this.circleyPos = map(this.shipY, 50, 300, 125, 190);
  }

  show() {
    // console.log(this.dragging);
    // console.log(this.rollover);
    // console.log(this.shipX);
    // console.log(this.shipY);

    image(ship2, this.shipX, this.shipY);
    //console.log("The ship is being shown")
    // draw the radar point
    // this.circlexPos = map(this.shipX, 200, 1100, 320, 400);
    // this.circleyPos = map(this.shipY, 0, 100, 120, 180);
    noStroke();
    fill("green");
    circle(this.circlexPos, this.circleyPos, 5);

    // // Different fill based on state
    // if (this.dragging) {
    // 	fill('#F6FE61A3()');
    // 	//console.log("The ship is being dargged")
    if (this.rollover) {
      fill("#EDF2906B");
      rect(this.shipX + 10, this.shipY + 5, 70, 72);
    }
  }

  pressed() {
    // Did I click on the rectangle?
    if (this.rollover) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.shipX - mouseX;
      this.offsetY = this.shipY - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class Reef {
  constructor() {
    // traget point is around the edges
    this.reefX = random(550, 700);
    this.reefY = random(100, 275);
    this.lit = false;
    //this.size = rect(reefX,reefY+20, 100,55);
  }
  drawReef() {
    image(reef1, this.reefX, this.reefY);
  }
  lightReef() {
    if (
      mouseX > this.reefX + 10 &&
      mouseX < this.reefX + 100 &&
      mouseY > this.reefY + 20 &&
      mouseY < this.reefY + 80
    ) {
      if (turnOnLight) {
        this.lit = true;
      } else {
        this.lit = false;
      }
    } else {
      this.lit = false;
    }
  }
}

function inside() {
  translate(50, 0);
  background("rgb(14,26,51)");
  image(background1, 300, 100);
  // lower column
  noStroke();
  fill("rgb(63,63,63)");
  ellipse(675, 460, 160, 40);
  rect(695, 470, 30, 130);
  fill("rgb(40,40,40)");
  rect(635, 480, 60, 120);
  beginShape();
  vertex(595, 460);
  vertex(595, 480);
  quadraticVertex(675, 500, 755, 480);
  vertex(755, 460);
  quadraticVertex(675, 480, 595, 460);
  endShape(CLOSE);
  //upper column
  fill("rgb(38,38,38)");
  beginShape();
  vertex(660, 400);
  vertex(660, 450);
  quadraticVertex(675, 460, 690, 450);
  vertex(690, 400);
  endShape(CLOSE);

  radar();
  recordTime();
  // if the light button is pressed, activate the buttonPressed anime
  if (isPressed) {
    buttonPressed();
  }
  // if the light button is not pressed, draw the static version
  noStroke();
  if (!isPressed) {
    fill("rgb(131,37,37)");
    ellipse(675, 380, 80, 40);
    fill("rgb(79,16,16)");
    beginShape();
    vertex(635, 380);
    vertex(635, 400);
    quadraticVertex(675, 420, 715, 400);
    vertex(715, 380);
    quadraticVertex(675, 400, 635, 380);
    endShape(CLOSE);
  }
  // if the light button is turned on, draw the light beam according to mouse position
  if (turnOnLight) {
    stroke("rgba(255,255,168,0.7)");
    strokeWeight(6);
    fill("rgba(255,242,56,0.8)");
    triangle(675, 380, mouseX + 30 - 50, mouseY, mouseX - 30 - 50, mouseY);
  }
  //saveShip();
  //chooseCase();
  if (millis() > preMillis + interval && millis() - stage1Time <= 90000) {
    // console.log("ChooseCase");
    chooseCase();
    preMillis = millis();
  }
  //saveShip();
  //fightMonster();
  casePlay();
  if (millis() - stage1Time > 90000) {
    stage = 3;
  }
}

function radar() {
  // grey base
  stroke("rgb(64,134,168)");
  strokeWeight(3);
  fill("rgb(213,213,213)");
  circle(360, 150, 80);
  // circles insiade
  noStroke();
  fill("rgb(64,134,168)");
  circle(360, 150, 5);
  noFill();
  stroke("rgb(64,134,168)");
  circle(360, 150, 20);
  circle(360, 150, 40);
  circle(360, 150, 60);
  // rotating line
  stroke("rgb(80,191,244)");
  line(
    360,
    150,
    360 + cos(radians(xTheta)) * 40,
    150 + sin(radians(yTheta)) * 40
  );
  xTheta += 1;
  yTheta += 1;
}

function recordTime() {
  // draw time record light house shape
  noStroke();
  fill("rgb(241,236,181)");
  rect(967, 130, 6, 10);
  rect(960, 140, 20, 15);
  rect(955, 155, 30, 15);
  beginShape();
  vertex(960, 170);
  vertex(955, 220);
  vertex(985, 220);
  vertex(980, 170);
  endShape();
  // make a rectangle layer mask on top of the light house shape, which decreases by time
  let timeCount = millis() - stage1Time;
  if (timeCount <= 90000) {
    fill("rgb(32,56,108)");
    rect(955, 125, 40, 90 - timeCount / 1000);
  }
}

function keyPressed() {
  if (key == " ") {
    pressTime = millis();
    isPressed = true;
    turnOnLight = !turnOnLight;
  }
}

function buttonPressed() {
  let elapsedTime = millis() - pressTime; // Calculate elapsed time since button press

  let newSpeed = map(elapsedTime, 0, 1000, 0, 60); // Map elapsed time to speed range (0 to 60)

  // If the elapsed time is less than 1000ms, animate downwards
  if (elapsedTime <= 500) {
    push();
    fill("rgb(131,37,37)");
    ellipse(675, 380 + newSpeed, 80, 40); // Move ellipse downwards as newSpeed increases
    fill("rgb(79,16,16)");
    beginShape();
    vertex(635, 380 + newSpeed);
    vertex(635, 400 + newSpeed);
    quadraticVertex(675, 420 + newSpeed, 715, 400 + newSpeed);
    vertex(715, 380 + newSpeed);
    quadraticVertex(675, 400 + newSpeed, 635, 380 + newSpeed);
    endShape(CLOSE);
    pop();
  }

  // If the elapsed time is greater than 500ms (after the press), animate upwards
  if (elapsedTime > 500 && elapsedTime <= 1000) {
    let reverseSpeed = map(elapsedTime, 500, 1000, 30, 0); // Reverse animation
    push();
    fill("rgb(131,37,37)");
    ellipse(675, 380 + reverseSpeed, 80, 40); // Move ellipse upwards as reverseSpeed decreases
    fill("rgb(79,16,16)");
    beginShape();
    vertex(635, 380 + reverseSpeed);
    vertex(635, 400 + reverseSpeed);
    quadraticVertex(675, 420 + reverseSpeed, 715, 400 + reverseSpeed);
    vertex(715, 380 + reverseSpeed);
    quadraticVertex(675, 400 + reverseSpeed, 635, 380 + reverseSpeed);
    endShape(CLOSE);
    pop();
  }
  if (elapsedTime > 1000) {
    fill("rgb(131,37,37)");
    ellipse(675, 380, 80, 40);
    fill("rgb(79,16,16)");
    beginShape();
    vertex(635, 380);
    vertex(635, 400);
    quadraticVertex(675, 420, 715, 400);
    vertex(715, 380);
    quadraticVertex(675, 400, 635, 380);
    endShape(CLOSE);
  }
}

function mousePressed() {
  for (let i = 0; i < ships.length; i++) {
    ships[i].pressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < ships.length; i++) {
    ships[i].released();
  }
}

let tentacleDefeated = 0;
let attacking = true;
function fightMonster() {
  // console.log(tentacleDefeated);
  if (attacking == true) {
    // Create the first tentacle if none exist
    if (tentacleCount == 0) {
      let tentacle = new Tentacle();
      tentacles.push(tentacle);
      tentacleCount++;
    }
    // Process the tentacle (first or second, depending on health)
    for (let i = 0; i < tentacles.length; i++) {
      if (tentacles[i].health > 0) {
        tentacles[i].drawTentacle(); // Draw the tentacle
        tentacles[i].decreaseHealth(); // Decrease its health
      } else {
        // Tentacle's health is 0, so remove it
        tentacles.splice(i, 1);
        tentacleDefeated++;
      }
    }
    // Create the next tentacle after the first one is gone
    if (tentacleDefeated < 2 && tentacles.length == 0) {
      let tentacle = new Tentacle();
      tentacles.push(tentacle);
    }
    if (tentacleDefeated >= 2 && tentacles.length == 0) {
      let monster = new Monster();
      monsters.push(monster);
      for (let i = 0; i < 1; i++) {
        if (monsters[i].health > 0) {
          monsters[i].drawMonster(); // Draw the tentacle
          monsters[i].decreaseHealth(); // Decrease its health
          if (monsters[i].lerpAmt >= 1) {
            //console.log("The monster has escaped!");
            stage = 2;
          }
        } else {
          monsters.splice(i, 1);
          tentacleCount = 0;
          tentacleDefeated = 0;
          attacking = false;
        }
      }
    }
  }
}

function saveShip() {
  for (let i = 0; i < ships.length; i++) {
    ships[i].over();
    ships[i].update();
    ships[i].show();
    let destX = 1300 - ships[i].currentX;
    let destY = 400 - ships[i].currentY;
    noStroke();
    fill("red");
    rect(destX, destY, 3, 25);
    triangle(destX, destY, destX, destY + 10, destX + 15, destY + 5);
    for (let j = 0; j < 2; j++) {
      if (reefs.length > 0) {
        // reefs[j].drawReef();
        // // rectMode(CENTER);
        // // fill('rgba(255,150,147,0.47)')
        // rect(reefs[j].reefX+50, reefs[j].reefY+50, 80, 50);
        reefs[j].lightReef();
        if (reefs[j].lit) {
          reefs[j].drawReef();
        }
        if (ships[i].dragging) {
          // rectMode(CENTER);
          // fill('rgba(255,246,147,0.36)')
          // rect(ships[i].shipX+45, ships[i].shipY+41, 70, 72);
          if (
            ships[i].shipX + 10 < reefs[j].reefX + 70 &&
            ships[i].shipX + 80 > reefs[j].reefX + 30 &&
            ships[i].shipY + 77 > reefs[j].reefY + 25 &&
            ships[i].shipY + 5 < reefs[j].reefY + 75
          ) {
            ships[i].crash = true;
            stage = 2;
            ships = [];
            reefs = [];
          }
        }
        if (ships.length > 0) {
          if (ships[i].crash == false) {
            // rectMode(CENTER);
            // rect(destX+10,destY+15,20,30);
            if (
              ships[i].shipX + 10 < destX &&
              ships[i].shipX + 80 > destX + 20 &&
              ships[i].shipY + 5 < destY + 30 &&
              ships[i].shipY + 77 > destY
            ) {
              ships[i].arrived = true;
              ships = [];
              reefs = [];
            }
          }
        }
      }
    }
  }

  // draw the destination based on the ship position
}
let hasChosen = false; // Global flag to track if the function has been run

function chooseCase() {
  // Run the random selection once
  if (Math.random() >= 0.5) {
    hasChosen = true; //monster
    attacking = true;
  } else {
    hasChosen = false;
    let ship = new Draggable();
    ships.push(ship);
    let reefI = new Reef();
    reefs.push(reefI);
    let reefII = new Reef();
    reefs.push(reefII);
  }
}

function gameOver() {
  background("rgb(14,26,51)");
  fill("rgb(142,2,2)");
  textSize(50);
  text("Game Over", width * 0.45, height * 0.4);

  // Restart button
  fill("rgb(41,47,88)");
  strokeWeight(3);
  rect(width * 0.5, height * 0.5, 200, 70, 20);
  fill("white");
  textSize(30);
  text("Restart", width * 0.5 + 50, height * 0.5 + 45);

  // Check if mouse is clicked on restart button
  if (
    mouseX > width * 0.5 &&
    mouseX < width * 0.5 + 200 &&
    mouseY > height * 0.5 &&
    mouseY < height * 0.5 + 70
  ) {
    fill("rgb(152,161,218)");
    strokeWeight(3);
    rect(width * 0.5, height * 0.5, 200, 70, 20);
    fill("white");
    textSize(30);
    text("Restart", width * 0.5 + 50, height * 0.5 + 45);
    if (mouseIsPressed) {
      // Reset the stage and relevant variables
      stage = 0;
      beginTime = 0;
      stage1Time = 0;
      tentacleCount = 0;
      tentacleDefeated = 0;
      attacking = false;
      hasChosen = false;
      turnOnLight = false;
      isPressed = false;
      tentacles = [];
      monsters = [];
      ships = [];
      reefs = [];
    }
  }
}
function casePlay() {
  if (hasChosen) {
    fightMonster();
  } else {
    saveShip();
  }
}
function success() {
  background("rgb(74,149,204)");
  stroke("white");
  textSize(50);
  fill('#292F58');
  text("Congratulations", width * 0.4, height * 0.4);
  // Restart button
 
  fill("rgb(41,47,88)");
  strokeWeight(3);
  rect(width * 0.4, height * 0.5, 200, 70, 20);
  fill("black");
  textSize(30);
  text("Restart", width * 0.4 + 50, height * 0.5 + 45);
  
  // Check if mouse is clicked on restart button
  if (
    mouseX > width * 0.4 &&
    mouseX < width * 0.4 + 200 &&
    mouseY > height * 0.5 &&
    mouseY < height * 0.5 + 70
  ) {
    fill("rgb(152,161,218)");
    strokeWeight(3);
    rect(width * 0.4, height * 0.5, 200, 70, 20);
    fill("white");
    textSize(30);
    text("Restart", width * 0.4 + 50, height * 0.5 + 45);

    if (mouseIsPressed) {
      // Reset the stage and relevant variables
      stage = 0;
      beginTime = 0;
      stage1Time = 0;
      tentacleCount = 0;
      tentacleDefeated = 0;
      attacking = false;
      hasChosen = false;
      turnOnLight = false;
      isPressed = false;
      tentacles = [];
      monsters = [];
      ships = [];
      reefs = [];
    }
  }
  // draw the lighthouse
  // base
  push();
  translate(width * 0.6, height * 0.5);
  scale(0.5);
  noStroke();
  fill("rgb(114,71,71)");
  arc(0, 250, 180, 40, -0.5 * PI, 0.5 * PI);
  fill("rgb(133,104,104)");
  beginShape();
  vertex(-90, 300);
  vertex(-90, 360);
  arc(0, 360, 180, 40, 0, PI);
  vertex(90, 360);
  vertex(90, 300);
  arc(0, 300, 180, 40, 0, PI);
  endShape(CLOSE);
  fill("rgb(201,201,201)");
  ellipse(0, 300, 180, 40);
  // lighthouse itself
  fill("black");
  rect(-3, -10, 6, 20);
  fill("grey");
  triangle(-25, 25, 25, 25, 0, 0);
  fill("rgb(191,191,191)");
  rect(-25, 25, 50, 40);
  fill("grey");
  rect(-35, 65, 70, 20);
  rect(-45, 85, 90, 15);
  fill("rgb(206,199,145)");
  beginShape();
  vertex(-25, 100);
  vertex(-40, 300);
  arc(0, 300, 80, 20, 0, PI);
  vertex(40, 300);
  vertex(25, 100);
  endShape(CLOSE);
  // windows
  fill("black");
  rect(20, 110, 5, 15);
  rect(21, 150, 5, 15);
  rect(23, 190, 5, 15);
  rect(26, 230, 5, 15);
  // guardrail
  fill("rgb(114,71,71)");
  beginShape();
  vertex(90, 250);
  quadraticVertex(50, 270, 0, 270);
  vertex(0, 270);
  vertex(0, 320);
  arc(0, 300, 180, 40, 0, 0.5 * PI);
  vertex(90, 300);
  endShape(CLOSE);
  // frame of the base
  noFill();
  stroke("rgb(88,54,54)");
  strokeWeight(5);
  arc(0, 360, 180, 40, 0, PI);
  arc(0, 300, 180, 40, 0, PI);
  line(-90, 300, -90, 360);
  line(90, 300, 90, 360);
  // flashing light from the light room
  noStroke();
  fill("rgba(236,236,30,0.54)");
  rect(-20, 30, 40, 30);
  pop();
  // calling the wave function to draw the ocean waves
  wave();
}
