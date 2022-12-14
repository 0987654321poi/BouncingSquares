/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 * 3. Changed the text box to say have a good break
 * 4. Made the text box red and the letters green for christmas theme
 * 5. Changed the balls to squares
 * 6. Added borders to squares and box because it looks cool
 * 7. Changed the background to green for christmas theme
 * 8. Made all the squares randomly either red or green
 * 9. Changed the bounce mechanics so the squares reverse regardless of what they hit
 */

const BOX_WIDTH  = 300;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;
var testBall;
var colorNum;

function preload() {

  sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 1000;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  fill(1000,0,0)
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 1000, 0);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Have a good break!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function draw() {

  background(0,1000,0);
  createBox();
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 300
    
    // RGB values for color
    this.colorNum = random(100);
    if(this.colorNum >50){
      this.red   = 1000;
      this.green = 0;
    }
    else{
      this.green = 1000;
      this.red = 0;
    }
    this.blue  = 0;
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    square(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.reverseBall(); 
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.reverseBall();
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}
