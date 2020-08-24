<template>
<a :href="detailUrl">
  <div class="book-card">
    <div class="thumb">
       <img @click.stop="preview"
            class="image" 
            :src="book.image" 
            mode="aspecFit" alt="">
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="right">
            {{book.rate}}
            <Rate :rate='book.rate'/>
        </div>
        <div class="left">{{book.title}}</div>
      </div>
      <div class="row">
        <div class="right text-primary">浏览数：{{book.count}}</div>
        <div class="left">{{book.author}}</div>
      </div>
      <div class="row">
        <div class="right">
            {{book.user_info.nickName}}
        </div>
        <div class="left">{{book.publisher}}</div>
      </div>
    </div>
  </div>
</a>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  components: {
    Rate
  },
  props: ['book'],
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.book.id}`
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book-card {
  padding: 10rpx;
  overflow: hidden;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  .thumb {
    width: 180rpx;
    height: 180rpx;
    margin: 0 auto;
    overflow: hidden;
    float: left;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    margin-left: 200rpx;
    .row {
      line-height: 40rpx;
      margin-bottom: 6rpx;
      .right {
        float: right;
      }
      .left {
        margin-right: 160rpx;
      }
    }
  }
}
</style>