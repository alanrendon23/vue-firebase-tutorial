<template>
    <div class="login">
        <h3>Sig In</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button @click="login">Connection</button>
        <p>You don't have an account ? you <router-link to="/sign-up"></router-link> can create once</p>
    </div>
</template>

<script>
    export default{
        name: 'login',
        data(){
            return {};
        },
        methods: {
            login: function (){
                this.$router.replace('home');
            }
        }
    }
</script>
<style scoped>
    .login{
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 10px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a{
        text-decoration: underline;
        cursor: pointer;
    }
</style>