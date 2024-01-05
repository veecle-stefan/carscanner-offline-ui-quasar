<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/car.png" />
          </q-avatar>
          Car Scanner Offline UI</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above elevated>
      <q-list>
        <q-item-label header>What to do</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import { useTripStore } from 'stores/tripinterface';
const tripStore = useTripStore();
const router = useRouter();
const leftDrawerOpen = ref(false);

const linksList = computed(() => {
  return router
    .getRoutes()
    .map((route) => {
      return {
        link: route.name,
        caption: route.meta.caption,
        title: route.meta.title,
        icon: route.meta.icon,
        disabled:
          route.meta.needsRecording === true
            ? !tripStore.loadedDrive.tripLoaded
            : false,
      };
    })
    .filter((item) => item.link); // Filter out unnamed routes
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
