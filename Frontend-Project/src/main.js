import { createApp } from 'vue'
import App from './App.vue'
import AppNotification from "@kyvg/vue3-notification";
import router from './router';
import store from './store';


createApp(App).use(store).use(router).use(AppNotification).mount("#app");
