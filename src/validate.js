import Vue from 'vue'
import VeeValidate from 'vee-validate'  //处理表单验证的问题
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 提示信息本地化
Vue.use(VeeValidate) // 声明使用后，给组件对象提供了一些语法：v-validate、errors、$validator

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    smsMobile: '手机号',
    smsCode:'验证码',
    username:'用户名',
    pwdCode:'验证码',
    email: '邮箱',
    pwd:'密码',
  }
})

// 指定手机号的验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
// 指定短信验证码的验证规则
VeeValidate.Validator.extend('smsCode', {
  validate: value => {  
    return /^\d{6}$/.test(value)
  },
  getMessage: field => field + '必须为4位合法字符'
})
// 指定用户名的验证规则
VeeValidate.Validator.extend('username', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '不合法'
})
// 指定邮件的验证规则
VeeValidate.Validator.extend('email', {
  validate: value => {
    return /^\w{5,20}@(qq|163|126|sina)\.(com|cn)$/.test(value)
  },
  getMessage: field => field + '不合法'
})

// 指定密码登录图片验证码的验证规则
VeeValidate.Validator.extend('pwdCode', {
  validate: value => {  
    return /^\w{4}$/.test(value)
  },
  getMessage: field => field + '必须为4位合法字符'
})
// 指定密码的验证规则
VeeValidate.Validator.extend('pwd', {
  validate: value => {
    return /^\w{2,8}$/.test(value)
  },
  getMessage: field => field + '必须大于2位小于8位'
})

