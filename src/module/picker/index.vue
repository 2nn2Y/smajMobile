<template>
  <div class="yt-picker">
    <transition name="yt-fade">
      <div @click="hide" class="yt-picker-mask" v-if="showFlag"></div>
    </transition>
    <transition name="yt-slider-bottom">
      <div class="yt-picker-wrap" v-if="showFlag">
        <div class="yt-picker-header">
          <span @click="hide" class="yt-picker-btn">取消</span>
          <span @click="confim" class="yt-picker-btn" right>确认</span>
        </div>
        <div class="yt-picker-content" v-if="type === TYPE.DATE">
          <picker @changeCurVal="changeCurVal" :defaultVal="curYear" :dataList="year" type="year"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curMonth" :dataList="month" type="month"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curDay" :dataList="day" type="day"></picker>
        </div>
        <div class="yt-picker-content" v-if="type === TYPE.TIME">
          <picker @changeCurVal="changeCurVal" :defaultVal="curYear" :dataList="year" type="year"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curMonth" :dataList="month" type="month"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curDay" :dataList="day" type="day"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curHour" :dataList="hours" type="hour"></picker>
          <picker @changeCurVal="changeCurVal" :defaultVal="curMinute" :dataList="minutes" type="minute"></picker>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  import picker from './picker.vue'
  const TYPE = {
    DATE: 'date',
    TIME: 'time'
  }
  export default{
    name: 'yt-picker',
    mixins: [listerBack],
    data () {
      return {
        TYPE,
        year: [2000, 2050],
        month: [1, 12],
        day: [1, 31],
        hours: [0, 23],
        minutes: [0, 59],
        curYear: 2017,
        curMonth: 11,
        curDay: 4,
        curHour: 9,
        curMinute: 30,
        showFlag: false,
        type: TYPE.DATE
      }
    },
    methods: {
      show (options) {
        this.type = options.type || TYPE.DATE
        let date = options.cur ? Date.parse(options.cur) : Date.now()
        date = new Date(date)
        this.curYear = date.getFullYear()
        this.curMonth = date.getMonth() + 1
        this.curDay = date.getDate()
        this.curHour = date.getHours()
        this.curMinute = date.getMinutes()
        this.ok = options.ok
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      confim () {
        this.hide()
        if (this.ok) {
          let date = Date.parse(`${this.curYear}-${this.curMonth}-${this.curDay} ${this.curHour}:${this.curMinute}`)
          this.ok(new Date(date))
        }
      },
      changeDataList () {
        let c2 = this.curMonth === 2
        let c1 = [1, 3, 5, 7, 8, 10, 12].join().indexOf(this.curMonth)
        if (c2) {
          if (this.isR) {
            this.day = [1, 29]
          } else {
            this.day = [1, 28]
          }
        } else if (c1 < 0) {
          this.day = [1, 30]
        } else {
          this.day = [1, 31]
        }
      },
      changeCurVal (type, val) {
        if (type === 'year') {
          this.curYear = val
          this.changeDataList()
        }
        if (type === 'day') {
          this.curDay = val
        }
        if (type === 'month') {
          this.curMonth = val
          this.changeDataList()
        }
        if (type === 'hour') {
          this.curHour = val
        }
        if (type === 'minute') {
          this.curMinute = val
        }
      }
    },
    components: {
      picker
    }
  }
</script>
<style type="text/stylus" type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-picker
    position fixed
    top 0
    left 0
    width 0
    height 0
    z-index 6000

  .yt-picker-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.5)
    transition all .3s ease

  .yt-picker-wrap
    display flex
    flex-direction column
    position fixed
    bottom 0
    left 0
    width 100%
    height 284px
    background-color #ffffff
    transition all .3s ease

  .yt-picker-header
    width 100%
    height 45px
    background-color #ffffff
    display flex
    justify-content space-between
    border-bottom 1px solid #ddd

  .yt-picker-btn
    width 60px
    height 45px
    line-height 45px
    color #666666
    text-align center
    font-size 16px
    &[right]
      color #0086e5

  .yt-picker-content
    flex 1
    display flex
    overflow hidden
</style>
