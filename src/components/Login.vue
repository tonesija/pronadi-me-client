<template>
  <div v-if="loaded" class="mainframe">
    <div>
      <h1 class="title" v-show="!codeError">~Čestitamo~</h1>
      <h2 class="title" v-show="!codeError">Pronašli ste kod</h2>
      <h3 class="title" v-show="!codeError">Prijavi se za registriranje koda</h3>
      <h1 class="title" v-show="codeError">Prijavite se</h1>

      <input class="input" type="username" 
      v-model="username" 
      placeholder="korisničko ime ili email"
      v-on:keyup.enter="sendLoginWithEgg">
      <br>
      <input class="input" type="password" 
      v-model="password" 
      placeholder="lozinka"
      v-on:keyup.enter="sendLoginWithEgg">
      <br>
      <button class="button" @click="sendLoginWithEgg">Pošalji</button>
      
      <p class="text">Nemaš račun? 
        <router-link v-if="eggCode" :to="'/register/?code=' + eggCode">Registriraj se</router-link>
        <router-link v-if="!eggCode" to="/register">Registriraj se</router-link>
      </p>
      <p class="text">
        <router-link to="/recovery">Zaboravili ste lozinku?</router-link>
      </p>

    </div>
    
    <h4 class="error" v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
        loaded: false,
        eggCode: null,
        username: '',
        password: '',
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
            this.$store.dispatch('setToken', res.data.token)

            if(this.eggCode){
              this.$router.push('/claim/?code=' + this.eggCode)
            } else {
              this.$router.push('/claims')
            }
            
            return
          } catch(err) {
              this.error = err.response.data.error
              return
          }
      }
  },
  async created () {
    this.eggCode = this.$route.query.code

    if(!this.eggCode && this.$store.state.isUserLoggedIn){
      this.$router.push('/claims')
      return
    }

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
