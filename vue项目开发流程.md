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

# 4 在首页去发送getShops请求时，会报错，401 ---表示权限不够，后台要求携带token验证
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
    3、利用dispatch，dispatch返回值是promise，且该promise在数据更新且界面更新之后才成功，所以可以使用async和await等待dispatch返回后才创建swiper实例 
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
    下载 babel-
    配置
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

## 10.4 密码登录界面的密码可见性的切换
    通过当前页面的状态的布尔值去控制input框的type值(text/password)
    
## 10.5 语言切换
    通过添加动态类名来实现效果

## 表单验证 --- 借用vee-validate,返回的是promise对象
  下载 npm i vee-validate
  引入 import VeeValidate from 'vee-validate'








# 问题：怎么区分一个库是生产依赖还是开发依赖？
# async和await