<template>
  <div>
    <TopSwiper :tops="tops" />
    <Card v-for="book in books" :key="book.id" :book="book" />
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
import config from '@/config'
import {get} from '@/utils'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      size: 4,
      more: true,
      tops: []
    }
  },
  methods: {
    async getList (init) {
      // 初始化页面
      if (init) {
        this.page = 0
        this.more = true
      }

      wx.showNavigationBarLoading()
      const result = await get(config.bookList, {
        page: this.page,
        size: this.size
      })
      const books = result.list

      // 判断数据是否还有数据
      if (books.length < this.size && this.page > 0) {
        this.more = false
      }

      if (init) {
        this.books = books
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get(config.top)
      this.tops = tops.list
    }
  },
  onShow () {
    this.getList(true)
    this.getTop()
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  // 触底加载
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getList()
  }
}
</script>
