// based on knob by icm: https://editor.p5js.org/icm/sketches/HkfFHcp2
class Knob {
  constructor(x, y, r) {
      this.x = x; // x-coordinate of the knob center
      this.y = y; // y-coordinate of the knob center
      this.r = r; // radius of the knob
      this.angle = -1.57; // initial angle of the knob (in radians)
      this.offsetAngle = 0; // used to track drag offset
      this.turnCount = 0; // number of full rotations made
      this.prevAngle = 0; // previous angle to detect crossing boundaries
      this.dragging = false; // whether the knob is being dragged
  }

  update() {
      if (this.dragging) {
          let dx = mouseX - this.x; // horizontal distance from knob center
          let dy = mouseY - this.y; // vertical distance from knob center
          let mouseAngle = atan2(dy, dx); // current angle based on mouse position
          this.angle = mouseAngle - this.offsetAngle; // adjust knob angle with offset

          // detect crossing of -PI/2 or PI/2 boundaries for full rotation tracking
          if (this.prevAngle < -PI / 2 && this.angle > PI / 2) {
              this.turnCount--;
          } else if (this.prevAngle > PI / 2 && this.angle < -PI / 2) {
              this.turnCount++;
          }

          this.prevAngle = this.angle; // update previous angle
      }
  }

  draw() {
      push();
      translate(this.x, this.y); // move to knob's position
      rotate(this.angle); // apply rotation based on current angle
      stroke(this.dragging ? 112 : 255); // change stroke color when dragging
      strokeWeight(3);
      fill(randomColor); // use dynamic color for the knob
      circle(0, 0, this.r * 2); // draw the knob
      strokeWeight(15);
      line(0, 0, this.r - 7, 0); // draw the indicator line
      pop();
  }

  pressed() {
      // check if mouse is within knob radius
      if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
          this.dragging = true;
          let dx = mouseX - this.x;
          let dy = mouseY - this.y;
          this.offsetAngle = atan2(dy, dx) - this.angle; // calculate drag offset
      }
  }

  released() {
      this.dragging = false; // stop dragging
  }

  getValue() {
      // return total value based on turn count and current angle
      return this.turnCount * TWO_PI + this.angle + 2;
  }

  getKnobValue() {
      return this.getValue(); // alias for `getValue`
  }
}
