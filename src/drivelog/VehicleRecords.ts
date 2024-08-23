import { ValueRange } from './ValueRange';

export interface DataEntry {
  [key: string]: number | undefined;
}

export interface DataRanges {
  [key: string]: ValueRange;
}

export class VehicleRecords {
  headers: string[];
  records: DataEntry[] = [];
  ranges: DataRanges = {};

  constructor(headerNames: string[]) {
    this.headers = headerNames;
  }

  updateStatistics(r: DataEntry) {
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

  addRecord(r: DataEntry) {
    this.records.push(Object.assign({}, r)); // create a copy of 'r'
    this.updateStatistics(r);
  }
}
