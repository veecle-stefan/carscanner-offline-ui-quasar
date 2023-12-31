import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'analysis',
    },
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/route',
        name: 'route',
        meta: {
          needsRecording: true,
          title: 'Show Route',
          description: 'Show recorded route',
          icon: 'route',
        },
        component: () => import('pages/ShowRoute.vue'),
      },
      {
        path: '/analysis',
        name: 'analysis',
        meta: {
          needsRecording: true,
          title: 'Analyse',
          description: 'Analyse powertrain and driving',
          icon: 'drive_eta',
        },
        component: () => import('pages/TechnicalAnalysis.vue'),
      },
      {
        path: '/import',
        name: 'import',
        meta: {
          title: 'Import CSV',
          description: 'Import Car Scanner CSV file',
          icon: 'file_download',
        },
        component: () => import('pages/ImportFile.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        meta: {
          title: 'Settings',
          description: 'Application Settings and defaults',
          icon: 'settings',
        },
        component: () => import('pages/AppSettings.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
