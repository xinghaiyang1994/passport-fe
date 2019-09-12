import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './style/variable.scss'
import './style/element-variables.scss'
import './style/_reset.scss'
import './style/common.scss'

import { 
  Button,
  Message,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Menu,
  MenuItem,
  Main,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
