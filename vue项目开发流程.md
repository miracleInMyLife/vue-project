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
  （2）点击切换路由：
    用编程式导航：
      给每个底部的导航加上点击监听：@click = "goto('/search')"
      定义goto的方法：goto(path){this.$router.replace(path)},用路由器实现跳转
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

# 

