import { VehicleModel } from './VehicleModel';
import { HeaderMapping, VehicleRecords } from './VehicleRecords';
import { Ok, Err, Result } from 'ts-results';
import { Option, Some, None } from 'ts-results';

export class RecordedDrive {
  csvFile: File;

  constructor(csvFile: File) {
    this.csvFile = csvFile;
    this.readTextFileAsCSV();
  }

  readTextFileAsCSV() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target != null) {
        const contents = e.target.result;
        if (typeof contents === 'string') {
          const records = this.parseFile(contents);
          console.log(records);
          //model = new VehicleModel(records);
        }
      }
    };
    reader.readAsText(this.csvFile);
  }

  /// Removes any unwanted characters from CSV column names
  /// in order to unify them and make them accessible through .xyz operator
  stripQuotes(nameStr: string) {
    const regex = /\"|℃|%|\(|\)/gi;
    return nameStr.replaceAll(regex, '').trim().replaceAll(' ', '_');
  }

  parseFile(csv: string): Result<VehicleRecords, string> {
    const headerNames: string[] = [];
    const lastHeader: HeaderMapping = {};
    let records: Option<VehicleRecords> = None;
    const allTextLines = csv.split(/\r\n|\n/);
    for (let i = 0; i < allTextLines.length; i++) {
      const data = allTextLines[i].split(',');
      if (i == 0) {
        // header
        for (let j = 0; j < data.length; j++) {
          const hdr = this.stripQuotes(data[j]);
          if (hdr != '') {
            headerNames[j] = hdr;
          }
        }
        records = Some(new VehicleRecords(headerNames));
      } else {
        for (let j = 0; j < data.length; j++) {
          const keyName = headerNames[j];
          const value = data[j];
          if (keyName != null && value.trim() != '') {
            lastHeader[keyName] = value;
          }
        }
        records.unwrap().addRecord(lastHeader);
      }
    }
    return records.toResult('No header found in file');
  }
}
