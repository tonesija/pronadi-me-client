<template>
  <div id="app">
    <Header></Header>
    <router-view :key="$route.name + ($route.query.code || '')"/>
  </div>
</template>

<script>
import Header from './components/Header'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'App',
  components: {
    Header
  },
  async created () {
    console.log('APP CREATED')
    try {
      let token = localStorage.getItem("token")
      let user = (await AuthenticationService.automaticLogIn({token: token})).data.user
      console.log(user)
      this.$store.dispatch('setUser', user)
      this.$store.dispatch('setToken', token)
    } catch (err) {
      console.log(err)
    }

  } 
}
</script>

<style lang="scss">
  @import 'assets/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@700&family=Roboto:wght@500&display=swap');



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $quinary;
  padding: 0;
}
#app a {
  text-decoration-color: transparent;

}

.router-link-exact-active{
  text-decoration-color: $secondary !important;
}


.mainframe {
  width: 80%;
  background-color: transparent;
  margin-top: $header-height;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: $tertiary;

  margin-left: 10%;
  margin-right: 10%;
  
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

  padding-top: 10px;
  padding-bottom: 10px;
}

body {
  background-image: url('./assets/bg-for-text2.png');
  background-position-x: center;
  background-size: 180%;
  //background-color: darken($color: $secondary, $amount: 2);
  margin-left: 0; 
  margin-right: 0;
}

  @media screen and (min-width: 700px){
    body {
      background-size: 50%;
    }
  }


  @media screen and (min-width: 1100px){
    body {
      background-size: 20%;
    }
  }



.title {
  font-family: $serif-font;
  padding-top:0;
  margin-top: 0;
}

.text {
  font-family: $sans-serif-font;
}

.error {
  font-family: $sans-serif-font;
  color: $quaternary;
}

.header-text{
  color: $secondary;
  font-size: 10px;
}

  .button{
    outline: none;
    font-family: $sans-serif-font;
    font-size: 18px;
    background-color: $primary;
    color: $quinary;
    padding: 8px 12px;
    border-radius: 10px;
    margin: 16px;
    border: none;
  }
    .button:focus{
    opacity: 50%;
  }
  .input {
    font-family: $sans-serif-font;
    font-size: 14px;
    background: none;
    border: none;
    border-bottom: 2px solid $primary;
    margin: 0;
    padding: 10px;
    
  }
  input:-webkit-autofill {
   -webkit-box-shadow: 0 0 0px 1000px transparentize($color: $primary, $amount: 0.4) inset;
  }
  .input:focus {
    outline: none;
    border-color: transparentize($color: $primary, $amount: 0.7);
  }
  .img-button:active{
    opacity: 50%;
  }

</style>
