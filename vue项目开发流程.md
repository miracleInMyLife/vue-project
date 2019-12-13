## 对项目的介绍，要提前准备好
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

# 7 创建路由和非路由界面
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
    (4)设置超时的时间
        在instance配置timeout
    (5)通过请求头携带token数据

  2、创建index.js文件---写所有的请求的函数
  3、请求的跨域问题：
      ① 配置代理服务器devServer proxy
      ② 并且配置instance的baseUrl为'/api' --- 让代理转发
      ③ 修改发送请求的地址---'/index_category'或者写全 'https://localhost:8080/api/index_category...'

# 18 用store进行状态管理
  下载vuex npm i vuex --save
  在store文件中引入Vue、Vuex 
  声明使用vuex
  创建store new Vuex.Store({
    state,mutations,actions,getters
  })
  将4个对象模块化
  注册store ---所以组件可以看见$store

# 19 完成首页的请求---在actions中发送异步请求
  1)、根据状态中的固定经纬度请求组当前地址信息


day01:已完成：底部导航切换、头部抽离、头部动态显示、头部的地址显示、点击跳转到登录页面、
              用swiper完成轮播图部分、对axios进行二次封装、