import { defineStore } from 'pinia';

export const useTripStore = defineStore('trip', {
  state: () => ({
    tripLoaded: false,
    loadedFrom: '',
  }),

  getters: {
    isLoaded(state) {
      return state.tripLoaded;
    },
  },

  actions: {
    loadTrip(fileName: string) {
      this.loadedFrom = fileName;
      this.tripLoaded = true;
    },

    unload() {
      this.loadedFrom = '';
      this.tripLoaded = false;
    },
  },
});
