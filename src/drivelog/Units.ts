export interface HeaderMeaning {
  headerIndex?: number;
  label: string;
  matchHeaderWords: string;
  unit: (typeof Unit)[];
  unitIndex?: number;
}

export interface HeaderMeaningList {
  [key: string]: HeaderMeaning;
}

export class Unit {
  value: number;

  constructor(val: number) {
    this.value = val;
  }
}

export class Meters extends Unit {
  constructor(val: number) {
    super(val);
  }

  addDistance(b: Meters): Meters {
    return new Meters(this.value + b.value);
  }
}

export class KiloMeters extends Meters {
  constructor(val: number) {
    super(val / 1000);
  }
}

export class Volt extends Unit {
  constructor(val: number) {
    super(val);
  }
}

export class Ampere extends Unit {
  constructor(val: number) {
    super(val);
  }
}

export class Percent extends Unit {
  constructor(val: number) {
    super(val / 100);
  }
}

export class WattHours extends Unit {
  constructor(val: number) {
    super(val);
  }
}

export class DegC extends Unit {
  constructor(val: number) {
    super(val);
  }
}

export class MetersPerSecond extends Unit {
  constructor(val: number) {
    super(val);
  }
}

export class KiloMetersPerHour extends MetersPerSecond {
  constructor(val: number) {
    super(val / 3.6);
  }
}
