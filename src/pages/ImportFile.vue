<template>
  <q-page padding class="column flex-center">
    <!-- content -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Import File</div>
        <div class="text-subtitle2">
          To work with a recording, select a file recorded by
          <strong>Car Scanner</strong>.
        </div>
      </q-card-section>

      <q-card-section>
        In Car Scanner:
        <ul>
          <li>Select <u>Recordings</u></li>
          <li>Swipe left to reveal <u>Export</u></li>
          <li>Select <u>CSV #2</u> as format</li>
        </ul>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn color="primary" icon="file_download" @click="importFile"
          >Import file</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useTripStore } from 'stores/triprecord';
import { useRouter } from 'vue-router';
const tripStore = useTripStore();
const router = useRouter();

function importFile() {
  tripStore.loadTrip('blabla');
  router.push({ name: 'analysis' });
}
</script>
