import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
// Configure axios BEFORE creating app
axios.defaults.baseURL = import.meta.env.VITE_API_HOST || 'http://localhost:8000'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Create Vue app
const app = createApp(App)

// Use Pinia BEFORE router and BEFORE mounting
const pinia = createPinia()
app.use(pinia)

createApp(App)
  .use(router)
  .mount('#app')