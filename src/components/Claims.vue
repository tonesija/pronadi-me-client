<template>
  <div>
      <h3>Vaši pronalazci, {{$store.state.user.username}}</h3>


        <div v-for="egg in eggs" v-bind:key="egg.id">
            <span class="egg-text">{{egg.name}} </span>
            <span class="found-text" v-show="getFound(egg.password)"> Found</span>
        </div>

    </div>
    
</template>

<script>
import EggService from '@/services/EggService'
import FindingService from '@/services/FindingService'


export default {
  data () {
    return {
      eggs: [],
      error: null,
      findings: []
    }
  },
  methods: {
      getFound(eggID) {
          console.log('eggID: ' +eggID)
          for(let finding of this.findings){
              console.log(finding)
              if(finding.eggID === eggID){
                  return true
              }
          }
          return false
      }
  },
  created () {
      EggService.getAllEggs().then(
          res => {
              this.eggs = res.data.eggs
              FindingService.getFindingsByUserID({userID: this.$store.state.user.id}).then(
                  res => {
                      this.findings = res.data.findings
                      
                  }
              )
          }
      )
  }
}
</script>

<style scoped>
    .egg-text{
        color: red;
        font-weight: bold;
        font-size: 24px;
    }
    .found-text{
        color:green;
        font-weight: 600;
        font-size: 18px;
    }
</style>
