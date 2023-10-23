import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './template.js'
import router from './router'
import App from './App.vue'
// ElementPlus notification show er jonno statrt 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// ElementPlus notification show er jonno end
// Local a data save rakhar jonno show er jonno start
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// ElementPlus notification show er jonno end


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app =  createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router);
app.mount('#app');
