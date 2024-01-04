import {
  WorkerCommand,
  WorkerMessage,
  WorkerReply,
  WorkerResponse,
} from './DataWorker';

export class DriveLogInterface {
  worker: Worker;
  tripLoaded = false;
  onError: ((msg: string) => void) | null = null;
  headers: string[] = ['foobar'];

  constructor() {
    // start the background worker thread
    this.worker = new Worker(new URL('./DataWorker.ts', import.meta.url), {
      type: 'module',
    });

    this.worker.onmessage = (ev: MessageEvent) => {
      this.onBackgroundMessage(ev);
    };
  }

  onBackgroundMessage(ev: MessageEvent) {
    const reply: WorkerResponse = ev.data;

    switch (reply.res) {
      case WorkerReply.ERR:
        console.log(reply.addInfo);
        if (this.onError && reply.addInfo) this.onError(reply.addInfo);
        break;

      case WorkerReply.ProvideHeaders:
        if (reply.payloadArray) {
          this.headers = reply.payloadArray;
        }
        break;
    }
  }

  sendCommand(cmd: WorkerCommand, data?: string, file?: File) {
    const packaet: WorkerMessage = { cmd, data, file };
    this.worker.postMessage(packaet);
  }

  isFileLoaded(): boolean {
    return this.tripLoaded;
  }

  appendCSVFile(csvFile: File) {
    // then already start the background command
    this.sendCommand(WorkerCommand.LoadFile, '', csvFile);
    this.tripLoaded = true;
  }

  unloadAllFiles() {
    this.sendCommand(WorkerCommand.UnloadAllFiles);
    this.tripLoaded = false;
  }
}
