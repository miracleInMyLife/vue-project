<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms = true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form >
          <div :class="{on:isShowSms}">
            <section class="login_message">
              <input type="tel" v-model="phone" maxlength="11" placeholder="手机号" name="smsMobile" v-validate="'required|mobile'">
              <span style="color: red;" v-show="errors.has('smsMobile')">{{ errors.first('smsMobile') }}</span>
              <button :disabled="phone.length !== 11 || this.countDown > 0" :class="phone.length === 11 ? 'get_verification get_code':'get_verification'" @click.prevent="getCode"> {{countDown > 0 ? `验证码已发送(${countDown}s)` : '发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel"  v-model="smsCode" maxlength="8" placeholder="验证码" name="smsCode"  v-validate="'required|smsCode'">
              <span style="color: red;" v-show="errors.has('smsCode')">{{ errors.first('smsCode') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShowSms}">
            <section>
              <section class="login_message">
                <input type="tel" v-model="username" maxlength="11" placeholder="用户名" name="username" v-validate="'required|username'">
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' :'password'"  v-model="pwd" maxlength="8" placeholder="密码" name="pwd" v-validate="'required|pwd'">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>

                <div :class="isShowPwd?'switch_button on':'switch_button off'" @click="isShowPwd = !isShowPwd">
                  <div :class="isShowPwd?'switch_circle right':'switch_circle'"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" v-model="pwdCode" maxlength="11" placeholder="验证码" name="pwdCode" v-validate="'required|pwdCode'">
                <span style="color: red;" v-show="errors.has('pwdCode')">{{ errors.first('pwdCode') }}</span>
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="codeUpdate" ref="imgCode">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">{{$t('login_login')}}</button>
        </form>
        <a href="javascript:;" class="about_us">{{$t('login_aboutUs')}}</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
        <i class="iconfont icon-jiantou"></i>
      </a>
      <Button type="primary" @click="toggleLang">切换语言</Button>
    </div>
  </section>
</template>

<script>
// import Vue from 'vue'
// import VeeValidate from 'vee-validate'  //处理表单验证的问题
// import zh_CN from 'vee-validate/dist/locale/zh_CN' // 提示信息本地化
import { reqSmsCode,reqSmsLogin,reqPwdLogin } from '../../api/index.js'
import { MessageBox,Toast,Button } from 'mint-ui'
// Vue.use(VeeValidate)

// 指定手机号的验证规则
// VeeValidate.Validator.extend('mobile', {
//   validate: value => {
//     return /^1\d{10}$/.test(value)
//   },
//   getMessage: field => field + '必须是11位手机号码'
// })
// // 指定短信验证码的验证规则
// VeeValidate.Validator.extend('smsCode', {
//   validate: value => {  
//     return /^\d{6}$/.test(value)
//   },
//   getMessage: field => field + '必须为4位合法字符'
// })
// // 指定用户名的验证规则
// VeeValidate.Validator.extend('username', {
//   validate: value => {
//     return /^1\d{10}$/.test(value)
//   },
//   getMessage: field => field + '不合法'
// })
// // 指定邮件的验证规则
// VeeValidate.Validator.extend('email', {
//   validate: value => {
//     return /^\w{5,20}@(qq|163|126|sina)\.(com|cn)$/.test(value)
//   },
//   getMessage: field => field + '不合法'
// })

// // 指定密码登录图片验证码的验证规则
// VeeValidate.Validator.extend('pwdCode', {
//   validate: value => {  
//     return /^\w{4}$/.test(value)
//   },
//   getMessage: field => field + '必须为4位合法字符'
// })
// // 指定密码的验证规则
// VeeValidate.Validator.extend('pwd', {
//   validate: value => {
//     return /^\w{2,8}$/.test(value)
//   },
//   getMessage: field => field + '必须大于2位小于8位'
// })

// // 提示信息本地化
// VeeValidate.Validator.localize('zh_CN', {
//   messages: zh_CN.messages,
//   attributes: {
//     smsMobile: '手机号',
//     smsCode:'验证码',
//     pwdMobile:'手机号',
//     pwdCode:'验证码',
//     email: '邮箱',
//     pwd:'密码',
//   }
// })

export default {
  data() {
    return {
      phone:'', // 短信登录界面的手机号输入框的数据绑定
      smsCode:'',
      username:'',
      pwd:'',
      pwdCode:'',
      isShowSms:true, //短信登录和密码登录切换
      isShowPwd:true, //控制密码登录界面的密码框是否可见
      // imgCodeUrl:'',  // 存放图片验证码的地址
      countDown:0 , // 倒计时的时间
    }
  },
  methods: {
    async getCode(){
      // 点击获取验证码，开始倒计时
      this.countDown = 10
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0 ) {
          clearInterval(this.timer)
        }
      }, 1000);

      //发送请求获取短信验证码
      const result = await reqSmsCode(this.phone)
      if (result.code === 0) {   // 发送成功
        //提示成功
        Toast('发送验证码成功，请注意查收')
      }else {
        //提示失败
        MessageBox('提示','信息发送失败')
        this.countDown = 0

      }
      // console.log(result)
      // 此处执行获取到验证码之后的操作

    },
    //当点击图片时，发送请求获取新的验证码图片
    async codeUpdate(){
      // 无需发请求了，直接修改src值即可
      // const result = await reqImgCode()

      // 做防抖，避免连续点击，
      if (this.id) { 
        clearTimeout(this.id)  // 一定要清理定时器，否则会越开越多，影响性能
      }
      this.id = setTimeout(() => {
        this.$refs.imgCode.src = `/api/captcha?t=${Date.now()}`
      }, 500);
    
    },
    async login(){
      if (this.isShowSms) { // 用短信登录
        const success = await this.$validator.validateAll(['smsMobile','smsCode'])  // success结果是布尔值,表示表单数据校验成功
        if (success) {
           //若是表单数据校验成功，则发请求登录
          const result = await reqSmsLogin(this.phone,this.smsCode)
          console.log(result)
          if (result.code === 0 ) {  // 表示请求登录成功
            const user = result.data  // user是登录成功后返回的用户信息，包含_id,phone,token
            const {token} = user
            // 将token存入本地和vuex中
            this.$store.dispatch('saveToken',token)
            localStorage.setItem('token_value',token)
            // 将user存入vuex中,token已经在上面存了，所以可以删除token
            delete user.token 
            this.$store.dispatch('saveUser',user)
            // 存好之后跳转到profile
            this.$router.push('/profile')
          }else {
            MessageBox('提示',result.msg)
          }
        }
      }else {   // 用密码登录
        const success = await this.$validator.validateAll(['username','pwdCode','pwd']) 
        if (success) {
          //若是校验成功，则登录到首页(后面还要校验数据库的信息，此时就先这样写)
          //则发请求 密码登录
          const result = await reqPwdLogin(this.username,this.pwd,this.pwdCode)
          if (result.code === 0 ) {  // 登录成功后操作与手机验证码登录一样
            const user = result.data  // user是登录成功后返回的用户信息，包含_id,phone,token
            const {token} = user
            // 将token存入本地和vuex中
            this.$store.dispatch('saveToken',token)
            localStorage.setItem('token_value',token)
            // 将user存入vuex中,token已经在上面存了，所以可以删除token
            delete user.token 
            this.$store.dispatch('saveUser',user)
            // 存好之后跳转到profile
            this.$router.push('/profile')
          }else{  // 登录失败
            this.codeUpdate()
            MessageBox('提示',result.msg)
          }
        }
      }
    },
    
    toggleLang(){
      //获取当前语言并设置新的语言
      console.log(this.$i18n)
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh_cn':'en'

      // 将最近一次切换的语言存到本地中去 --- 确保刷新时依然是上一次切换的语言
      localStorage.setItem('locale_key',this.$i18n.locale)
    }
  },
  // watch: {
  //   countDown(value){
  //     this.countDown = value
  //   }
  // },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.get_code
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999

</style>