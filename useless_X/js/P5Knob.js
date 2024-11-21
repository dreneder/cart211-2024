//base on knob by icm: https://editor.p5js.org/icm/sketches/HkfFHcp2
class Knob {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.angle = -1.57;
    //   this.angle = 0;
      this.offsetAngle = 0;
      this.turnCount = 0;
      this.prevAngle = 0;
      this.dragging = false;
    }
  
    update() {
      if (this.dragging) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let mouseAngle = atan2(dy, dx);
        this.angle = mouseAngle - this.offsetAngle;
  
        if (this.prevAngle < -PI / 2 && this.angle > PI / 2) {
          this.turnCount--;
        } else if (this.prevAngle > PI / 2 && this.angle < -PI / 2) {
          this.turnCount++;
        }
  
        this.prevAngle = this.angle;
      }
    }
  
    draw() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      stroke(this.dragging ? 112 : 255);
      strokeWeight(3);
      fill(randomColor);
      circle(0, 0, this.r * 2);
      strokeWeight(15);
      line(0, 0, this.r-7, 0);
      pop();
    }
  
    pressed() {
      if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
        this.dragging = true;
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.offsetAngle = atan2(dy, dx) - this.angle;
      }
    }
  
    released() {
      this.dragging = false;
    }
  
    getValue() {
      return this.turnCount * TWO_PI + this.angle+2;
    }
  
    getKnobValue() {
      return this.getValue();
    }
  }
  