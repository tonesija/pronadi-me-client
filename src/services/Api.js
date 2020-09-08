import axios from 'axios'

//spoj na backend server
export default () => {
  //let ip = window.location.href.substring(0, window.location.href.lastIndexOf(':'))
  return axios.create({
    baseURL: ''
  })
}