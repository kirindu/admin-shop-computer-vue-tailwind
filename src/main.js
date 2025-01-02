import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createModal } from '@kolirt/vue-modal'

import App from './App.vue'
import router from './router'

import './css/main.css';



const app = createApp(App);

// Init Pinia
app.use(createPinia());
app.use(router);

app.use(createModal({
  transitionTime: 200,
  animationType: 'slideDown',
  modalStyle: {
    padding: '5rem 2rem',
    align: 'center',
    'z-index': 201
  },
  overlayStyle: {
    'background-color': 'rgba(0, 0, 0, .5)',
    'z-index': 200
  }
}));


app.mount("#app");

import { useDarkModeStore } from './stores/darkMode'

const darkModeStore = useDarkModeStore();

darkModeStore.set();

// Default title tag
const defaultDocumentTitle = 'Admin Shop Computer'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
