<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import 'assets/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@700&family=Roboto:wght@500&display=swap');

@media screen and (min-width: 700px){
  
}

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
  width: 100%;
  background-color: transparent;
  margin-top: $header-height;
  display: flex;
  flex-flow: column;
  align-items: center;

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

.egg-name {
  color: $quaternary;
  margin-left: 4px;
}

  .button{
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
  .input:focus {
    border-color: transparentize($color: $primary, $amount: 0.7);
  }
  .img-button:active{
    opacity: 50%;
  }

</style>
