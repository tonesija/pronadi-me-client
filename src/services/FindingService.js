import Api from '@/services/Api'

export default {
  addFinding (data) {
    return Api().post('addFinding', data)
  },
  getFindingsByUserID (data) {
    return Api().post('getFindings', data)
  }
}
