import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { install } from 'vue3-recaptcha-v2'

import '@/assets/base.less'

const app = createApp(App)

app.use(install, {
    sitekey: '6LdJaXYoAAAAAEDOQy0THtQ_93dXV3satTD6k1HB',
    cnDomains: true
})

app.use(router)

app.mount('#app')
