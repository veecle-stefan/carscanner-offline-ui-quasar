<template>
  <q-page padding>
    <div class="q-ma-md row no-wrap">
      <div class="col-4">
        <q-toolbar class="bg-secondary text-white shadow-2">
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
              :active="selectedHeaderIdx == header.idx"
              v-for="header in allHeaders"
              v-bind:key="header.idx"
              @click="selectedHeaderIdx = header.idx"
              active-class="bg-primary text-white"
            >
              <q-item-section>
                <q-item-label>{{ header.name }}</q-item-label>
                <q-item-label caption lines="1">Caption line</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <q-scroll-area
        v-show="selectedHeaderIdx >= 0"
        visible
        style="height: 600px"
        class="col-8"
      >
        <div class="q-gutter-md">
          <q-toolbar
            v-if="selectedHeaderIdx >= 0"
            class="bg-secondary text-white shadow-2"
          >
            <q-toolbar-title
              >Options for
              {{ loadedDrive.headers[selectedHeaderIdx] }}</q-toolbar-title
            >
          </q-toolbar>

          <q-select
            filled
            v-model="modelDataType"
            :options="dataOptions"
            label="Assign Data Type"
          />
          <q-select
            filled
            v-model="modelUnit"
            :options="unitOptions"
            label="Assign Unit"
            emit-value
            map-options
          />
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useTripStore } from 'src/stores/tripinterface';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { HeaderMeaning } from 'src/drivelog/Units';

const modelDataType = ref(null);
const selectedHeaderIdx = ref(-1);

const tripStore = useTripStore();
const { loadedDrive } = storeToRefs(tripStore);

const dataOptions = computed(() => {
  return Object.values(loadedDrive.value.headerMappings);
});

const unitOptions = computed(() => {
  if (modelDataType.value != null) {
    const data: HeaderMeaning = modelDataType.value;
    return data.unit.map((unit, index) => {
      return { label: unit.name, value: index };
    });
  } else {
    return [''];
  }
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

const modelUnit = computed({
  get(): number {
    if (modelDataType.value != null) {
      const data: HeaderMeaning = modelDataType.value;
      return data.unitIndex !== undefined ? data.unitIndex : 0;
    } else {
      return 0;
    }
  },
  set(newVal) {
    if (modelDataType.value != null) {
      const data: HeaderMeaning = modelDataType.value;
      data.unitIndex = newVal;
    }
  },
});
</script>

<style lang="css">
.my-card {
  width: 300px;
}
</style>
