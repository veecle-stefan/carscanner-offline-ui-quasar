<template>
  <q-page padding>
    <div class="q-ma-md row no-wrap">
      <div class="col-4">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Data Columns</q-toolbar-title>
        </q-toolbar>
        <q-scroll-area visible style="height: 600px" class="col-4">
          <q-list bordered v-if="!loadedDrive.tripLoaded">
            <q-item v-for="n in 9" v-bind:key="n">
              <q-item-section avatar top>
                <q-skeleton type="QAvatar"></q-skeleton>
              </q-item-section>
              <q-item-section>
                <q-skeleton type="text"></q-skeleton>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list v-else bordered>
            <q-item
              clickable
              v-ripple
              v-for="header in allHeaders"
              v-bind:key="header.idx"
            >
              <q-item-section avatar top>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ header.name }}</q-item-label>
                <q-item-label caption lines="1">Caption line</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <q-scroll-area visible style="height: 600px" class="col-8">
        <q-select
          color="white"
          bg-color="primary"
          filled
          v-model="model"
          :options="options"
          label="Label"
        >
        </q-select>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useTripStore } from 'src/stores/tripinterface';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const model = ref(null);
const options = ['test', 'bla'];

const tripStore = useTripStore();
const { loadedDrive } = storeToRefs(tripStore);

const isFileLoaded = computed(() => {
  return loadedDrive.value.tripLoaded;
});

const allHeaders = computed(() => {
  if (loadedDrive.value.tripLoaded && loadedDrive.value.headers.length > 0) {
    return loadedDrive.value.headers.map((header, index) => ({
      name: header,
      idx: index,
    }));
  } else {
    return {};
  }
});
</script>

<style lang="css">
.my-card {
  width: 300px;
}
</style>
