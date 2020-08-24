<template>
  <div class="progress-bar">
    <progress :percent="percent" activeColor="#EA5A49"></progress>
    <p>{{year}}已经过去了{{day}}天,{{percent}}%</p>
  </div>
</template>
<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      const start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.day * 100 / this.getDayOfYear()).toFixed(2)
    }
  },
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 400 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear ? 366 : 365
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  text-align: center;
  
  progress {
    margin-bottom: 20rpx;
  }
}
</style>
