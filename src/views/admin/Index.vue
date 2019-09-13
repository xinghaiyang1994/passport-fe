<template>
  <el-container class="admin-index">
    <el-header class="ai-header-wrap clearfix">
      <h2 class="ai-header fl">管理</h2>
      <div class="fr">
        <el-dropdown>
          <div class="ai-header-right-info el-dropdown-link">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside v-show="userInfo.isAdmin === 1" width="200px" class="ai-nav-wrap">
        <el-menu
          :default-active="$route.meta.nav">
          <el-menu-item v-for="(item, index) in nav" 
            :key="index" 
            @click="chgNav(item)"
            :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Mutation, Action } from 'vuex-class'
  import { event } from '../../utils/tools'
  import { EVENT_ADMIN_CHG_NAV } from '../../utils/const'
  import { postUserLogout } from '../../api/actions'

  interface NavItem {
    url: string,
    name: string,
    icon: string,
  }

  @Component
  export default class AdminIndex extends Vue {
    // data
    nav: Array<NavItem> = [
      {
        url: '/admin/appList',
        name: '应用列表',
        icon: 'el-icon-menu'
      }
    ]

    // computed
    @State('userInfo')
    userInfo: any

    // methods
    logout() {
      postUserLogout().then(() => {
        this.$message({
          type: 'success',
          message: '退出成功'
        })
        setTimeout(() => {
          this.updateUserInfo({
            data: {}
          })
          this.$router.push('/login')
        }, 1500)
      }).catch(err => {
        console.log(err)
      })
    }
    chgNav(item: NavItem) {
      if (item.url !== this.$route.meta.nav) {
        this.$router.push(item.url)
      }
    }
    @Mutation('updateUserInfo')
    updateUserInfo: any
    @Action('getUserInfo')
    getUserInfo: any

    // 生命周期
    created() {
      event.$on(EVENT_ADMIN_CHG_NAV, () => {
        this.chgNav(this.nav[0])
      })
      this.getUserInfo()
    }
  }
</script>

<style lang='scss' scoped>
  .admin-index{
    height: 100%;
    .ai-header{
      color: #fff;
      font-size: 30px;
      line-height: 60px;
    }
    .ai-header-wrap{
      background: $topic;
    }
    .ai-header-right-info{
      color: #fff;
      font-size: 16px;
      margin-top: 19px;
      cursor: pointer;
    }
  }
</style>

<style lang="scss">
  .admin-index{
    .el-menu{
      height: 100%;
    }
    .el-main{
      padding: 40px;
    }
  }
</style>