<template>
    <div class="mainframe">
        <h1 class="title">Poredak</h1>

        <table class="table">
            <tr>
                <th class="text">Korisnik</th>
                <th class="text">Bodovi</th>
                <th class="text">Zadnji kod</th>
            </tr>
            <tr v-for="i in users.length" :key="i">
                <td class="username" :class="{underline: $store.state.isUserLoggedIn && users[i-1].userID === $store.state.user.username}">
                    {{users[i-1].userID}}
                </td>
                <td>
                    <span class="score">
                        {{users[i-1].count}}
                    </span>
                </td>
                <td>
                    {{formatDate(users[i-1].last)}}
                </td>
            </tr>
            <tr v-for="k in (pageSize - users.length)" :key="k + 'a'">
                <td>
                    &nbsp;
                </td>
                <td>  
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
            </tr>
        </table>

        <table class="pagination">
            
            <tr>
                <td>
                    <button :class="{'disable': $route.query.page == 1}"
                    class="pagination-button text"
                    @click="nextPage(false)">&lt;</button>
                </td>
                <td>
                    <nav class="button-nav">
                        <button class="pagination-button text" 
                            :class="{'disable': $route.query.page == i}"
                            v-for="i in noOfPages" :key="i"
                            @click="setParam(i)">
                                {{i}}
                        </button>
                </nav>
                </td>
                <td>
                    <button :class="{'disable': $route.query.page == noOfPages}"
                    class="pagination-button text" @click="nextPage(true)">&gt;</button>
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
      loggedIn: null,
      count: null,
      noOfPages: null,
      pageSize: 12
    }
  },
  methods: {
      setParam (i) {
          this.$router.push({query: {page: i}})
          this.getUsers()
      },
      nextPage (forward) {
          let current = parseInt(this.$route.query.page)
          if(forward){
              this.setParam(current + 1)
          } else {
              this.setParam(current - 1)
          }
      },
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
        this.$route.query.count = this.pageSize
        this.users = (await LeaderboardsService.getUsers({page: this.$route.query.page, count: this.pageSize})).data.users
    }
  },
  async created () {
      if(!this.$route.query.page){
          this.setParam(1)
      }
      this.count = (await LeaderboardsService.getNoOfRows()).data.count
      this.noOfPages = Math.ceil(this.count / this.pageSize)
      this.getUsers()
      
  }
  
}
</script>

<style scoped lang="scss">
  @import '../assets/style.scss';

  .mainframe {
      display: flex;
      flex-direction: column;
  }


  .table {
      width: 90%;
  }

  td {
      height: 20px;
  }
  .username {

  }

    @media screen and (max-height: 400px){
   .mainframe {
      height: fit-content;
  }
}

  .underline {
      color: $quaternary;
      text-decoration-line: underline;
      font-weight: 600;
      
  }
  .score {
      background-color: $primary;
      color: $quinary;
      font-weight: bold;
      padding: 2px 4px;
      border-radius: 20px;
  }

  .pagination {
      margin-top: auto;
      padding-top: 10px;
  }

  .pagination-button {
      outline: none;
      margin-left: 1px;
      margin-right: 1px;
      padding: 4px 6px;
      background-color: $secondary;
      border: 4px solid $quinary;
      border-radius: 6px;
      font-weight: bold;
      font-size: 12px;
      color: $quinary;
  }

  .disable {
    outline: none;
    pointer-events: none;
    background-color: $primary;
  }

  .button-nav {
    display: flex;
    max-width: 150px;
    height: fit-content;
    overflow-y:hidden; overflow-x:scroll;
  }
  .inline{
      display: inline;
  }
  
</style>
