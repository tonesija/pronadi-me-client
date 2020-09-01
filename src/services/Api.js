import axios from 'axios'

//spoj na backend server
export default () => {
  let ip = window.location.href.substring(0, window.location.href.lastIndexOf(':'))
  console.log(ip)
  return axios.create({
    baseURL: ip + ':7070'
  })
}