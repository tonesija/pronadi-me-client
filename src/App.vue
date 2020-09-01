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

.mainframe {
  width: 100%;
  background-color: transparent;
  margin-top: $header-height;
}



.title {
  font-family: $serif-font;
}

.text {
  font-family: $sans-serif-font;
}

</style>
