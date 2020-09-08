<template>
  <div class="mainframe">
    <div>
      <h1 class="title">Stvori novu lozinku</h1>

      <input class="input" type="password" 
      v-model="newPass" 
      placeholder="Nova lozinka">
      <br>

      <input class="input" type="password" 
      v-model="confirmPass" 
      placeholder="Potvrdi lozinku">
      <br>

      <button class="button" @click="storeNewPass">Pošalji</button>
      

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
        newPass: '',
        confirmPass: '',
        error: null,
        message: null
    }
  },
  methods: {
      async storeNewPass () {
        this.error = null
          if(this.newPass != this.confirmPass){
              this.error = 'Lozinke nisu jednake.'
              this.newPass = ''
              this.confirmPass = ''
              return
          }

          console.log(this.$route.query.token)

          try {
              this.message = (await AuthenticationService.updatePass({
                newPass: this.newPass,
                token: this.$route.query.token
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
