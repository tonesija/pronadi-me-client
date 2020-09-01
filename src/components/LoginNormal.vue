<template>
  <div class="mainframe">
    <div>

      <input type="username" 
      v-model="username" 
      placeholder="korisničko ime ili email">
      <br>
      <input type="password" 
      v-model="password" 
      placeholder="lozinka">
      <br>
      <button @click="login">Pošalji</button>

    </div>
    
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
