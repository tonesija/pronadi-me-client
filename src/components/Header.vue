<template>
    <header>
        <div class="header-item"><router-link to="/"><img class="logo" src="../assets/pronadime-logo.png"/></router-link></div>
        <h4 class="header-text header-item-end" v-show="loggingOutText">{{loggingOutText}}</h4>
        <h3 class="header-item-end">
          <router-link
          v-if="$store.state.isUserLoggedIn" 
          to="/claims">
          <h3 class="username" v-html="username"></h3>
          </router-link>
        </h3>
  
        <div>
          <img @click="openDropDown()" class="navbar-logo" src="../assets/navbar-icon.png">
          <div class="dropdown-content"
          :class="{'dropdown-content-show': dropdown}">

          <div @click="openDropDown()">
              <router-link class="dropdown-item"
                to="/leaderboard"
                >
                <img class="lock-logo" src="../assets/leaderboard-icon.png">
                <p class="text leaderboard-link">Poredak</p>
              </router-link>
          </div>

            <div  v-if="!$store.state.isUserLoggedIn" @click="openDropDown()">
              <router-link class="dropdown-item"
                to="/login">
                <img class="lock-logo" src="../assets/lock-icon.png">
                <p class="text leaderboard-link">Prijava</p>
              </router-link>
            </div>

            <div class="dropdown-item" 
            v-if="$store.state.isUserLoggedIn"
            @click="logout" >
              <div class="img-button" > 
                <img class="lock-logo"  src="../assets/lock-icon.png">
              </div>
              <p class="text leaderboard-link">Odjava</p>  
            </div>

          </div>
        </div>
        
        
        
    </header>
</template>

<script>
export default {
  data () {
    return {
      loggingOutText: null,
      dropdown: false
    }
  },
  methods: {  
    logout () {
      this.openDropDown()
      this.loggingOutText = 'Odjavljujem se...'
      setTimeout(() => {
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)
        this.loggingOutText = null
        this.$router.push('/')
      }, 300)  
    },
    openDropDown () {
      this.dropdown = !this.dropdown
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username.replace(/_/g, '&nbsp;')
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
    height: 6vmin;
    margin-left: 20px ;
  }

  @media screen and (min-width: 700px){
    .logo {
      height: 75px
    }
    .lock-logo {
      height: 40px;
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
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: $quinary;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }


  @media screen and (max-height: 400px){
    header {
      display: none;
    }
  }

    .header-item {
        margin-left: 20px;
        -webkit-tap-highlight-color: transparent;
        margin-right: 20px;
    }
    .header-item:active {
      background-color: $primary;
    }

    .header-item-end {
      margin: 0;
      margin-left: auto;
      -webkit-tap-highlight-color: transparent;
      margin-right: 20px;
    }


    .username {
      color: $secondary;
      font-size: 18px;
    }

    .leaderboard-link {
      color: $secondary;
      font-size: 18px;
      margin-right: 25px;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: $quinary;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: 20px 5px 2px 2px;
      z-index: 201;
    }

    .dropdown-item {
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      padding-right: 10px;
      width: 100%;
      align-items: center;
    }

    .dropdown-item:active {
      background-color: $primary;
    }

    .dropdown-content-show {
      display: block;
    }

    .navbar-logo {
      margin-right: 20px;
      -webkit-tap-highlight-color: transparent;
    }

    .navbar-logo:active {
      background-color: $primary;
    }


</style>
