import { Ok, Err, Result } from 'ts-results';
import { ValueRange } from './ValueRange';

export interface HeaderMapping {
  [key: string]: number;
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
      if (!(keyName in this.ranges)) {
        // entry doesn't exist yet
        this.ranges[keyName] = new ValueRange();
      }
      this.ranges[keyName].addValue(r[keyName]);
    }
  }

  createTimestamp(timeStr: string): Result<number, string> {
    const grp = timeStr.match(/([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{3})/);

    if (grp != null) {
      const h = parseInt(grp[1]);
      const m = parseInt(grp[2]);
      const s = parseInt(grp[3]);
      const ms = parseInt(grp[4]);
      const absTimeStamp = ms + s * 1000 + m * 60000 + h * 3600000;
      return Ok(absTimeStamp);
    } else {
      return Err('Not a valid time stamp');
    }
  }

  addRecord(r: HeaderMapping) {
    const absTimeStamp = this.createTimestamp(r.time.toString());
    if (absTimeStamp.ok) {
      this.records.push(Object.assign({ timestamp: absTimeStamp.val }, r)); // create a copy of 'r'
      this.updateStatistics(r);
    }
  }
}
