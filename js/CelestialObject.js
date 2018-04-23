function CelestialObject(_rad, _dis, _orb, _col) {

  this.CbSize = 0;
  this.ObSize = 0;
  this.angle = random(TWO_PI);
  this.radius = _rad;
  this.distance = _dis;
  this.children = [];
  this.orbitSpeed = _orb;
  this.planetColours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#e74c3c']
  this.colour = _col;

  this.render = function() {
    push();
    noStroke();
    fill(this.colour);
    rotate(this.angle);
    translate(this.distance, 0);
    if (this.CbSize >= (this.radius * 2)) {
      ellipse(0, 0, this.CbSize, this.CbSize);
    } else {
      ellipse(0, 0, this.CbSize, this.CbSize);
      this.CbSize = this.CbSize + 0.5;
    }
    if (this.children != null && this.CbSize >= (this.radius * 2)) {
      for (var i = 0; i < this.children.length; i++) {
        var check = this.children[i].outline(this.children[i].distance);
        if (check) {
          this.children[i].render();
        }
      }
    }
    pop();
  }

  this.orbit = function() {
    this.angle = this.angle + this.orbitSpeed;
    if (this.children != null) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].orbit();
      }
    }
  }

  this.outline = function(_rad) {
    stroke(255, 50);
    noFill();
    if (this.ObSize >= (_rad * 2)) {
      ellipse(0, 0, this.ObSize, this.ObSize);
      return true;
    } else {
      ellipse(0, 0, this.ObSize, this.ObSize);
      this.ObSize = this.ObSize + 2;
      return false;
    }
  }

  this.spawnChildren = function(_amt, _level) {
    for (var i = 0; i < _amt; i++) {
      var rad = this.radius / (_level * random(2, 6));
      if (_level == 2) {
        var dis = random(this.radius + rad, (this.radius + rad) * 2);
      } else {
        var dis = (this.radius * 2) + (rad * 2) * i;
      }
      var orb = random(-0.005, 0.005);
      var col = int(random(this.planetColours.length));
      this.children[i] = new CelestialObject(rad, dis, orb, this.planetColours[col]);
      if (_level < 2) {
        var total = int(random(0, 4));
        this.children[i].spawnChildren(total, _level + 1);
      }
    }
  }
}

// function CelestialObject(_rad, _dis, _orb, _level) {
//
//   this.level = _level;
//   this.location = createVector(width / 2, height / 2);
//   this.radius = _rad;
//   this.distance = createVector(_dis, _dis / 2);
//   this.children = [];
//   this.orbitSpeed = _orb;
//   this.t = random(360);
//
//   this.render = function() {
//     noStroke();
//     fill(255);
//     if (this.level === 1) {
//       ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
//     } else if (this.level === 2) {
//       this.location.x = this.distance.x * Math.cos(this.t * Math.PI / 180) + width / 2;
//       this.location.y = this.distance.y * Math.sin(this.t * Math.PI / 180) + height / 2;
//       if(this.count === 0){
//         var x = this.location.x;
//         var y= this.location.y;
//         this.count = 1;
//       }
//       ellipse(this.location.x, this.location.y, this.radius * 2, this.radius * 2);
//       this.t = this.t + 1;
//     }
//     if (this.children != null) {
//       for (var i = 0; i < this.children.length; i++) {
//         this.children[i].render();
//         this.children[i].outline(x, y);
//       }
//     }
//   }
//
//   this.orbit = function() {
//     this.angle = this.angle + this.orbitSpeed;
//     if (this.children != null) {
//       for (var i = 0; i < this.children.length; i++) {
//         this.children[i].orbit();
//       }
//     }
//   }
//
//   this.outline = function(_xHeight, _yHeight) {
//     stroke(255, 100);
//     noFill();
//     ellipse(width / 2, height / 2, _xHeight, _yHeight);
//   }
//
//   this.spawnChildren = function(_amt, _level) {
//     for (var i = 0; i < _amt; i++) {
//       var rad = this.radius / (_level * random(2, 6));
//       if (_level == 2) {
//         var dis = random(this.radius + rad, (this.radius + rad) * 2);
//       } else {
//         var dis = (this.radius * 2) + (rad * 2) * i;
//       }
//       var orb = random(-0.01, 0.01);
//       this.children[i] = new CelestialObject(rad, dis, orb, 2);
//       if (_level < 2) {
//         var total = int(random(0, 4));
//         this.children[i].spawnChildren(total, _level + 1);
//       }
//     }
//   }
// }
