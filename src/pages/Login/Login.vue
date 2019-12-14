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
              <button :disabled="phone.length === 11" :class="phone.length === 11 ? 'get_verification get_code':'get_verification'" @click="getCode">获取验证码</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" name="smsCode"  v-validate="'required|code'">
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
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" name="pwdMobile" v-validate="'required|mobile'">
                <span style="color: red;" v-show="errors.has('pwdMobile')">{{ errors.first('pwdMobile') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' :'password'" maxlength="8" placeholder="密码" name="pwd" v-validate="'required|pwd'">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>

                <div :class="isShowPwd?'switch_button on':'switch_button off'" @click="isShowPwd = !isShowPwd">
                  <div :class="isShowPwd?'switch_circle right':'switch_circle'"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" name="pwdCode" v-validate="'required|code'">
                <span style="color: red;" v-show="errors.has('pwdCode')">{{ errors.first('pwdCode') }}</span>
                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou"></i>
      </a>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'  //处理表单验证的问题
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 提示信息本地化
Vue.use(VeeValidate)
// 指定手机号的验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
// 指定邮件的验证规则
VeeValidate.Validator.extend('email', {
  validate: value => {
    return /^\w{5,20}@(qq|163|126|sina)\.(com|cn)$/.test(value)
  },
  getMessage: field => field + '不合法'
})
// 指定验证码的验证规则
VeeValidate.Validator.extend('code', {
  validate: value => {  
    return /^\d{4}$/.test(value)
  },
  getMessage: field => field + '必须为4位'
})
// 指定密码的验证规则
VeeValidate.Validator.extend('pwd', {
  validate: value => {
    return /^\w{2,8}$/.test(value)
  },
  getMessage: field => field + '必须大于2位小于8位'
})

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    smsMobile: '手机号',
    smsCode:'验证码',
    pwdMobile:'手机号',
    pwdCode:'验证码',
    email: '邮箱',
    pwd:'密码',
  }
})

export default {
  data() {
    return {
      phone:'', // 短信登录界面的手机号输入框的数据绑定
      isShowSms:true, //短信登录和密码登录切换
      isShowPwd:true, //控制密码登录界面的密码框是否可见
      
    }
  },
  methods: {
    getCode(){
      this.
    }
  },

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