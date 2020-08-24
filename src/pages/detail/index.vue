<template>
  <div class="book-detail">
    <BookInfo :info="info" />
    <CommentList :comments="comments" />
    <div class="comment" v-if="showAdd">
      <textarea class="textarea" v-model="comment" maxlength="100" placeholder="请输入书评"></textarea>
      <div class="location">
        地理位置：
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span>{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color="#EA5A49" :checked="phone" @change="getPhone">
          <span>{{phone}}</span>
        </switch>
      </div>
      <button class="btn submit-btn" @click="addComment">提交书评</button>
    </div>
    <div v-else class="tip-msg">未登录或已经评论过了</div>
  </div>
</template>
<script>
import config from '@/config'
import {get, post, showModal} from '@/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      bookId: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      userInfo: {},
      comments: []
    }
  },
  computed: {

    showAdd () {
      // 未登录
      if (!this.userInfo.openId) {
        return false
      }
      // 已评论过
      if (this.comments.filter(v => v.openId === this.userInfo.openId).length) {
        return false
      }
      return true
    }
  },

  methods: {
    async getDetail () {
      const info = await get(config.bookDetail, {
        id: this.bookId
      })
      this.info = info
      wx.setNavigationBarTitle({
        title: info.title
      })
    },
    async getGeo (e) {
      // xvpDSQW2C6Lc924Hd0a2qawlxu4ETPTE
      const AK = 'xvpDSQW2C6Lc924Hd0a2qawlxu4ETPTE'
      let url = 'http://api.map.baidu.com/reverse_geocoding/v3'

      if (e.target.value) {
        const geo = await wx.getLocation()
        wx.request({
          url,
          data: {
            location: `${geo.latitude},${geo.longitude}`,
            output: `json`,
            ak: AK
          },
          success: res => {
            if (res.data.status === 0) {
              this.location = res.data.result.addressComponent.city
            } else {
              this.location = '未知地点'
            }
          }
        })
      } else {
        this.location = ''
      }
    },
    async getPhone (e) {
      if (e.target.value) {
        const phoneInfo = await wx.getSystemInfo()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    async getComments () {
      const comments = await get(config.commentList, {bookId: this.bookId})
      this.comments = comments.list || []
    },
    addComment () {
      if (!this.comment) {
        return
      }
      // 评论内容 手机型号 地理位置 图书id 用户的openid
      const data = {
        openId: this.userInfo.openId,
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookId: this.bookId
      }
      try {
        post(config.addComment, data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('发表书评失败', e.msg)
      }
    }
  },
  onLoad () {
    this.bookId = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: this.info.title,
      path: `/pages/detail/main?id:${this.bookId}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import "static/css/val.scss";
.comment {
  margin-top: 20rpx;
  padding: 0rpx 40rpx;
  font-size: 28rpx;
  .textarea {
    width: 100%;
    height: 200rpx;
    background-color: $ashen;
    padding: 20rpx;
    border: 1px solid $primary;
    border-radius: 10rpx;
    box-sizing: border-box;
  }
  .location,
  .phone {
    margin-top: 20rpx;
  }
  .submit-btn {
    color: $white;
    background-color: $primary;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
  }
}
.tip-msg {
  color:$primary;
  text-align: center;
  margin:0 20rpx;
  height: 40rpx;
  line-height: 40rpx;
}
</style>