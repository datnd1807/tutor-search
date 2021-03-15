
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import store from './store'
import Quasar from 'quasar'
import firebase from 'firebase/app';
import 'firebase/messaging'

Vue.config.productionTip = false
firebase.initializeApp({
  'messagingSenderId': '26977274015',
  'projectId': 'tutor-search-project',
  'apiKey': 'AIzaSyCKdkT084eg8McRLr1Lnw07pZ_6TyrQCp0',
  'appId': '1:26977274015:web:35dc0496b9508f569d7aaa'
});
navigator.serviceWorker.register('firebase-messaging-sw.js', {scope: "firebase-cloud-messaging-push-scope"})
  .then((registration) => {
      const messaging = firebase.messaging();
      messaging.getToken({
        serviceWorkerRegistration: registration,
        vapidKey: "BF7jx4PEM7lP1Oxhq5lNlEypsf55pzgZ6oR8KEBqaEX88vPyfupwzwIdcmib4Kes5HmDZ0mk2MBAya1AXri2yL0",
      });
  }).catch(err => {
      console.log(err)
  })
Vue.use(ArgonDashboard).use(ElementUI, {locale})
new Vue({
  router,
  store,
  Quasar,
  render: h => h(App)
}).$mount('#app')
