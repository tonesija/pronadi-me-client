<template>
  <div v-if="$store.state.user" class="mainframe">
      <h1 class="title">Vaši pronalasci:</h1>

        <table class="egg-box">
            <tr class="egg-container" v-for="egg in eggs" v-bind:key="egg.id">
                <td class="egg-text ">
                    {{egg.name}}
                </td>
                <td  class="found-icon" v-if="egg.found == 2">
                    <img class="found-icon-img" src="../assets/kvacica.png" width="25">
                </td>
                <td class="found-icon" v-if="egg.found == 1">
                    <img class="found-icon-img" src="../assets/iks.png" width="25">
                </td>
            </tr>
        </table>
        



      
        <p v-show="!collectedAll"
        class="hint text">
        {{hint}}
        </p>
       
       
        <h4 class="congratulations-text text"
         v-show="collectedAll">
         Čestitamo skupija si ih sve!
        </h4>
        


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
              egg.found = 1
              for(let finding of this.findings){
                  if(egg.id === finding.eggID){
                      egg.found = 2
                      break
                  }
              }
          }
          this.$forceUpdate();
      },
      calculateEggIDForHint () {
          for(let egg of this.eggs){
              if(egg.found == 1){
                  return egg.id
              }
          }
      }
  },
  created () {
      if(!this.$store.state.isUserLoggedIn){
          this.$router.push('/login')
          return
      }

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
        text-align: left;
        color: $quinary;
        font-weight: bold;
        font-size: 20px;
        font-family: $sans-serif-font;
    }
    
    .found-icon{
        padding: 0;
        padding-left: 25px;
        margin: 0;
        vertical-align: middle;
    }
    .found-icon-img{
        display:block;
    }
    .egg-box {
      
    }
    .egg-container {
        
    }
    .hint {
        max-width: 90%;
        word-break: break-all;
    }
    .congratulations-text {

    }
    
</style>
