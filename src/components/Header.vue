<template>
    <header v-if="$store.state.isUserLoggedIn">
        <router-link to="/claims" class="header-item">{{$store.state.user.username}}</router-link>
        <router-link to="/" class="header-item"><button @click="logout">Odjavi se</button></router-link>
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
<style scoped>


    header {
         position:fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
        left:0;           /* top left corner should start at leftmost spot */
        top:0;            /* top left corner should start at topmost spot */
        width:100vw;      /* take up the full browser width */
        z-index:200;  /* high z index so other content scrolls underneath */
        height: fit-content;     /* define height for content */
        list-style: none;
        overflow-y: auto;
        display: flex;
        justify-content: end;
        align-items: center;
        background-color: yellow;
    }
    .header-item {
        margin-left: 20px;
        margin-right: 20px;
    }

</style>
