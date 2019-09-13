import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import allFilter from './filter/index'
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
  DropdownItem,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Loading
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
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Loading.directive)
Vue.prototype.$message = Message

allFilter(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
