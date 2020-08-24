<template>
  <div class="book-detail">
    <div class="thumb">
      <img class="back" mode="aspectFill" :src="info.image" alt />
      <img class="img" mode="aspectFit" :src="info.image" alt />
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img class="avatar" :src="userInfo.avatarUrl" mode="aspectFit" alt />
      {{userInfo.nickName}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :rate="info.rate" />
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right text-primary">{{info.price}}</div>
    </div>
    <div class="detail">
      <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
      <div class="summary">
        <p v-for="(sum, index) in info.summary" :key="index">{{sum}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    userInfo () {
      return this.info.user_info || {}
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'static/css/val.scss';
.book-detail {
  font-size: 28rpx;
  .thumb {
    position: relative;
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    .back {
      width: 100%;
      filter: blur(30rpx);
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: $black;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 40rpx;
      }
      .author {
        font-size: 28rpx;
      }
    }
  }
  .detail {
    padding: 10rpx 20rpx;
    .avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .badge {
    display: inline-block;
    margin: 10rpx;
    border-radius: 20rpx;
    border: 1px solid $primary;
    color: $primary;
    padding: 8rpx 10rpx;
    box-sizing: border-box;
  }
  .summary {
    padding: 0 30rpx;
    margin-top: 10rpx;
    p {
      text-indent: 2em;
      font-size: 28rpx;
      line-height: 50rpx;
    }
  }
}
</style>