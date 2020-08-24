<template>
  <div class="container">
    <div class="userinfo">
      <img class="head-img" :src="userInfo.avatarUrl" alt="头像图片" />
      <p class="nick-name" v-if="userInfo.openId">{{userInfo.nickName}}</p>
      <button v-else size="mini" class="btn" open-type="getUserInfo" @getuserinfo="doLogin">登录</button>
    </div>
    <Yearrogress />
    <template v-if="userInfo.openId">
      <button class="btn add-btn" @click="scanBook">添加图书</button>
      <button class="btn out-btn" @click="logOut">退出登录</button>
    </template>
  </div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import {post, showModal} from '@/utils/'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {
        avatarUrl: '/static/images/unlogin.png',
        nickName: '',
        openid: ''
      }
    }
  },
  methods: {
    /**
     * 登录账户
     */
    doLogin (e) {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        return
      }
      qcloud.setLoginUrl(config.login)
      qcloud.login({
        success: (userInfo) => {
          wx.setStorageSync('userInfo', userInfo)
          this.userInfo = userInfo
        },
        fail: function (err) {
          showModal('登录失败', err)
        }
      })
    },
    /**
     * 退出登录
     */
    logOut () {
      wx.removeStorageSync('userInfo')
      this.userInfo = {
        avatarUrl: '/static/images/unlogin.png',
        nickName: '',
        openid: ''
      }
    },
    /**
     * 获取书籍中条形码信息并
     */
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        },
        fail: (err) => {
          console.log(err, 'that')
          showModal('添加失败', '没有获取到图书信息')
        }
      })
    },
    /**
     * 添加图书至后台
     */
    async addBook (isbn) {
      try {
        const res = await post(config.addBook, {
          isbn,
          openId: this.userInfo.openId
        })
        showModal('添加成功', `${res.title}添加成功`)
      } catch (res) {
        const err = res.data.data
        if (err) {
          showModal('添加失败', err.msg)
          return
        }
        showModal('添加失败', '没有获取到图书信息')
      }
    }
  },
  onShow () {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      return
    }
    this.userInfo = userInfo
  }
}
</script>
<style lang="scss" scoped>
@import 'static/css/val.scss';
.container {
  padding: 0 30rpx;
}
.userinfo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100rpx;
  margin-bottom: 50rpx;
  .head-img {
    height: 128rpx;
    width: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  .nick-name {
    line-height: 40rpx;
    height: 40rpx;
  }
}

.btn {
  background-color: $primary;
  color: $white;
  padding-left: 30rpx;
  padding-right: 30rpx;
  border-radius: 4rpx;
  font-size: 32rpx;
}
.out-btn {
  margin-top: 40rpx;
}
</style>