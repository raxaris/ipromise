import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { FontAwesomeIcon } from '@/plugins/font-awesome';
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app
    .use(router)
    .use(store)
    .mount('#app')

