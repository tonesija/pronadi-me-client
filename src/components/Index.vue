<template>
  <div class="mainframe">


      <h1 class="title">PRONAĐI ME</h1>
      <p class="text">
        Dobrodošli na Pronadi.me! Pronađi me je <i>treasure hunt</i> igra u kojoj
        je cilj pronaći QR kodove i skenirati ih!
        Da Vam olakšamo, dajemo Vam prvi QR kod!
      </p>


  </div>
  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      newEggName: null,
      newEggCode: null,
      newEggHint: null,
      username: null,
      password: null,
      error: null
    }
  }, 
  components: {
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


  .text {
    padding-left: 20px;
    padding-right: 20px;
  }

 

</style>
