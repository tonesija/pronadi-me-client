<template>
  <div class="mainframe">
    <div>
      <h2 class="title">Prijavi se</h2>
       
      <input class="input" type="username" 
      v-model="username" 
      placeholder="Korisničko ime ili e-mail">
      <br>
      <input class="input" type="password" 
      v-model="password" 
      placeholder="Lozinka">
      <br>
      <button class="button" @click="login">Pošalji</button>

    </div>
    
    <p>Nemaš račun, <router-link to="/register">registriraj se</router-link></p>
    
    <h4 v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
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
            this.$router.push('/claim/?code=' + this.eggCode)
          } catch(err) {
              this.error = err.response.data.error
              return
          }

          this.$router.push('/claims')
          
      }
  },
  async created () {

  }
}
</script>

<style scoped>

</style>
