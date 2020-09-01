<template>
  <div>
    <h1>Pronađi me</h1>
    <div>
      <h3>Prijavi se da vidiš svoja jaja:</h3>
      <input type="username" placeholder="korisničko ime" v-model="username">
      <br>
      <input type="password" placeholder="lozinka" v-model="password">
      <br>
      <button @click="login">Pošalji</button> 

      <p>{{error}}</p>
    </div>


    <div>
      <h3>Admin actions</h3>
      <input type="text" placeholder="egg name" v-model="newEggName">
      <br>
      <input type="text" placeholder="egg code" v-model="newEggCode">
      <br>
      <button @click="createNewEgg">Create</button> 
    </div>
  </div>


  
</template>

<script>
import Api from '@/services/Api' 
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
    createNewEgg () {
      console.log(this.newEggCode)
      Api().post('createNewEgg', {name: this.newEggName, password: this.newEggCode})
    },
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
<style scoped>

</style>
