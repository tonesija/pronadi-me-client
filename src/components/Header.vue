<template>
    <header>
        <router-link to="/" class="header-item"><img src="../assets/pronadime-logo.png"></router-link>
        <router-link v-if="$store.state.isUserLoggedIn" to="/claims" class="header-item"><h2>{{$store.state.user.username}}</h2></router-link>
        <router-link v-if="$store.state.isUserLoggedIn" to="/" class="header-item"><h2 @click="logout">Odjavi se</h2></router-link>
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {  
    logout () {
        console.log('logging out')
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/style.scss';

  img {
    height:20vmin;
  }

  h1 {
    font-family: $serif-font;
    color: $secondary;
  }

    header {
        position:fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
        left:0;           /* top left corner should start at leftmost spot */
        top:0;            /* top left corner should start at topmost spot */
        padding: 1vh 0vw;
        width:100vw;      /* take up the full browser width */
        z-index:200;  /* high z index so other content scrolls underneath */
        height: fit-content;     /* define height for content */
        list-style: none;
        overflow-y: auto;
        display: flex;
        justify-content: end;
        align-items: center;
        background-color: $quinary;
    }
    .header-item {
        margin-left: 20px;
        margin-right: 20px;
    }

</style>
