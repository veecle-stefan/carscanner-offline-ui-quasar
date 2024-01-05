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
        <q-file
          v-model="selectedFile"
          color="primary"
          counter
          label="Pick files"
          standout
          bottom-slots
          style="width: 300px"
          accept=".csv, text/csv"
          @rejected="onRejected"
          @update:model-value="handleUpload()"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-if="selectedFile" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop.prevent="unloadFile"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:hint> No file selected yet </template>
        </q-file>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useTripStore } from 'stores/tripinterface';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
const tripStore = useTripStore();
const router = useRouter();
const $q = useQuasar();

const selectedFile = ref(null);

function dispError(msg: string) {
  $q.notify({
    type: 'error',
    message: msg,
  });
}

onMounted(() => {
  tripStore.loadedDrive.onError = dispError;
});

function unloadFile() {
  $q.notify({
    type: 'information',
    message: 'File removed.',
  });
  selectedFile.value = null;
}

function handleUpload() {
  if (selectedFile.value) {
    tripStore.loadedDrive.appendCSVFile(selectedFile.value);
    router.push({ name: 'analysis' });
  } else {
    console.log('No file selected');
  }
}

function onRejected() {
  $q.notify({
    type: 'negative',
    message: "Selected file doesn't seem to be a CSV file.",
  });
}
</script>
