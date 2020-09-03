<template>
    <div class="mainframe">
    <h1 class="title">Poredak</h1>


    
    <table class="table">
        <tr>
            <th class="text">Korisnik</th>
            <th class="text">Bodovi</th>
            <th class="text">Zadnji kod</th>
        </tr>
        <tr v-for="user in users" :key="user.userID">
            <td class="username" :class="{underline: $store.state.isUserLoggedIn && user.userID === $store.state.user.username}">
                {{user.userID}}
            </td>
            <td>
                <span class="score">
                    {{user.count}}
                </span>
            </td>
            <td>
                {{formatDate(user.last)}}
            </td>
        </tr>
    </table>


    </div>
    
</template>

<script>
import LeaderboardsService from '@/services/LeaderboardsService'

export default {
  data () {
    return {
      users: [],
      loggedIn: null
    }
  },
  methods: {
      formatDate (old) {
        let date = this.sqlToJsDate(old)
      let year = date.getFullYear().toString().substring(2,4)
      let month = date.getMonth() + 1
      let day = date.getDay()
      let hour = date.getHours()
      let minute = date.getMinutes()

      if(minute < 10) minute = '0' + minute
      if(hour < 10) hour = '0' + hour
      if(month < 10) month = '0' + month
      if(day < 10) day = '0' + day


      let output = day + '/' + month + '/' + year
        + ' ' + hour + ':' + minute
       return output
  },
  sqlToJsDate (sqlDate){
	var sqlDateArr1 = sqlDate.split("-");
	var sYear = sqlDateArr1[0];
	var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
	var sqlDateArr2 = sqlDateArr1[2].split(" ");
	var sDay = sqlDateArr2[0];
	var sqlDateArr3 = sqlDateArr2[1].split(":");
	var sHour = sqlDateArr3[0];
	var sMinute = sqlDateArr3[1];
	var sqlDateArr4 = sqlDateArr3[2].split(".");
	var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1]; 
    return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);
    },
    async getUsers () {
        this.users = (await LeaderboardsService.getUsers()).data.users
    }
  },
  async created () {
      this.getUsers()
  }
  
}
</script>

<style scoped lang="scss">
  @import '../assets/style.scss';



  .table {
      width: 90%;
  }
  .username {

  }

  .mainframe {
      padding-top: 10px;
      padding-bottom: 10px;
  }

  .underline {
      color: $quaternary;
      text-decoration-line: underline;
  }
  .score {
      background-color: $primary;
      color: $quinary;
  }
  
</style>
