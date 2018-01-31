<template>
  <div class="login">
    <img class="bg" :src="'./static/img/login-bg.jpg'" alt="背景图">
    <div class="content">
      <p class="row">
        <span>账号:</span>
        <input v-model="userInfo.userName"
               type="text"
               placeholder="请输入账号">
      </p>
      <p class="row">
        <span>密码:</span>
        <input v-model="userInfo.password"
               type="password"
               placeholder="请输入密码">
      </p>
      <p class="row">
        <yt-checkbox activeColor="#35ca98" v-model="autoLogin"/>
        <label class="auto-login">自动登录</label>
      </p>
      <yt-btn class="btn" :loading="true" :click="login">登录</yt-btn>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Login, LoginOthers} from '@/api'
  import storage from 'good-storage'
  import {USERTOKEN, AUTOLOGIN, ISDEV} from '@/config'
  import {check, delayed} from '@/utils'
  import {Encrypt, Decrypt} from '@/utils/aes'
  class User {
    constructor (options) {
      Object.assign(this, {
        userName: '',
        password: ''
      }, options)
    }
    checkModel () {
      return check(this, {
        'userName': '请输入用户名!',
        'password': '请输入密码!'
      })
    }
  }
  export default {
    name: 'login',
    data () {
      return {
        userInfo: {},
        autoLogin: false,
        login: async () => {
          let msg = this.userInfo.checkModel()
          if (msg) {
            this.$module.toast.show({msg})
            return true
          }
          let res = await Login(this.userInfo)
          if (!res.success) {
            this.$module.toast.show({msg: res.error.message})
          } else {
            storage.set(USERTOKEN, this.userInfo)
            storage.set(AUTOLOGIN, this.autoLogin)
            this.$store.commit('setUser', res.result)
            this.$module.toast.show({msg: '登录成功!', type: 'success'})
            this.$router.push({
              path: '/main',
              query: {
                userId: res.result.id,
                userRoleType: res.result.userRoleType
              }
            })
          }
          return true
        }
      }
    },
    methods: {
      async otherLogin (key) {
        let id = Decrypt(key)
        let res = await LoginOthers(id)
        if (!res.success) {
          this.$module.toast.show({msg: res.error.message})
        } else {
          this.$module.toast.show({msg: '登录成功!', type: 'success'})
          this.$store.commit('setUser', res.result)
          this.$router.push({
            path: '/main',
            query: {
              userId: res.result.id,
              userRoleType: res.result.userRoleType
            }
          })
        }
      },
      defaultLogin () {
        let user = storage.get(USERTOKEN)
        let autoLogin = storage.get(AUTOLOGIN)
        this.userInfo = new User(user)
        this.autoLogin = autoLogin
        if (user && autoLogin) {
          this.login()
        }
      }
    },
    activated () {
      if (ISDEV) {
        this.defaultLogin()
        return
      }
      WebViewJavascriptBridge.callHandler('getRuntimeArguments', null, (key) => {
        if (key) {
          this.otherLogin()
        } else {
          this.defaultLogin()
        }
      })
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">

  .login
    width: 100%
    height: 100%
    transition: all .3s ease

  .bg
    position: absolute
    width: 100%
    top: 0
    left: 0
    z-index: 10

  .content
    position: absolute
    color: #fff
    top: 240px
    left: 60px
    right: 60px
    height: 200px
    z-index: 100

  .btn
    margin-top: 0px
    height: 35px
    line-height: 35px
    color: #fff
    font-size: 15px
    text-align: center
    background-color: #35ca98
    border-radius: 5px

  .row
    display: flex
    align-items center
    font-size: 15px
    margin-bottom: 30px
    span
      flex: 0 0 50px
      letter-spacing: 2px
      margin-right: 10px
    input
      flex: 1
      background-color: transparent
      color: #fff
      border: 0
      outline: 0
      border-bottom: 1px solid #fff
      &:focus
        border: 0
        outline: 0
        border-bottom: 1px solid #fff

  .auto-login
    margin-left 5px


  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size: 15px;
    color: #fff;
    opacity:1;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size: 15px;
    color: #fff;
    opacity:1;
  }

  input:-ms-input-placeholder{
    font-size: 15px;
    color: #fff;
    opacity:1;
  }

  input::-webkit-input-placeholder{
    font-size: 15px;
    color: #fff;
    opacity:1;
  }
</style>
