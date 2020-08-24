<template>
  <div class="container">
    <Commentlist v-if="userInfo.openId" type="user" :comments="comments" />
    <div v-if="userInfo.openId">
        <div class="page-title">我的图书</div>
        <Card v-for="book in books" :key="book.id" :book="book"/>
         <div v-if="books.length === 0" class="tip-msg">暂时还没添加图书，快去添加几本吧</div>
    </div>
   

  </div>
</template>
<script>
import config from '@/config'
import {get} from '@/utils'
import Commentlist from '@/components/CommentList'
import Card from '@/components/Card'
export default {
  components: {
    Commentlist,
    Card
  },
  data () {
    return {
      comments: [],
      userInfo: {},
      books: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      const result = await get(config.bookList, {
        openId: this.userInfo.openId
      })
      this.books = result.list
    },
    async getComments () {
      const result = await get(config.commentList, {
        openId: this.userInfo.openId
      })
      this.comments = result.list
    }
  },
  onShow () {
    if (!this.userInfo.openId) {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  }

}
</script>
<style lang="scss" scoped>
@import "static/css/val.scss";
  .tip-msg{
    color:$primary;
    text-align: center;
    font-size: 28rpx;
    margin-top: 20rpx;
  }
</style>