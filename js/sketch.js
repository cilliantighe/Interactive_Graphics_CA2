/*
Interactive Graphics
Author: Cillian Tighe
Student No: N00152737
Animation Sketch
*/

/*
amt -----> Refers to the amount of 'stars' to be drawn

pointArray -----> Refers to the 2d array that will be used to hold (x, y)
locations for drawing stars in the background

sunRad -----> Refers to the radius of the sunRad
*/
var amt = 1000;
var pointArray = [];
var sunRad = 50;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  // Gets the width of the screen so the canvas can take up all the space
  var canvas = createCanvas(window.outerWidth, window.outerHeight);

  // Repositioning the canvas
  canvas.parent('container');

  // Setting the color of the canvas background
  background('#070000');

  /*
  Creating an array of the star points to be drawn. The (x, y) values for each
  point needs to be initialized in the setup so that they are redrawn in the
  same location on each drawn
  */
  for (var i = 0; i < amt; i++) {
    pointArray[i] = [int(random(width)), int(random(height))];
  }

  // Parameters are (_rad, _dis, _orb, _col)
  sun = new CelestialObject(sunRad, 0, 0, '#FFA803');
  // Parameters are (_amt, _level)
  sun.spawnChildren(10, 1);
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // Redraws the background
  background('#070000');

  // Stroke colour of white for the stars
  stroke(255);

  // The nested for loop below is for extracting the (x, y) locations from the 2d array.
  for (var i = 0; i < pointArray.length; i++) {
    for (var j = 0; j < 1; j++) {
      point(pointArray[i][j], pointArray[i][j + 1]);
    }
  }

  // Translates the canvas to the centre of the screen so that everything is drawn from here.
  translate(width / 2, height / 2);
  sun.render();
  sun.orbit();
}
