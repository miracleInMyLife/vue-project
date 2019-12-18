## 对项目的介绍，要提前准备好：项目技术、开发模式
## 前后台交互时，后台还未开发好，我们可以使用mockjs和easy库来模拟数据
## 工程化的项目：可以通过一个命令一键打包运行
## css预编译器：less、stylus、sass
## 后台接口：描述向后台请求的信息和响应信息的结构
## vue脚手架的入口文件是main.js，想改名就要改配置
## 是否带编译器的
# 1、做适配 
      yarn add lib-flexible postcss-px2rem -D
      下载flexible和px2rem--- 配置--- 引入
      防抖-解决点击延时0.3s --- 借用fastclick库
# 2、安装阿里iconfont图标库
  建议使用在线地址
  使用时：<i class="iconfont icon-user"></i>

# 3 创建文件目录

# 4 安装stylus
        1) yarn add stylus stylus-loader -D
        2) <style lang="stylus" rel="stylesheet/stylus"></style>
        3) 将mixins.styl文件放到common中

# 5 eslint是检查代码规范
  vue脚手架已配置好，可以通过package.json中的rules进行开启和关闭某个规范

# 6 结构分析
      1)、上中下结构 --- 更简单
      2)、上下结构 --- 头部会重复使用，
      3)、最终选择第二种方式，练习slot插槽技术

# 7 创建路由和非路由组件
  Msite/Search/Order/Profile   Footer

# 8 创建路由器和路由
      下载 路由器 yarn add vue-router
      在路由器文件中声明使用路由器
      声明路由的模式:hash/history,vue已配置好，直接设置即可
      将所有的路由单独创建一个文件，暴露一个数组即可
      在入口文件引入并注册路由器--所有的组件能看见$router和$route  <router-link>和<router-view>

# 9 创建一个最基础的页面，测试路由可以使用

# 10 做footer导航
      基础固定布局 --- 基础固定样式 --- 点击切换路由并选中的导航颜色
      （1）从$route里拿到path，判断path是否与 Msite/Search/Order/Profile等对应的路由一直，决定高亮的class是否生效
      （2）点击切换路由：（有两种方式：编程式路由和路由链接）
        用编程式导航：
          给每个底部的导航加上点击监听：@click = "goto('/search')"
          定义goto的方法：goto(path){this.$router.replace(path)},用路由器实现跳转
            跳转时要进行判断--是否点的同一个：若是点击的同一个，则刷新当前页面---发送一个一般http请求window.location ，若是点击的不同才跳转
          地址栏地址切换后，$route中的path就会变，导航的颜色就会变化

# git 控制
      1).创建远程仓库
      2).创建本地仓库 --- 还要配置.gitignore文件
      3).将本地文件放到暂存区中 git add *
      4).将暂存区的文件提交上去 git commit *
      5).当两个仓库中的有冲突时，本地有修改，无法直接拉取，需要合并远程仓库
        将远程仓库合并到本地：切换到主分支master 
        使用合并操作 ：git merge origin my  将远程my分支合并到本地
      6).远程的一个分支有修改，要拉取到本地
        git pull origin my  拉取远程的my分支到本地
      7).克隆 git clone https://github.XXXX
      克隆后，只能看见主分支master，要切换到别的分支后才能看见别的分支 git checkout -b my origin/my 根据远程my分支创建本地my分支 

# 11 做路由的首页、搜索、订单、我的的静态页面（将图片资源导入）

# 12 完成头部独立，
  将头部提取注册为全局组件
  头部的中部固定，左侧和右侧的用slot占位，需要的时候就传过去

# 13 登录与注册静态页面
      1)、当点击我的里面的登录时才跳到登录界面
      2)、但跳过去后会发现，底部导航也在，这时就需要使底部导航在某个条件下才会显示v-show
        2.1)、借助于组件的元信息，meta
        2.2)、只有在底部导航的四个组件才会显示，所以在四个路由注册时，添加上meta元信息：meta:{isShowFooter:true}
        2.3)、然后给底部导航<FooterNav v-show="$route.meta.isShowFooter"></FooterNav>

# 14 完成首页的轮播效果
      借助swiper5的库---查看文档,通过类名去控制的
        下载npm i swiper 
        引入构造函数和样式 
          import Swiper from 'swiper
          import 'swiper/css/swiper.css'
        创建实例:swiper实例对象必须在列表数据显示之后创建才有效果，所以要在页面挂载mounted后创建，但若数据是从后台请求回来的话，就无法生效了，因为页面挂载的时候数据还没有回来
          new Swiper('.swiper-container',{
            direction : '' // 默认是水平轮播
            loop : true,  // 是否无缝轮播
            pagination:{  // 设置分页器
              el:'.swiper-pagination'
            }
          })
  
# 服务器原生启动命令：node server.js
# 用postman测试接口

# 15 登录界面的表单验证
  借助element库---看文档，
  下载：npm i element-ui -S


# 16 开始与后台交互
# 17 简历api文件夹-专门用来向后台发送请求
      1、对axios进行二次封装 --- 添加请求拦截器和响应拦截器与请求进行过滤
        (1) 统一处理请求异常
          中断promise链
        (2) 异步请求成功的数据不是response，而是response.data
          成功-响应拦截器返回response.data
        (3)对请求体参数进行urlencoded处理,不使用默认的json格式,后台只支持urlencoded
          需要借助一个库---qs
        (4)设置超时的时间timeout和路径前缀baseURL（在创建instance实例时指定）
        (5)通过请求头携带token数据

      2、创建index.js文件---写所有的请求的函数
      3、请求的跨域问题：
          ① 配置代理服务器devServer.proxy --- 
            代理服务器webpack-dev-server ===> http-proxy-middleware
          ② 并且配置instance的路径前缀baseUrl为'/api' --- 针对前台虚拟路径的特定请求做转发操作
          ③ 修改发送请求的地址---'/index_category'或者写全 'https://localhost:8080/api/index_category...'

# 18 用store进行状态管理---设计state 
      1 下载vuex npm i vuex --save
      2 在store文件中引入Vue、Vuex 
      3 声明使用vuex
      创建store new Vuex.Store({
        state,mutations,actions,getters
      })
      4 将4个对象模块化
      注册store ---所以组件可以看见$store
      5 用$store对象中的dispatch和commit方法去更改状态

# 19 完成首页的请求---在actions中发送异步请求
      1)、根据状态中的固定经纬度请求组当前地址信息


# day01:已完成：底部导航切换、头部抽离、头部动态显示、头部的地址显示、点击跳转到登录页面、
              用swiper完成轮播图部分、对axios进行二次封装、

# 1 移动端click300ms的问题
        为什么有这个click延迟300ms？
          一般在移动端浏览器中，单机是确定，而双击是为了缩放的效果，在这个延迟的300ms中判断用户是否进行了双击，在touchend事件中判断是否
        延迟300ms是什么样的问题？
          就是让点击后延迟300ms触发点击回调
        
        如何解决？
          使用touch事件监听，不用click
          用一个库---FatClick
        FatClick的原理：在touchend事件，会通过DOM自定义事件立即触发一个模拟click事件的click事件，去阻止浏览器300ms后分发的click事件


# 组件里的ref值相当于是id，都是唯一标识

# 2 请求拦截器和响应拦截器
  请求拦截器只是在发送请求前对请求信息config进行过滤和更改，要将请求信息config返回，因为还要继续发送请求的
      instance.interceptors.request.use(
      config => { // config里面是所有请求的信息：方式、参数、地址等等
        if (config.data instanceof Object) {
          config.data = qs.stringify(config.data)
        }
      return config  // 请求拦截器只是在发送请求前对请求信息进行过滤和更改，要将请求信息返回，因为还要继续发送请求的
      })

# 3 用mapState、mapActions。。。等4个函数去将store中对应的方法映射出来

# 4 在首页发送getShops请求时，会报错，401 ---表示权限不够，后台要求携带token验证
  现在暂未处理这个问题，还没添加token，先去服务器去更改暂时用一下
            
# 5 从后台请求回来的分类和商家列表数据，被保存到state中去
  用循环去动态生成列表
  列表中有图片显示，要注意图片的路径，响应数据的图片地址只有基础路径，还要加上

# 6 在请求时，显示背景的轮廓图
  用svg轮廓图
  v-if 当商家数据的数组大于0时，表示请求成功，正常显示
  v-else 否则就显示svg图
    <img src="./images/load.svg" />

# 7 完成首页轮播的动态显示
  轮播的循环是一个二维数组，轮播每一页是一维数组[[c1,c1...c8],[c9,c10,....c16],[....]]
  外面的数组是决定轮播的页数，里面的每一项是每一页显示的数据
  根据响应数据的一维数组遍历生成二维数组
        const bigArr
        categorys.forEach(()=>{
          
        })
  
  可以用到一个工具库：lodash --- 提供了很多工具函数
  可以用到chunk函数
    下载： npm i lodash （ 在我们项目中，lodash已经被作为依赖模块下载了，就无须下载了）
    引入lodash的方法 
      import _ from lodash //引入所有_下的方法，会使打包文件大，可以按需引入，无需其他配置
      import chunk from 'lodash/chunk' //引入lodash文件下的其他文件，只打包选中的文件，打包文件小
      _.chunk(categorys,8)  //将categorys一维数组分成每个是8 的二维数组

# 8 动态显示分类列表后，会让swiper失效
  之前swiper写在首页组件挂载后，但由于分类列表是异步获取回来的，就会使swiper失效
  产生的原因: swiper必须是在列表显示之后创建才有效，而发送请求是异步的，在组件mounted后，swiper实例同步创建，而数据还没有回来，所以无法生效
  综合解决方案：
    1、watch + vm.$nextTick()
      (1)、用watch监视从状态获取的categorys的数据  ---- 刚开始挂载categorys为空数组，请求回来后categorys有数据，watch引起界面的变化过程：更新数据---> 立即同步调用监视回调函数 ---> 异步更新界面，更新界面是在最后面的一个步骤，
      (2)、回调的触发可能是在数据更新的那一刻，还未来得及更新界面，此时可以：
        1) 用一个定时器，延迟一下创建Swiper实例
        2) 用vue或vm下的方法$nextTick(()=>{}) 函数在数据变化时触发，回调在下一次界面更新后执行，在回调中创建swiper实例

    2、callback + vm.$nextTick()
      利用
    3、dispatch返回值是promise，且该promise在数据更新且界面更新之后才成功，所以可以使用async和await等待dispatch返回后才创建swiper实例 
      async mounted (){
        ...其他的请求放在前面...
        await this.$store.dispatch('getCategorys')
        new Swiper ('.swiper-container',{
          ......
        })
      }

# 9 首页在请求时，显示loading效果
  利用mint-ui  ---- 查看文档
    下载 npm i mint-ui
    下载 babel-plugin-component
    配置babel.config.js :
      "plugins": [["component", 
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ]]
  在请求拦截器中做loading显示和隐藏
    Indicator.on()
    Indicator.close()


# 10 login页面-当前状态值只在当前页面使用，状态就直接写在当前页面即可

## 10.1 切换登录方式---控制盒子显示隐藏/切换二级路由
  点击按钮---更新对应状态的布尔值---引用状态动态控制盒子的类名---进而控制是否显示
  <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms = true">短信登录</a>
  <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms = false">密码登录</a>

## 10.2 手机号格式验证，验证成功才能发送验证码
    输入的手机号要做数据绑定 --- 通过计算手机号属性用正则匹配后反正一个布尔值--- 根据布尔值控制验证和发送验证码的按钮是否可用

## 10.3 发送验证码的倒计时效果
  在可以点击发送验证码时开始倒计时
  注意问题：当不停的点击发送验证码按钮会出现连续开定时器的，所以在输入框的disable属性要设置为在倒计时时也不能点击

## 10.4 密码登录界面的密码可见性的切换
    通过当前页面的状态的布尔值去控制input框的type值(text/password)
    
## 10.5 语言切换
    通过添加动态类名来实现效果

## 表单验证 --- 借用vee-validate,返回的是promise对象
  下载 npm i vee-validate
  引入 import VeeValidate from 'vee-validate'
  将该功能抽离成单独的模块，在入口文件中引入

## 10.6 前后台交互
### 10.6.1 一次性图形验证码
  一请求就直接回来一张图，data值就是图片的地址svg
  所以此时不需要发ajax请求，直接把src值设置为请求的地址，
    1) 利用代理服务器转发请求到4000的接口
      src="/api/captcha"  
    2) 当前请求的是一个http的请求，不是ajax请求，不存在跨域问题
      src="http://localhost:4000/captcha"
  
  当点击图片时，要切换图片
    要切换就要重新指定新的src的值
    用ref标记输入框ref="imgCode",修改src值
    this.$refs.imgCode.src = `http://localhost:4000/captcha?t=${Date.now()}`
    后面加query参数t是为了使src的值时刻都是新的，浏览器会发生请求
    用防抖解决点击过快的问题，让500ms只可以点击一次,用定时器，每次在500ms内点击，都会取消上一次的定时器

### 10.6.2 获取短信验证码（测试）
  用到容联云通讯---注册账号---添加测试号码---要将服务器后台的util里的信息改成自己的信息后---重新运行服务器---向测试号码发送验证码---
  发送请求的接口，可以使用对象写法
      export const reqSmsCode = (phone) => axios.get({
        url:'/sendcode',
        params:{
          phone
        }
      }
  在引入时，除了通过直接引入方法之外，还可以将整个请求文件夹中所有文件包装成暴露出去，用ES6的通用写法：
    在入口文件引入：import * as API from './api/index'
    在入口文件中注册后，所有的组件对象this身上都有$API这个对象，并且这个对象里面有发送请求的所有的方法


  在短信发送失败后(得到的code为1),要停止倒计时：将计时的时间改成0，前面检测状态改变的会自动停止定时器
    this.countDown = 0

### 10.6.3 短信登录
  1 定义发请求的方法：
    export const reqSmsLogin = (phone,code) => axios.post('/login_sms',{phone,code})
  2 再表单认证成功，发送登录请求，code为0表示成功，code为1表示失败
    2.1 若失败，
      
    2.2 若成功，得到user的信息（包含token）
      


### 10.6.4 密码登录
  1 定义发请求的方法：
    export const reqPwdLogin = (name,pwd,captcha ) => axios.post('/login_pwd',{name,pwd,captcha})
  2 再表单认证成功，发送登录请求，code为0表示成功，code为1表示失败
    2.1 若失败，
      2.1.1 提示失败信息,
      2.1.2 并且刷新图片验证码 --- 指定src的值--- 直接调用之前定义好的 点击图片更新图片验证码的方法即可
      2.1.3 还要清空输入框
    2.2 若成功，得到user的信息（包含token）
      将user和user中的token保存到vuex的state中，也要保存到localStorage中
        在个人中心的页面，头像旁边登录信息的显示要从vuex中取，在state中初始化token值为本地存储的值-token:localStorage.getItems('token')
        存储到localStorage,是为了在刷新时也可以有信息
      跳转到个人中心 this.$router.replace('/profile')
  
### 10.6.4 自动登录
  通过请求拦截器设置请求头，携带token数据
    import './src/store'
    const token = store.state.token
    if(token){
      config.headers['Authorization']= token
    }
  实现自动登录：在App组件挂载后就要发请求登录---在没有user，有token的情况下才发自动登录的请求
    if(state.token && !state.user._id){
      const result = await reqAutoLogin()
      if(result === 0){ 请求成功
        const user = result.data  没有token
        commit() 改变状态
      }
    }
  
### token问题:
  在第一次登录时，服务器对用户名和密码查询，如果user存在，服务器校验成功，根据user的id值生成token，通过响应返回token（token中有两个重要的信息：一个是用户的id，一个是token时效），将token保存到localStorage中，也要存到state中（为了取值更快）
  再次请求登录时，要携带token，在请求拦截器的设置请求头中设置。若token存在，将token添加到请求头中，校验通过，返回正常数据，不通过就返回错误码，由前台在响应拦截器中去处理错误

  token是什么时候产生的：在第一次登录时产生
  浏览器可以禁用cookie，所以需要token，token是经过加密后的字符串
### 在首页发送获取分类列表和商家列表请求时，会报错，401 ---表示权限不够，后台要求携带token验证
  在响应拦截器里面处理错误：如果响应状态码是401，并且当前不在登录页面，则自动跳转到login页面 
    $router只在路由组件中，想要用router，直接引入router的文件夹即可：import './src/router'
    if(error.response.status === 401){  401表示发送的请求需要有通过 HTTP 认证的认证信息，即需要携带token
      if(router.currentRoute.path !== '/login'){
        router.replace('/login)
        Toast('登录失效，请重新登录')  mintui的样式
      }
      
    }else {  // 其他错误
      提示其他信息
      MeaasgeBox('提示','')
    }
  在获取分类列表和商家列表发请求的方法中，给请求头添加一个属性
    {
      headers：{
        needCheck：true   表示当前接口需要校验
      }
    }
  在请求头中设置时，要对当前接口的needCheck的值进行判断，若为真，但又没有token，则返回一个错误状态的promise
### 10.6.4 退出登录
  在响应拦截器中的错误处理回调中：如果响应状态码是401，并且当前不在登录页面，则退出登录（清除数据并跳到登录页面）
  退出登录 即将vuex中的token和user信息清除，并将本地的token也情空

# 11 评分组件
  1、星星在首页和点击进去的商家详情页显示的大小不一样，所以父组件传过去的除了评分rate之外还有星星大小size
  2、用数组去装星星不同样式的类名，因为数组是有序的数据集合。我们根据数组去遍历生成标签

# 12 个人中心的退出登录按钮
  1 在登录的时候才显示
  2 点击后，会弹出提示框-是否退出登录，MessageBox.congirm('确认退出吗'),返回promise对象
    点击确定：清空状态，并清除localStorage的token
    点击取消：

# 13 商家详情页面
  是一个新的路由组件--创建 --注册路由
  给每一个商家列表中的商家绑定点击事件---
  该路由组件也要拆分 --- 上中下结构 --
    上面是固定的
    中间是控制二级路由的，二级路由也要在注册
    下面是显示二级路由的内容的
  想要点击时为replace跳转，将点击的标签属性值设置为replace即可


# 14 vue项目国际化 
  国际化：就是把所有用于界面显示的字符串全部提取出来，做成多个语言版本，
  本地化：给项目做一个本地语言的版本
  借助vue-i18n
    用于vue脚手架3版本的项目
    下载：vue add i18n 执行后会多许多文件，其中包括locales文件夹，并且多了很多语法：
      $i18n 可以   
      $t 是一个函数，读取当前指定语言版本（locales文件夹中的版本）的信息值
  1) 初始化显示语言版本：在.env中的第一个默认的值
  2) 需要进行语言切换的地方，要用$t('XXX'),xxx的显示内容是在locale的文件夹中设置的
  3) 添加按钮，切换语言
    toggle(){
      //获取当前语言版本
      let locale = this.$i18n.locale === 'en' ? 'zh_cn' : 'en'
      //指定新版本
      this.$i18n.locale = locale

      // 为了能够刷新之后还能有上一次切换的语言，所以每一次切换要将语言信息保存到本地中
      localStorage.setItem('locale_key',locale)

      // 还要改一下i18n的配置
       locale: localStorage.getItem('locale_key') || process.env.VUE_APP_I18N_LOCALE || 'en',
    }
  

# 测试登录与注册：
  1、密码登录，登录成功跳到个人中心页
  2、切换到首页，要发请求获取商品和商家列表
  3、获取商品和商家列表时需要携带token
  4、若没有token或者token失效，则会退出登录（清空信息，并跳转到登录页面）
  5、若token失效，且当前不在登录页面，则跳到登录
  6、若是响应码是404，则提示访问的资源不存在
  注：在响应拦截器处理错误时，有没有发送请求是通过error里的response判断
    若是有response，查看response的status，若status是401，则表示token过期，若是404，则表示请求资源未找到


# 15 mock
## json是具有特点结构的字符串
    整体结构
      json对象：{"key":"value"}
      json数组：[value1,value2...]
        ☆key必须是字符串,value可以是字符串/数字/布尔值/对象/数组

    json的组成:数据类型结构和数据值标识名称
      数据类型结构：{}和标识名称，不显示到界面
      数据值："value"，要显示到界面
    json对象和json数组的适用场景
      有顺序要求的用数组
      有名值对要求,见名知义的要求
    作用：前后台交互的数据结构

## mock
### mock的json数据结构---模拟数据接口--mock数据与真实数据：结构一样，值不一样
  {
    "goods" : [
      {
        icon:'url',
        title:'优惠',
        foods : [
          {name:'南瓜粥',desc:'xxxx',price:12},
          {name:'小米粥',desc:'xxxx',price:8}
        ]
      },
      {
        icon:'url',
        title:'盖饭类',
        foods : [
          {name:'茄子牛肉',desc:'xxxx',price:12},
          {name:'小炒蒜薹',desc:'xxxx',price:8}
        ]
      }
    ],
    "judge" : [{}],
    "info":{}
  }
### mockjs的理解和使用---生成随机数据，拦截ajax请求
  将mock的data数据暴露出来：
    用到一个库：mockjs是用来提供mock数据接口的js库 --- 查看文档！！！具体使用
    模拟服务器：
      1、新建文件：mock-server.js
      2、引入Mock，和json数据（json数据引入后，会自动解析成js对象）
      3、定义mock接口：
        1) 商品接口
          Mock.mock('/goods',{code:0,data:data.goods})
        2) 评价接口
          Mock.mock('/ratings',{code:0,data:data.ratings})
        3) 商家接口
          Mock.mock('/info',{code:0,data:data.info})
      4、无需再export default暴露，只需要在入口文件中引入即可，因为在入口文件中，运行时webpack将所有的依赖都下载

      5、但有问题:请求无法成功，因为我们发请求的地址，代理服务器都会默认加上api，mock中的地址是请求的完整地址
        Mock.mock('/api/goods',{code:0,data:data.goods})
        Mock.mock('/api/ratings',{code:0,data:data.ratings})
        Mock.mock('/api/info',{code:0,data:data.info})
      6、定义对应的请求的方法 reqGoods = axios.get('/goods')  此处不用加api，因为带来服务器会加上api，会匹配mock中的地址，返回数据
      7、在shop组件挂载时发送请求，将请求回来的数据存入到vuex中，用于页面展示
      8、根据vuex存入的数据动态显示页面
        问题1：初始显示页面，效果会出来，但会报错 --- 结构中优惠的那一块结构引用了vuex中的多层数据
          会报错原因是在组件初始化时，html中优惠那一块引用了vuex中的多层数据，html结构是同步的，但vuex中的数据是在异步请求回来的
          虽然报错，但依然会出来效果，是因为vuex数据改变，页面就会重新渲染，报错是在最开始的时候报的错
          解决：对引入多层数据的部分标签结构整体进行判断
            用v-if进行vuex中数据的条件判断。v-if是控制标签的创建与销毁
            此时不可以用v-show，因为b-show虽然与v-if效果一样，但v-show只是控制标签隐藏了，依然会编译，还是会报错

        问题2：要求不同的优惠图标对应不同的颜色
          通过每一条优惠数据的type值，给标签的动态类名添加标识

        问题3：当点击头像和优惠时，都会有对应的详情显示框出来；当点击×时，关闭显示框
          用对应的条件判断控制，当点击对应区域的时候，改变状态，控制对应详情框的显示
          点击×和再次点击对应区域时，直接将状态改为false，控制显示框隐藏
        
        问题4：显示框显示与隐藏的过渡属性
          用vue的transition控制过渡效果
      
# 16 Goods组件
  商品组件里面包含购物车组件，
## 从状态中取出goods，动态渲染页面
  1、渲染左侧列表时，没有小图标，就不显示小图标，用条件渲染

  2、右侧食物列表，动态渲染，价格有旧价格，有就显示

  3、左侧列表和右侧商品的上下滑动效果，要用一个库
    用到 ： better-scroll库，今年刚出2.0 ---- 查看文档
    下载 ：npm i better-scroll (1.x版本) 禁用了原生的dom事件，使用的是自定义事件，而且默认不分发优化
    作用：移动端各种滚动滑动需求的插件包
    好处：基于原生js实现，不依赖任何框架。2.0版本的打包文件比1.0版本小，因为2.0版本做了渐进式的处理
    引入：import BScroll form 'better-scroll'
        new BScroll('元素选择器',{   表示在哪个元素范围内有效，与swiper相似
          配置对象
        })
    注：左侧和右侧是分开的，就是要有两个实例分别负责，scroll实例与swiper实例一样，都是要等到界面更新后才创建实例。但我们下载的版本是1.0中最新的，内部对页面是否更新有判断，所以我们写的时候直接在组件挂载之后创建即可，但假设内部是无法判断，要我们自己实现效果的话，我们可以跟swiper的解决方法一样，swiper的解决方法：① watch+$nextTick  ② callback+$nextTick ③ 在await 请求后 再创建，在此处，我们只能使用第一种方法，因为我们这个组件是二级路由组件，而请求是在父组件挂载时就发了，无法传递callback和用await

  4、右侧滑到某一部分，左侧会跟着定位
    为当前的分类设计一个currentIndex,当index与currentIndex相等时，会
      1)、data数据
        右侧每个li的原始top值的数组：tops --- 原始的top值数组，不变
        右侧列表滑动的Y轴坐标：scrollY --- 在滑动时不断改变
        data(){
          return {
            scrollY:0,  在监听过程中，取值并复制 
            tops:[]  在该goods组件挂载就计算出各top值
          }
        }
      2)、计算属性，用于左侧的显示对应
          currentIndex(){
          return this.tops.findIndex((top,index)=> this.scrollY >= top && this.scrollY < this.tops[index+1] )
        }
      3) 给右侧实例对象绑定监听：滑动scroll监听和滑动scrollEnd结束监听
          监听的注意事项：要想获取滑动的实时位置，必须添加配置：probeType，值是1，2，3，默认是0，即不派发scroll事件：
            probeType : 1   不实时-间隔触发，只在触摸时有效
            probeType : 2   实时-高频触发，只在触摸滑动时有效
            probeType : 3  实时-高频触发，在触摸、惯性滑动、编码控制滑动 都有效
          建议使用第一种，减少计算，配合scrollEnd事件监测最后的位置即可

      问题1：刷新后列表丢失
          引入的reset样式的路径有问题，不应该加.

      问题2：滑动右侧列表时，使左侧的对应菜单始终可见？
          解决思路：当当前分类项下标（currentIndex）发生改变时，让左侧列表滑动到当前分类处
            将每一次计算出来的currentIndex保存到状态中，新计算的覆盖之前计算的。并返回
          如何判断下标发生了改变？
            在每次计算下标时，判断状态存的下标是否与此时计算的下标一致，若是不一致，就是改变了，
              若是改变了，计算出左侧每个li元素的值，再给左侧列表实例对象添加scroll分发的事件scrollToElement

  5、点击左侧某个分类，右侧列表会滑到对应位置
    给每个食物列表绑定点击事件，但注意，scroll会阻止dom的事件行为，若是要点击事件，则要传配置对象：
      new BScroll(this.$refs.left,{
        click:true,  // 支持dom自定义的click事件
      })
      clickMenu(index){
        // 计算出点击的index对应右侧应该往上滑的距离
        console.log(index)
        let top = this.tops[index]
        this.scrollY = top  // 点击后立马计算出currentIndex的值
        this.scrollRight.scrollTo(0,-top,500)   // 使右边的移动到对应的位置
      }

 # 17 + 组件 Cart
  每个食物都有这个组件，是一个全局组件
  - 2 + 
  点击加号或减号时，要更新vuex数据中food的count值，food是从Goods组件传给+组件，再传到action中的
  所以要分发action去更新数据，在改变mutation时，要判断传过来的food中是否有count，若有则让count++，若是没有，则初始化为1
    if(food.count) food.count++
    else food.count = 1

  问题1：vuex中的count数据已经改变，但页面没有改变
      ☆☆☆因为初始化时，food.count = 1，count是新添加的属性，没有数据绑定效果（非响应式）
    解决：添加count时，用响应式的添加 --- 查看vue的文档，找到添加响应式属性的方法：Vue.set(target,key,value)
      else {
        Vue.set(food,'count',1)
      }
  问题2：防止点击过快
    解决：用节流 --- lodash的throttle
      引入：import throttle from 'lodash/throttle'
      使用：将实际要节流的操作包裹
        点击+触发updateFoodCount，然后将
                            该函数的this是由内部返回的函数的this决定
        updateFoodCount: throttle( function(){
          this.$store.dispatch('updateFoodCount',isAdd)

        })

# 18 Food组件
  1、点击食物列表，会出来对应的大图显示
  2、Food组件是一个一般组件，需要动态的渲染数据，而用于渲染页面的数据是由Goods组件由props属性动态传递给Food组件的，即当点击哪一个食物，就将对应的food对象数据传递给Food组件，那么就需要给每个食物都绑定点击事件，参数携带food
  3、在点击回调中，将food存入Goods的状态里，再从状态里取数据传给Food组件，否则取不到food。并且在回调中调用子组件Food中控制显示与隐藏的方法
  4、如何在父组件中调用子组件的方法：
    ☆☆☆组件标签对象就是对应的组件对象
    通过this.$refs.food 取到的就是Food组件对象，在Food组件中有toggle切换显示隐藏的方法，在父组件中可以直接通过this.$refs.food.toggle()调用子组件的方法
    <Food :food="food" ref="food"/>


# 19 给每个食物点击后出来的大图界面，添加loading状态，
  用到图片懒加载 --- vue-lazyLoad
  是vue的核心库，不需要下载，直接引入 import VueLazyload from 'vue-lazyload'
  引入图片 import loading from '../images/loading.gif'
  使用 Vue.use(VueLazyload,{
    loading:'dist/loading.gif'  loading效果图片的地址
    loading:loading  引入了loading效果图片
  })
  使用之后全局多了一个指令 v-lazy，值就是正常显示图片的地址 
    <img v-lazy="food.image"/>  在food.image图片显示前会有loading效果

# 20 以功能为模块拆分管理数据
  /store
    store.js
    state.js
    actions.js
    getters.js
    mutations.js
    /modules  功能模块,管理对应模块的数据
      msite.js  首页模块相关数据管理
      user.js  用户模块
      shop.js   商家模块


  每个模块是一个对象,都是固定的结构
    export default {
      state:{},
      actions:{}
      getters:{}
      mutations:{}
    }
  
  在store.js中引入功能模块
    Vue.use(Vuex)
    export default new Vuex.Store({
      // state,  // 数据都写到模块中去，就不需要这个文件了
      mutations,   总的motations,motations内部方法接收总的state为参数
      actions,    总的actions,actions内部方法接收总的state为参数，内部的方法会查找所有匹配的mutation(总的和模块的)
      getters,
      modules:{   总的state的数据
        msite,
        user,
        shop
      }
    })

  最终中的state的结构
    state:{
      msite:{},
      user:{},
      shop:{}
      ...
    }
  再在组件中映射state时，就要改变了
    之前 computed:{...mapState([ address : 'address' ])}
         computed:{...mapState({ address : state => state.address })}

    现在 computed:{
        ...mapState({ 
          address : state => state.msite.address,  address的值是函数返回值，就是state.msite.address(总state下的msite模块里的address属性的值)
          info:state => state.shop.info
        }
      )} 
     


# 21 Shopcar组件
  shopcar里面的数据，是根据goods中选中的计算出来的，所以要用到getters的计算属性
    carFoods(state){
      const goods = state.goods
      let arr = []
      goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count > 0){
            arr.push(food)
          }
        })
      })
      return arr 
    }
  计算属性的值，会在初始显示和依赖数据发生改变时，重新计算，即每次我们点+或者-，都会计算，效率很低，我们可以不用计算属性，而是把carFoods的数组存入到state状态中，数组中存的是count大于0的food，当用户再次点击+或-时，只需要改变count的值即可



根据当前state的数据的计算属性写在getters里，写在getters里的计算属性，可以供多个组件使用

问题：
1、购物车详情的清空之后，列表头还在
  解决：购物车详情的显示与隐藏通过购物车总数量或者总价去判断
  listShow(){
    if(this.totalCount === 0){
      return false
    }
    return this.isShow
  }
2、通过第一步隐藏了详情页后，当再次点击食物添加的时候，详情页会直接跑出来
  解决：


3、当购物车的食物很多时，不能看到全部，不能滑动
  解决：给购物车列表new BScroll()
  但是要在购物车列表显示之后，在$nextTick回调才创建

4、☆☆☆每次显示和隐藏购物车详情，都会创建一个scroll实例，多点几次，就会有多个scroll对象去管理同一个数据，就会造成点击一次+号，会同时加多个
  解决：创建单一的scroll实例
    判断后再创建
    if(!this.scroll){
      this.scroll = new BScroll()
    }

5、接着会造成：当第一次选中的食物少，不用创建scroll，当再添加食物，要在购物车中有滑动效果时，第一次无法滑动，第二次才可以滑动
  原因：因为第一次不需要创建，再添加时，没有重新计算购物车详情的高度
  解决：让每次打开购物车详情页都刷新重新计算高度
    if(!this.scroll){
      this.scroll = new BScroll()
    }else {
      this.scroll.refresh()
    }

6、若是控制购物车详情显示与隐藏的是v-if，会造成第二次就无法滑动
  原因：第一次初始化时，
  解决：用v-show控制
  关联：在很多时候v-if和v-show可以一起用，但有特定时候只能用v-if，有特定的时候只能用v-show
    v-if：在初始化页面的时候，如果用到了多层数据，会报错，就可以用v-if去控制，因为v-if不会初始化解析
    v-show：


清空购物车：绑定点击，提示用户是否真的清空，点确定清空---将state中的cartShops数组清空--但是要遍历将food的count都变为0，再清空数组






# 问题：怎么区分一个库是生产依赖还是开发依赖？
  生产依赖 -S ：做功能效果
  开发依赖 -D ：加工代码的

# async和await
# 依赖图，从入口文件开始，入口文件引入的所有直接依赖和间接依赖都会被打包
# 在 index.html中引入css，不能加.


12.18任务
  1、点击左侧菜单，右侧的菜单跟随滚动 √
  2、做cart组件，cart注册为全局组件，因为在右侧菜单和菜单点击放大都有这个组件
  3、做Food组件  √ 
  4、右侧的菜单点击会有放大的效果，还要给图片加上loading效果 √
  5、以功能为模块拆分状态数据
  6、购物车组件
