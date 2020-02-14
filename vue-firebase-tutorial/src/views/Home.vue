<template>
  <div class="home">
    <HelloWorld/>
    <button @click="logout">LogOut</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(()=>{
        this.$router.replace('login');
      })
    }
  }
}
</script>
