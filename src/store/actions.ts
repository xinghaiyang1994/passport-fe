import { event } from '../utils/tools'
import { EVENT_ADMIN_CHG_NAV } from '../utils/const'
import { getUserInfo } from '../api/actions'

export default {
  getUserInfo(context: any) {
    const { commit } = context
    getUserInfo().then(res => {
      // console.log(res)
      let resData = res.data
      commit('updateUserInfo', {
        data: resData
      })
      if (resData.isAdmin === 1) {
        event.$emit(EVENT_ADMIN_CHG_NAV)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}