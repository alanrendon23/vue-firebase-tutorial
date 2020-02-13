import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false;
let app= '';
var firebaseConfig = {
  apiKey: "AIzaSyAIXIfoudxgOkw-cY625vKhcCsKr31xp0M",
  authDomain: "vue-firebase-tutorial-9dba7.firebaseapp.com",
  databaseURL: "https://vue-firebase-tutorial-9dba7.firebaseio.com",
  projectId: "vue-firebase-tutorial-9dba7",
  storageBucket: "vue-firebase-tutorial-9dba7.appspot.com",
  messagingSenderId: "682724681797",
  appId: "1:682724681797:web:1f4e68990292076ea1db2c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
    
  }
});

