import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/styles/main.css';
import App from './App.vue';
import router from './router';
import { useLoading } from '../src/components/loading/useLoading';
import installi18n from '@/plugins/installi18n'
import { Toast } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
const { isLoading, showLoading, hideLoading } = useLoading();


app.use(createPinia())
app.use(router)
app.use(installi18n)
app.use(Toast);

app.provide('isLoading', isLoading);
app.config.globalProperties.$showLoading = showLoading;
app.config.globalProperties.$hideLoading = hideLoading;

app.mount('#app')
