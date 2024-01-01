export class ValueRange {
  max = -99999;
  min = 99999;
  span = 0;
  average = 0;
  length = 0;

  addValue(v: number) {
    // update min max
    if (v > this.max) this.max = v;
    if (v < this.min) this.min = v;
    this.span = this.max - this.min;
    this.length++;

    // update average
    if (this.length == 1) {
      // first entry is the average
      this.average = v;
    } else {
      const factor = (this.length - 1) / this.length;
      this.average = this.average * factor + v * (1 - factor);
    }
  }
}
