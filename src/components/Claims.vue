<template>
  <div class="mainframe">
      <h3>Vaši pronalasci, {{$store.state.user.username}}</h3>


        <div v-for="egg in eggs" v-bind:key="egg.id">
            <span class="egg-text">{{egg.name}} </span>
            <span class="found-text" v-show="egg.found"> Found</span>
        </div>

        <div v-show="!collectedAll">
            <h4>Hint za sljedeće jaje: </h4>

            <p>{{hint}}</p>
        </div>
        <div v-show="collectedAll">
            <h4>Čestitamo skupija si ih sve!</h4>
        </div>

        <h3 v-if="error">{{error}}</h3>

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
      findings: [],
      hint: null,
      collectedAll: false
    }
  },
  methods: {
      calculateFound () {
          for(let egg of this.eggs){
              for(let finding of this.findings){
                  if(egg.id === finding.eggID){
                      egg.found = true
                      break
                  }
              }
          }
          this.$forceUpdate();
      },
      calculateEggIDForHint () {
          for(let egg of this.eggs){
              if(!egg.found){
                  return egg.id
              }
          }
      }
  },
  created () {
      EggService.getAllEggs().then(
          res => {
              this.eggs = res.data.eggs
              FindingService.getFindingsByUserID({userID: this.$store.state.user.id}).then(
                  res => {
                      this.findings = res.data.findings
                      console.log(this.findings.length + ' ' +this.eggs.length)
                      this.calculateFound()
                      if(this.findings.length == this.eggs.length) {
                          this.collectedAll = true
                          console.log('coll all true')
                          return
                      }


                      
                      EggService.getHint({eggID: this.calculateEggIDForHint()})
                      .then(res =>{
                          this.hint = res.data.hint
                          
                      })
                      .catch(err => {
                          this.error = err.response.data.error
                      })
                  }
              )
          }
      )
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/style.scss';
    .egg-text{
        color: $danger;
        font-weight: bold;
        font-size: 24px;
    }
    .found-text{
        color:$success;
        font-weight: 600;
        font-size: 18px;
    }
</style>
