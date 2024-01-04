import { None } from 'ts-results';
import { RecordedDrive } from './RecordedDrive';
import { VehicleModel } from './VehicleModel';

export enum WorkerCommand {
  LoadFile,
  CompressFile,
  ConcatenateFile,
  UnloadAllFiles,
}

export enum WorkerReply {
  ACK,
  Progress,
  ProvideHeaders,
  ProvideModel,
  ERR,
}
export interface WorkerMessage {
  cmd: WorkerCommand;
  data?: string;
  file?: File;
}

export interface KeyNumValue {
  [key: string]: number;
}

export interface WorkerResponse {
  res: WorkerReply;
  progress?: number;
  addInfo?: string;
  payloadArray?: string[];
  payloadKey?: KeyNumValue;
}

self.onmessage = (ev: MessageEvent) => {
  const cmd: WorkerMessage = ev.data;

  switch (cmd.cmd) {
    case WorkerCommand.LoadFile:
      if (cmd.file) loadFile(cmd.file);
      break;
    default:
      self.postMessage({ res: WorkerReply.ERR });
      break;
  }
};

let drive: RecordedDrive | undefined = undefined;

function loadFile(file: File) {
  // create a new RecordedDrive object and assign
  // a callback once it's finished parsing
  drive = new RecordedDrive(file, () => {
    // this is the callback. First, check if
    // there's actually a usuable result
    if (drive) {
      if (drive.records.err) {
        self.postMessage({ res: WorkerReply.ERR, addInfo: drive.records.val });
      } else {
        self.postMessage({
          res: WorkerReply.ProvideHeaders,
          payloadArray: drive.records.val.headers,
        });
        const model = new VehicleModel(drive.records.val);
      }
    }
  });
}
