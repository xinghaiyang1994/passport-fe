<template>
  <div class="cm-login">
    <el-form ref="form" :model="form" class="cm-login-form" label-width="70px">
      <div class="mb-10">
        <h2 class="cm-login-form-title">登录</h2>
        <div class="clearfix">
          <span @click="goRegister" class="fr cp topic">注册</span>
        </div>
      </div>
      <el-form-item label="用户名" prop="name" :rules="checkLimitWord(20, true)">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="checkLimitWord(20, true)">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" :rules="checkLimitWord(4, true)">
        <div class="clearfix">
          <el-input type="text" v-model="form.captcha" class="cm-login-form-input-short fl"></el-input>
          <div class="cm-login-img-wrap fr">
            <img :src="imgLoginCaptcha" @click="updateImgLoginCaptcha" class="wh-all" alt="">
          </div>
        </div>
      </el-form-item>
      <div>
        <el-button @click="validate" :disabled="!canLogin" class="cm-login-submit" type="primary">登录</el-button>
      </div>
    </el-form>  
  </div>
</template>

<script lang="ts">
  import { Component, Vue} from 'vue-property-decorator'
  import { checkLimitWord } from '../utils/check'
  import API from '../api/index'
  import {
    postUserLogin
  } from '../api/actions'

  interface Form {
    name: string,
    password: string,
    captcha: string
  }

  @Component
  export default class extends Vue{
    // data
    form: Form = {
      name: '',
      password: '',
      captcha: ''
    }
    canLogin: boolean = true
    imgLoginCaptcha: string = ''
    // 来源
    queryFrom: any = ''

    // methods
    goRegister() {
      this.$router.push({
        path: '/register',
        query: {
          from: this.queryFrom
        }
      })
    }
    checkLimitWord = checkLimitWord
    // 更新验证码
    updateImgLoginCaptcha() {
      this.imgLoginCaptcha = `${API.USER_LOGIN_CAPTCHA}?t=${(new Date()).getTime()}`
    }
    // 整体表单校验
    validate() {
      let oForm: any = this.$refs['form']
      oForm.validate((valid: any, invalidField: any) => {
        if (valid) {
          this.submitForm()
        } else {
          return console.log('error submit!!', invalidField)
        }
      })
    }
    // 提交
    submitForm() {
      let data = JSON.parse(JSON.stringify(this.form))
      if (!this.canLogin) {
        return
      }
      this.canLogin = false
      postUserLogin(data).then(() => {
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
        setTimeout(() => {
          if (this.queryFrom) {
            window.location.href = decodeURIComponent(this.queryFrom)
          } else {
            this.$router.push('/admin')
          }
        }, 1500)
      }).catch(err => {
        this.canLogin = true
        console.log(err)
      })
    }

    // 生命周期
    created() {
      this.queryFrom = this.$route.query.from
      console.log(this.queryFrom)
      this.updateImgLoginCaptcha()
    }

  }
</script>