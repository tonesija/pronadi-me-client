import Api from '@/services/Api'

export default {
  login (data) {
    return Api().post('login', data)
  },
  authenticateEgg (data) {
    return Api().post('authenticateEgg', data)
  },
  register (data) {
    return Api().post('register', data)
  },
  automaticLogIn (data) {
    console.log('saljem token')
    return Api().post('automaticLogin', data)
  }
}
