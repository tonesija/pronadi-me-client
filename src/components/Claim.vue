<template>
  <div class="mainframe" v-if="loaded">
      <div v-if="!error">
        <h3>Vaš pronalazak je zabilježen {{$store.state.user.username}}</h3>

        <h2 v-if="egg">{{egg.name}}</h2>

        <router-link to="/claims">Pogledaj svoje pronalaske</router-link>
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
    if(!this.$store.state.isUserLoggedIn){
      this.$router.push('/login/?code=' + this.$route.query.code)
      return
    }
    try {
      let res = await EggService.getEggByCode({password: this.$route.query.code})
      this.egg = res.data.egg
      //dodaj finding u bazu
      
      await FindingService.addFinding({userID: this.$store.state.user.id, eggID: this.egg.id})
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

</style>
