# snail-book

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 功能

## 首页

![首页](assets/image-20200824165428003.png)



## 图书详情

### 未评论

![图书详情页](/assets/image-20200824173936029.png)

![图书详情页](assets/image-20200824180852557.png)

### 已评论或未登录

![image-20200824174018060](assets/image-20200824174018060.png)

## 历史记录

![历史记录页](assets/image-20200824174035168.png)

## 个人中心

![个人中心页](assets/image-20200824174044718.png)