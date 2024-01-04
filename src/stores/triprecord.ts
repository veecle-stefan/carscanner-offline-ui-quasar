import { defineStore } from 'pinia';
import { DriveLogInterface } from 'src/drivelog/DriveLogInterface';
import { reactive } from 'vue';

interface State {
  loadedDrive: DriveLogInterface;
}

export const useTripStore = defineStore('trip', {
  state: (): State => {
    return {
      loadedDrive: reactive(new DriveLogInterface()),
    };
  },

  getters: {
    isLoaded(state) {
      return state.loadedDrive.isFileLoaded();
    },

    driveInterface(state) {
      return state.loadedDrive;
    },

    headers(state) {
      return state.loadedDrive.headers;
    },
  },

  actions: {
    loadTrip(newCSV: File) {
      this.loadedDrive.appendCSVFile(newCSV);
    },

    unload() {
      this.loadedDrive.unloadAllFiles();
    },
  },
});
