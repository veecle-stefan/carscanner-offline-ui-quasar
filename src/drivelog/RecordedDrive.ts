export class RecordedDrive {
  fromFile: string | null = null;

  reset() {
    this.fromFile = null;
  }

  notLoaded(): boolean {
    return this.fromFile == null;
  }
}
