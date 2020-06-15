// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false

// firebase初期設定
const config = {
  apiKey: "AIzaSyBq3NMCHeETnf0MWgyGPj_RvZ4sC20USXc",
  authDomain: "vue-sample-10437.firebaseapp.com",
  databaseURL: "https://vue-sample-10437.firebaseio.com",
  projectId: "vue-sample-10437",
  storageBucket: "vue-sample-10437.appspot.com",
  messagingSenderId: "926322378923",
  appId: "1:926322378923:web:d546ee22c836bf5d230fee"
};
firebase.initializeApp(config);


// vue開始
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify,
  template: '<App/>'
})
