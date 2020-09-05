<template>
  <div v-if="loaded" class="mainframe">
      <div>
        <h1 class="title">Registracija</h1>

        <input class="input" type="username" 
        v-model="username" 
        placeholder="korisničko ime">
        <br>
        <input class="input" type="email" 
        v-model="email" 
        placeholder="email">
        <br>
        <input class="input" type="password" 
        v-model="password" 
        placeholder="lozinka">
        <br>
        
        <button class="button" @click="register">Pošalji</button>
      </div>

      <h4 class="error" v-if="error">{{error}}</h4>

    </div>
    
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
        username: '',
        email: '',
        password: '',
        error: null,
        codeError: null,
        loaded: false,
        toClaims: false
    }
  },
  methods: {
      async register () {
          this.error = null
          try {
            const res = await AuthenticationService.register({
              username: this.username,
              email: this.email.toLowerCase(),
              password: this.password
            })

            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setToken', res.data.token)

            if(this.toClaims){
              this.$router.push('/claims') 
            } else {
              this.$router.push('/claim/?code=' + this.$route.query.code)
            }
          } catch(err) {
              this.error = err.response.data.error
          }
      }
  },
  async created () {
    this.eggCode = this.$route.query.code
    if(!this.eggCode){
      this.toClaims = true
      this.loaded = true
      console.log('no egg code')
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
