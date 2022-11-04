import './style.scss';
import '@/assets/scss/mobile.scss';
import { createApp } from 'vue';
import { setupStore } from '@/sotre';
import { uos } from '@/lib/chack-mobile';
import App from './App.vue';

if (uos.isAndroid || uos.isPhone) {
  console.log('手机');
} else if (uos.isTablet) {
  console.log('平板');
} else if (uos.isPc) {
  console.log('电脑');
}
const app = createApp(App);
setupStore(app);
app.mount('#app');
