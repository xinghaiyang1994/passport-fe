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
      <el-aside width="200px" class="ai-nav-wrap">
        <!-- <el-menu
        default-active="1"
        class="el-menu-vertical-demo">
          <el-menu-item @click="$router.push('/admin/MerchantList')" index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">商家列表</span>
          </el-menu-item>
        </el-menu> -->
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
  import { postUserLogout } from '../../api/actions'

  @Component
  export default class AdminIndex extends Vue {
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
    @Mutation('updateUserInfo')
    updateUserInfo: any
    @Action('getUserInfo')
    getUserInfo: any

    // 生命周期
    created() {
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
  }
</style>