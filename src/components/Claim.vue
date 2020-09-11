<template>
  <div class="mainframe" v-if="loaded">
      <div v-if="!error" class="container">
        <h2 class="title">Vaš pronalazak je zabilježen</h2>

        <p class="egg-name text" v-if="egg">{{egg.name}}</p>

       
        <router-link to="/claims"><h4 class="link">Pogledaj svoje pronalaske</h4></router-link>
     
      </div>

      <h3 class="error" v-if="error">{{error}}</h3>

    </div>
    
</template>

<script>
import EggService from '@/services/EggService'
import FindingService from '@/services/FindingService'


export default {
  data () {
    return {
      egg: null,
      error: null,
      loaded: false
    }
  },
  methods: {  
      
  },
  async created () {
    let code = this.$route.query.code
    if(!code){
      this.$router.push('/claims')
      return
    }
    if(!this.$store.state.isUserLoggedIn){
      this.$router.push('/login/?code=' + code)
      return
    }
    try {
      let res = await EggService.getEggByCode({password: this.$route.query.code})
      this.egg = res.data.egg


      //dodaj finding u bazu
      await FindingService.addFinding({userID: this.$store.state.user.id,
           eggCode: this.egg.password, token: this.$store.state.token})
      this.loaded = true
    } catch (err) {
      this.error = err.response.data.error
      this.loaded = true
    }

  }
}
</script>

<style scoped lang="scss">
  @import '../assets/style.scss';

  .error {
    color: $quaternary;
    font-size: 21px;
  }

  .mainframe{
    padding-top: 20px;
    padding-bottom: 10px ;
  }
    .container{
    display: flex;
    flex-direction: column;
        align-items: center;
  }

  .link {
    color: $quinary;
    font-size: 18px;
    border-bottom: 2px solid $quinary;
  }

  .egg-name {
    color: $quinary;
    background-color: $primary;
    border: 5px solid $quinary;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 22px;
    font-weight: bold;
     width: fit-content;
  }

</style>
