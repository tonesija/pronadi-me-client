<template>
  <div>
      <h3>Vaš pronalazak je zabilježen {{$store.state.user.username}}</h3>

      <h2 v-if="egg">{{egg.name}}</h2>

      <router-link to="/claims">Pogledaj svoje pronalaske</router-link>

    </div>
    
</template>

<script>
import EggService from '@/services/EggService'
import FindingService from '@/services/FindingService'


export default {
  data () {
    return {
      egg: null
    }
  },
  methods: {  
      
  },
  async created () {
    EggService.getEggByCode({password: this.$route.query.code})
    .then(res => {
      this.egg = res.data.egg
      FindingService.addFinding({userID: this.$store.state.user.id, eggCode: this.egg.password})
    })
  }
}
</script>

<style scoped>

</style>
