import {
  WorkerCommand,
  WorkerMessage,
  WorkerReply,
  WorkerResponse,
} from './DataWorker';

export class DriveLogInterface {
  worker: Worker | undefined;
  tripLoaded = false;
  onError: ((msg: string) => void) | null = null;
  headers: string[] = [];

  constructor() {
    console.log('DriveLogInterface created');
  }

  startBGThread() {
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
          console.log('Headers have been updated');
          this.headers.splice(0, this.headers.length, ...reply.payloadArray); // delete everything and add only new items
        }
        break;
    }
  }

  sendCommand(cmd: WorkerCommand, data?: string, file?: File) {
    const packaet: WorkerMessage = { cmd, data, file };
    this.worker?.postMessage(packaet);
  }

  hasHeaders(): boolean {
    return this.headers.length > 0;
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
