import Api from '@/services/Api'

export default {
  getUsers () {
    return Api().get('getUsers')
  }
}
