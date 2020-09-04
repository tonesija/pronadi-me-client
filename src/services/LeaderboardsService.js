import Api from '@/services/Api'

export default {
  getUsers (params) {
    return Api().get('getUsers', {
      params: {
        count: params.count,
        page: params.page
      }})
  },
  getNoOfRows () {
    return Api().get('getUserCount')
  }
}
