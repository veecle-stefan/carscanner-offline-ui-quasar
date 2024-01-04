<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-if="!headersAvailable">
        <q-card-section>
          <q-skeleton type="text" />
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <q-skeleton type="rect" />
        </q-card-section>
      </q-card>
      <q-card
        class="my-card"
        v-else
        v-for="header in allHeaders"
        v-bind:key="header.index"
      >
        <q-card-section>
          <div class="text-h6">{{ header.name }}</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <q-select
            color="white"
            bg-color="primary"
            filled
            v-model="model"
            :options="options"
            label="Label"
          >
          </q-select>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useTripStore } from 'src/stores/triprecord';
import { computed, ref } from 'vue';

const model = ref(null);
const options = ['test', 'bla'];

const tripStore = useTripStore();

const headersAvailable = computed(() => {
  return tripStore.isLoaded && tripStore.headers;
});

const allHeaders = computed(() => {
  if (tripStore.isLoaded && tripStore.headers) {
    return tripStore.headers.map((header, index) => ({
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
