import { ValueRange } from './ValueRange';

export interface HeaderMapping {
  [key: string]: number | undefined;
}

export interface HeaderRanges {
  [key: string]: ValueRange;
}

export class VehicleRecords {
  headers: string[];
  records: HeaderMapping[] = [];
  ranges: HeaderRanges = {};

  constructor(headerNames: string[]) {
    this.headers = headerNames;
  }

  updateStatistics(r: HeaderMapping) {
    // go through each key and update the statistics
    for (const keyName in r) {
      const val = r[keyName];
      if (val) {
        if (!(keyName in this.ranges)) {
          // entry doesn't exist yet
          this.ranges[keyName] = new ValueRange();
        }
        this.ranges[keyName].addValue(val);
      }
    }
  }

  addRecord(r: HeaderMapping) {
    this.records.push(Object.assign({}, r)); // create a copy of 'r'
    this.updateStatistics(r);
  }
}
