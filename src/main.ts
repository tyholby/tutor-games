import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import './assets/global.css'

const pinia = createPinia()

createApp(App)
	.use(vuetify)
	.use(router)
	.use(pinia)
	.mount('#app')
