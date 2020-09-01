<template>
    <header>
        <router-link to="/" class="header-item"><img class="logo" src="../assets/pronadime-logo.png"></router-link>
        
        <h3 class="header-item-end">
          <router-link
          v-if="$store.state.isUserLoggedIn" 
          to="/claims">
          <h3 class="username">{{$store.state.user.username}}</h3>
          </router-link>
        </h3>
        
        <div>
        <router-link 
          v-if="!$store.state.isUserLoggedIn" 
          class="header-item-end"
          to="/login$">
          <img class="lock-logo" src="../assets/lock-icon.png">
        </router-link>

        </div>

        <div @click="logout">
          <router-link 
          v-if="$store.state.isUserLoggedIn" 
          class="header-item"
          to="/"> 
          <img class="lock-logo"  src="../assets/lock-icon.png">
          </router-link>
        </div>
        
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {  
    async logout () {
        console.log('logging out')
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/style.scss';
  .logo {
    height:20vmin;
  }
  .lock-logo {
    height: 12vmin;
  }

  @media screen and (min-width: 700px){
    .logo {
      height: 75px
    }
    .lock-logo {
      height: 40px
    }
  }


  h1 {
    font-family: $serif-font;
    color: $secondary;
  }

    header {
        position:fixed; 
        left:0;           
        top:0;            
        padding: 1vh 0vw;
        width:100vw;      
        z-index:200; 
        height: fit-content;
        list-style: none;
        overflow-y: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        background-color: $quinary;
    }


  @media screen and (max-height: 400px){
    header {
      display: none;
    }
  }

    .header-item {
        margin-left: 20px;
        margin-right: 20px;
    }

    .header-item-end {
      margin: 0;
      margin-left: auto;
      margin-right: 20px;
    }

    .username {
      color: $secondary;
      font-size: 18px;
    }

.router-link-exact-active{
    color: $secondary;
}
</style>
