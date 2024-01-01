import { defineStore } from 'pinia';
import { RecordedDrive } from 'src/drivelog';

interface State {
  loadedDrive: RecordedDrive | null;
}

export const useTripStore = defineStore('trip', {
  state: (): State => {
    return {
      loadedDrive: null,
    };
  },

  getters: {
    isLoaded(state) {
      return state.loadedDrive != null;
    },
  },

  actions: {
    loadTrip(newCSV: File) {
      this.loadedDrive = new RecordedDrive(newCSV);
    },

    unload() {
      this.loadedDrive = null;
    },
  },
});
