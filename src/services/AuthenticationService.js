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
    return Api().post('automaticLogin', data)
  },
  sendRecoveryEmail (data) {
    return Api().post('recovery', data)
  },
  updatePass (data) {
    return Api().post('updatePass', data)
  }
}
