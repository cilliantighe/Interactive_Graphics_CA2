/*
CelestialObject is the name given to the class for this project. The main
reason for this name is that this class will be used to create a sun, planets
and moons. It was originally called 'Planet' from the coding train challenge.
The class is passed 4 variables.

_rad -----> Refers to the radius size of the object

_dis -----> Refers to the distance from the child CelestialObject is to it's parent.
The distance is set to zero as the sun is drawn first and that has no parent.

_orb -----> Refers to the orbital speed that the CelestialObject has to it's parent
Again, this is set to zero as the sun is not orbiting anything.

_col -----> Refers to the colour of the CelestialObject object that it is given
*/
function CelestialObject(_rad, _dis, _orb, _col) {
  /*
  this.CbSize -----> Refers to the size of the CelestialObject currently in the draw loop.
  This increments in size until it has met the required size (this.radius * 2)

  this.ObSize -----> Refers to the distance the orbital outline is currently in the loop.
  This increments in size until it has met the required size (_dis * 2)

  this.angle -----> Refers to the angle the CelestialObject body is drawn in
  relation to it's parent. The number returned is in radians

  this.children -----> Refers to an array of CelestialObject that are children
  to it's parent. This is initialized in a function below

  this.planetColours -----> Refers to an array of pre-made colours for the CelestialObject objects
  */
  this.CbSize = 0;
  this.ObSize = 0;
  this.angle = random(TWO_PI);
  this.radius = _rad;
  this.distance = _dis;
  this.children = [];
  this.orbitSpeed = _orb;
  this.planetColours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e74c3c']
  this.colour = _col;

  /*
  This function is used to display the objects. The 'push' and 'pop' functions
  are used to constrain all transformations, styles etc. to each object. This ensures
  that transformations don't stack on top of each other resulting in a chain of planets
  orbiting one after another.
  */
  this.render = function() {
    push();
    noStroke();
    fill(this.colour);
    /*
    It's important to rotate the object before you translate it as the rotation
    will be incorrect
    */
    rotate(this.angle);
    translate(this.distance, 0);
    /*
    The statement below checks whether the CelestialObject object has reached it's
    desired size yet. It will continue to increase in size until the condition
    is no longer met.
    */
    if (this.CbSize >= (this.radius * 2)) {
      ellipse(0, 0, this.CbSize, this.CbSize);
    } else {
      ellipse(0, 0, this.CbSize, this.CbSize);
      this.CbSize = this.CbSize + 0.5;
    }
    /*
    This statement checks to see whether the parent has children and has reached
    it's desired size. The point of this statement is to let the parent continue
    to grow until it's finished and then it will move onto it's children and start
    to draw them
    */
    if (this.children != null && this.CbSize >= (this.radius * 2)) {
      for (var i = 0; i < this.children.length; i++) {
        /*
        The for loop goes through the parent's children and calls the orbitalOutline
        function. It draws an ellipse until it has reached it's appropiate size
        (the distance from the parent). The function will return a 'true' or 'false'
        statement to tell whether the the orbitalOutline has reached it's size.
        Once the function returns a true value, it will then render the children
        */
        var check = this.children[i].orbitalOutline(this.children[i].distance);
        if (check) {
          this.children[i].render();
        }
      }
    }
    pop();
  }

  /*
  The function is called to move the current position of the CelestialObject obejct
  The orbital speed is added to the current angle of the object. The function is
  called for any children too.
  */
  this.orbit = function() {
    this.angle = this.angle + this.orbitSpeed;
    if (this.children != null) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].orbit();
      }
    }
  }


  /*
  This function is called to draw the orbital outline of each child. The orbital
  outline is increased in size until it has reached the correct size. The function
  returns false until the size is met which it then returns a true value
  */
  this.orbitalOutline = function(_dis) {
    stroke(255, 50);
    noFill();
    if (this.ObSize >= (_dis * 2)) {
      ellipse(0, 0, this.ObSize, this.ObSize);
      return true;
    } else {
      ellipse(0, 0, this.ObSize, this.ObSize);
      this.ObSize = this.ObSize + 2;
      return false;
    }
  }

  /*
  This function creates children objects of the parent. It also creates children
  for children if desired. This is related to the 'level' variable. In the coding
  train challenge, he uses the level function to help keep track of how many levels
  of CelestialObject objects he wanted to create. In my example, I have the sun,
  planets and moons for those planets.
  */
  this.spawnChildren = function(_amt, _level) {
    // Loop that executes the code for the required amount of objects to be drawn
    for (var i = 0; i < _amt; i++) {
      var rad = this.radius / (_level * random(2, 6));
      /*
      This is the check whether the current objects being drawn are 'moons'. If
      level is equal to 2 then that means that they are moons and I want the distance
      from the planet to the moons to be tight
      */
      if (_level == 2) {
        var dis = random(this.radius + rad, (this.radius + rad) * 2);
      } else {
        /*
        This is a random formulae that I came up with to space out the planets
        from the sun
        */
        var dis = (this.radius * 2) + (rad * 2) * i;
      }
      // Random orbital speed
      var orb = random(-0.005, 0.005);
      // Random number based off the length of the array to select a colour from it
      var col = floor(random(this.planetColours.length));
      this.children[i] = new CelestialObject(rad, dis, orb, this.planetColours[col]);

      /*
      A statement to check whether the current level is less than two. If this
      value is increased, then there will be mulitple layers of children with children
      */
      if (_level < 2) {
        var total = int(random(0, 4));
        this.children[i].spawnChildren(total, _level + 1);
      }
    }
  }
}
