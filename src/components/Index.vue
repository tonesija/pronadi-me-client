<template>
  <div class="mainframe">
    <img class="bg-image" src="../assets/bg-for-text.png">
    <h1 class="title">PRONAĐI ME</h1>

    <div class="main-text-window">
      <p class="text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, corrupti! Sapiente nihil possimus consequuntur porro dolores fugit error vitae nobis autem cupiditate quisquam, sit deleniti perspiciatis, inventore maiores delectus atque!
      </p>
    </div>
    



  </div>
  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'


export default {
  data () {
    return {
      newEggName: null,
      newEggCode: null,
      username: null,
      password: null,
      error: null
    }
  }, 
  methods: {
    async login () {
          this.error = null
          try {
            const res = await AuthenticationService.login({
              username: this.username,
              password: this.password
            })
            this.$store.dispatch('setUser', res.data.user)
            this.$router.push('/claims')
          } catch(err) {
              this.error = err.response.data.error
          }
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@700&family=Roboto:wght@500&display=swap');

  .main-text-window {
    margin-left: 25%;
    margin-right: 25%;
    font-size: 18px;
  }
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    height: 100%;
    width:100%;
    max-height: 100%;
  }
 

</style>
