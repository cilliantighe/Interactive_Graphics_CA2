/*
Interactive Graphics
Author: Cillian Tighe
Student No: N00152737
Animation Sketch
*/

var x = 0;
var y = 0;
var amt = 1000;
var time = 0;
var pointArray = [];
var sunRad = 50;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  // Gets the width of the div so the canvas can take up all the space
  var cWidth = window.outerWidth;
  var cHeight = window.outerHeight;
  var canvas = createCanvas(cWidth, cHeight);

  // Repositioning the canvas
  canvas.parent('container');

  // Setting the color of the canvas background
  background('#070000');

  for (var i = 0; i < amt; i++) {
    pointArray[i] = [int(random(width)), int(random(height))];
  }

  sun = new CelestialObject(sunRad, 0, 0, '#FFA803');
  sun.spawnChildren(15, 1);
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  background('#070000');
  stroke(255);
  for (var i = 0; i < pointArray.length; i++) {
    for (var j = 0; j < 1; j++) {
      point(pointArray[i][j], pointArray[i][j + 1]);
    }
  }

  translate(width / 2, height / 2);
  sun.render();
  sun.orbit();
  time++;
}
