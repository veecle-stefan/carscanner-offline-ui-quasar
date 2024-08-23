import { DataEntry, VehicleRecords } from './VehicleRecords';
import { Option, Some, None, Result, Err, Ok } from 'ts-results';

export class RecordedDrive {
  csvFile: File;
  records: Result<VehicleRecords, string> = Err('No result yet');
  recordsReady: () => void;

  constructor(csvFile: File, recordsReady: () => void) {
    // assign local attributes
    this.csvFile = csvFile;
    this.recordsReady = recordsReady;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.readFileContent(e);
    };
    reader.readAsText(this.csvFile);
  }

  readFileContent(e: ProgressEvent<FileReader>) {
    if (e.target != null) {
      const contents = e.target.result;
      if (typeof contents === 'string') {
        this.records = this.parseFile(contents);
        this.recordsReady();
      }
    }
  }

  /// Removes any unwanted characters from CSV column names
  /// in order to unify them and make them accessible through .xyz operator
  stripQuotes(nameStr: string) {
    const regex = /\"|℃|%|\(|\)/gi;
    return nameStr.replaceAll(regex, '').trim().replaceAll(' ', '_');
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

  parseFile(csv: string): Result<VehicleRecords, string> {
    const headerNames: string[] = [];
    const lastHeader: DataEntry = {};
    const allTextLines = csv.split(/\r\n|\n/);

    // data must have at least 1 useful line
    if (allTextLines.length >= 2) {
      const headerData = allTextLines[0].split(',');
      for (let j = 0; j < headerData.length; j++) {
        const hdr = this.stripQuotes(headerData[j]);
        // ensure the header has a name (or is the last column)
        if (hdr != '') {
          headerNames[j] = hdr;
        } else if (j < headerData.length - 1) {
          return Err('Empty header column found');
        }
      }
      const records = new VehicleRecords(headerNames);

      // now go through all data lines (rows)
      for (let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(',');

        let timeAssigned = false;
        for (let j = 0; j < data.length; j++) {
          const keyName = headerNames[j];
          const value = data[j].trim();
          if (value != '') {
            if (keyName == 'time') {
              const timestamp = this.createTimestamp(value);
              if (timestamp.ok) {
                lastHeader['time'] = timestamp.val;
                timeAssigned = true;
              }
            } else {
              // ordinary key
              lastHeader[keyName] = Number(value);
            }
          }
        }
        // we need a time stamp for every record
        if (timeAssigned) {
          records.addRecord(lastHeader);
        }
      }
      return Ok(records);
    } else {
      return Err('No headers and content found');
    }
  }
}
