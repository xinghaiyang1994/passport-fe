import { getUserInfo } from '../api/actions'

export default {
  getUserInfo(context: any) {
    const { commit } = context
    getUserInfo().then(res => {
      console.log(res)
      let resData = res.data
      commit('updateUserInfo', {
        data: resData
      })
    }).catch(err => {
      console.log(err)
    })
  }
}