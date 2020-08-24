<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length > 0">我的评论</div>
    <div class="comment" @click="handleClick(comment)" v-for="comment in comments" :key="comment.id">
      <div class="user">
        <div class="inline">
          <img class="avatar" mode="aspectFit" :src="comment.image" alt />
          {{comment.title}}
          <div class="right">
            {{comment.location || "未知地点"}}
            <span class="text-primary">——</span>
            {{comment.phone || "未知型号"}}
          </div>
        </div>
        
      </div>
      <div class="content">
          {{comment.comment}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: `/pages/detail/main?id=${comment.bookId}`
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "static/css/val.scss";
    .comment-list{
        .comment{
            background-color: $white;
            padding:10rpx 20rpx;
            .content{
                padding: 20rpx 0;
                box-sizing: border-box;
            }
            .user{
              .avatar{
                  width: 40rpx;
                  height: 40rpx;
                  border-radius: 50%;
              }
              .right{
                height: 40rpx;
                line-height: 40rpx;
              }
            }
        }
        
    }
</style>