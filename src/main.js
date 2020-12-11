import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.config.globalProperties.mitt = mitt()