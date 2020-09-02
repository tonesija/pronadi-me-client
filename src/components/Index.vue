<template>
  <div class="mainframe-index">

    <div class="main-text-window">
      <h1 class="title">PRONAĐI ME</h1>
      <p class="text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elor sit amet consectetur, adipisicing elit. Offor sit amet consectetur, adipisicing elit. Offor sit amet consectetur, adipisicipisicing elit. Offit. Officiis, corrupti! Sapiente nihil possimus consequuntur porro dolores fugit error vitae nobis autem cupiditate quisquam, sit deleniti perspiciatis, inventore maiores delectus atque!
      </p>
    </div>

    <button @click="showAdminTools">Show admin tools</button>
    <div v-if="adminToolsEnabled">
      <h3>Admin actions</h3>
      <input type="text" placeholder="egg name" v-model="newEggName">
      <br>
      <input type="text" placeholder="egg code" v-model="newEggCode">
      <br>
            <input type="text" placeholder="egg hint" v-model="newEggHint">
      <br>

      <button @click="createNewEgg">Create</button> 
    </div>
    



  </div>
  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Api from '@/services/Api' 


export default {
  data () {
    return {
      newEggName: null,
      newEggCode: null,
      newEggHint: null,
      username: null,
      password: null,
      error: null,
      adminToolsEnabled: false
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
            this.$router.push('/claims')
          } catch(err) {
              this.error = err.response.data.error
          }
          
      },
      createNewEgg () {
        Api().post('createNewEgg', {name: this.newEggName, password: this.newEggCode, hint: this.newEggHint})
    },
    showAdminTools () {
      this.adminToolsEnabled = !this.adminToolsEnabled
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/style.scss';
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@700&family=Roboto:wght@500&display=swap');

  .main-text-window {
    margin-left: 25%;
    margin-right: 25%;
    font-size: 18px;
    width: 60vw;
    background-color: $secondary;
    margin-top: 20px;
    padding: 0px 20px;
  }

  .mainframe-index {
    width: 100%;
    background-color: transparent;
    margin-top: $header-height;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-image: url("../assets/bg-for-text2.png");
    background-size: 100%;
    background-repeat: repeat-y;
  }

 

</style>
