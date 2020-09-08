<template>
  <div class="mainframe">
    <div>
      <h3 class="title">Upišite e-mail ili korisničko ime za promjenu lozinke</h3>

      <input class="input" type="username" 
      v-model="input" 
      placeholder="korisničko ime ili email">
      <br>

      <button class="button" @click="sendMail">Pošalji</button>
      

      <p class="text" v-show="message">{{message}}</p>

    </div>
    
    <h4 class="error" v-if="error">{{error}}</h4>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
        input: '',
        error: null,
        message: null
    }
  },
  methods: {
      async sendMail () {

          try {
              this.message = (await AuthenticationService.sendRecoveryEmail({
                creds: this.input
              })).data.message
          } catch (err) {
              this.error = err.response.data.error
          }


      }
  }
    
}
</script>

<style scoped>

</style>
