import Api from '@/services/Api'

export default {
  getEggByCode (data) {
    return Api().post('getEgg', data)
  },
  getAllEggs () {
    return Api().get('getEggs')
  }
}
