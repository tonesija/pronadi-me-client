<template>
  <div v-if="loaded">
    <div v-if="!codeError">
      <h1>Čestitam</h1>
      <h2>Kod jajta je: {{ eggCode }}</h2>
      <h3>Prijavi se za registriranje jajeta</h3>

      <input type="username" 
      v-model="username" 
      placeholder="korisničko ime ili email">
      <br>
      <input type="password" 
      v-model="password" 
      placeholder="lozinka">
      <br>
      <button @click="sendLoginWithEgg">Pošalji</button>
      <p>Nemaš račun, <router-link :to="'/register/?code=' + eggCode">registriraj se</router-link></p>

    </div>
    
    <h2 v-if="codeError">Neispravan kod</h2>
    <h4 v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
        loaded: false,
        eggCode: null,
        username: null,
        password: null,
        error: null,
        codeError: null
    }
  },
  methods: {
      async sendLoginWithEgg () {
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
          }
          
      }
  },
  async created () {
    this.eggCode = this.$route.query.code

    if(this.$store.state.isUserLoggedIn){
      this.$router.push('/claim/?code=' + this.eggCode)
      return
    }

    try {
        await AuthenticationService.authenticateEgg({eggCode: this.eggCode})
    } catch (err) {
        this.codeError = err.response.data.error
    }
    this.loaded = true
  }
}
</script>

<style scoped>

</style>
