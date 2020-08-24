<template>
    <div>
        <div class="swiper">
            <swiper indicator-dots="true"
                    indicator-color="EA5A49"
                    auto-play="true"
                    interval="6000"
                    duration="1000"
                    cicular="true"
            >
                <div v-for="(top, imgIndex) in imgUrls" :key="imgIndex"
                >
                    <swiper-item >
                        <img 
                            @click="bookDetail(img)"
                            v-for="img in top" :key="img.id"
                            class="slider-image" 
                            :src="img.image" 
                            mode="aspecFit" alt="">
                    </swiper-item>
                </div>
            </swiper>
        </div>
    </div>
</template>
<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      return this.chunk(this.tops, 3)
    }
  },
  methods: {
    // 跳转值图书详情页
    bookDetail (item) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${item.id}`
      })
    },
    // 数组分组化
    chunk (arr, size = 1) {
      if (!arr || !Array.isArray(arr) || !arr.length) {
        return []
      }
      const result = []
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
    .swiper{
        margin-top: 10rpx;
        
        .slider-image{
            width:33%;
            height: 100%;
            padding:10rpx; 
            box-sizing: border-box;
        }
    }
</style>