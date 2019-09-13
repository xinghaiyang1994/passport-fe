import {
  tranTime
} from '../utils/tools'

const filters: any = {
  tranTime,
}

function allFilter (Vue: any) {
  for (const key in filters) {
    Vue.filter(key, filters[key])
  }
}
export default allFilter