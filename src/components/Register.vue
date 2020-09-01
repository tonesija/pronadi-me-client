<template>
  <div v-if="loaded">
      <div v-if="!codeError">
        <h3>Registracija</h3>

        <input type="username" 
        v-model="username" 
        placeholder="korisničko ime">
        <br>
        <input type="email" 
        v-model="email" 
        placeholder="email">
        <br>
        <input type="password" 
        v-model="password" 
        placeholder="lozinka">
        <br>
        
        <button @click="register">Pošalji</button>
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
        username: null,
        email: null,
        password: null,
        error: null,
        codeError: null,
        loaded: false
    }
  },
  methods: {
      async register () {
          this.error = null
          try {
            const res = await AuthenticationService.register({
              username: this.username,
              email: this.email,
              password: this.password
            })
            this.$store.dispatch('setUser', res.data.user)
            this.$router.push('/claim/?code=' + this.$route.query.code)
          } catch(err) {
              this.error = err.response.data.error
          }
      }
  },
  async created () {
    this.eggCode = this.$route.query.code
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
