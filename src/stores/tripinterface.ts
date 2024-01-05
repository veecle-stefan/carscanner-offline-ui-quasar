import { defineStore } from 'pinia';
import { DriveLogInterface } from 'src/drivelog/DriveLogInterface';
import { reactive } from 'vue';

export const useTripStore = () => {
  const innerStore = defineStore('trip', {
    state: () => {
      return {
        loadedDrive: new DriveLogInterface(),
      };
    },

    getters: {},

    actions: {
      loadTrip(newCSV: File) {
        this.loadedDrive.appendCSVFile(newCSV);
      },

      unload() {
        this.loadedDrive.unloadAllFiles();
      },
    },
  });

  // create actual (inner) store and call initializer for DriveLogInterface
  const s = innerStore();
  s.loadedDrive.startBGThread();
  return s;
};
