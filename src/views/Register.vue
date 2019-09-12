<template>
  <div class="cm-login">
    <el-form ref="form" :model="form" class="cm-login-form" label-width="70px">
      <div class="mb-10">
        <h2 class="cm-login-form-title">注册</h2>
        <div class="clearfix">
          <span @click="goLogin" class="fr cp topic">登录</span>
        </div>
      </div>
      <el-form-item label="用户名" prop="name" :rules="checkLimitWord(20, true)">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="checkLimitWord(20, true)">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain" :rules="rules.passwordAgain">
        <el-input type="password" v-model="form.passwordAgain"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" :rules="checkLimitWord(4, true)">
        <div class="clearfix">
          <el-input type="text" v-model="form.captcha" class="cm-login-form-input-short fl"></el-input>
          <div class="cm-login-img-wrap fr">
            <img :src="imgRegisteCaptcha" @click="updateImgRegisteCaptcha" class="wh-all" alt="">
          </div>
        </div>
      </el-form-item>
      <div>
        <el-button @click="validate" :disabled="!canLogin" class="cm-login-submit" type="primary">注册</el-button>
      </div>
    </el-form>  
  </div>
</template>

<script lang="ts">
  import { Component, Vue} from 'vue-property-decorator'
  import { checkLimitWord } from '../utils/check'
  import API from '../api/index'
  import {
    postUserRegiste
  } from '../api/actions'

  interface Form {
    name: string,
    password: string,
    passwordAgain: string,
    captcha: string
  }

  @Component
  export default class extends Vue{
    // data
    form: Form = {
      name: '',
      password: '',
      passwordAgain: '',
      captcha: ''
    }
    canLogin: boolean = true
    imgRegisteCaptcha: string = ''
    rules: object = {
      passwordAgain: [
        { 
          validator: this.checkPasswordAgain, 
          trigger: ['blur','change'] 
        }
      ]
    }
    // 来源
    queryFrom: any = ''

    // methods
    goLogin() {
      this.$router.push({
        path: '/login',
        query: {
          from: this.queryFrom
        }
      })
    }
    // 二次密码校验
    checkPasswordAgain(rule: any, value: any, callback: any) {
      if ((value + '').trim() === '') {
        return callback(new Error('不能为空！'))
      }
      if (value.length > 20) {
        return callback(new Error('限制在 20 字以内！'))
      }
      if (value !== this.form.password) {
        return callback(new Error('两次密码不一致！'))
      }
      callback()
    }
    checkLimitWord = checkLimitWord
    // 更新验证码
    updateImgRegisteCaptcha() {
      this.imgRegisteCaptcha = `${API.USER_REGISTE_CAPTCHA}?t=${(new Date()).getTime()}`
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
      postUserRegiste(data).then(() => {
        this.$message({
          type: 'success',
          message: '注册成功'
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
      this.updateImgRegisteCaptcha()
    }

  }
</script>