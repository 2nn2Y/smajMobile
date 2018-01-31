<template>
  <div class="yt-picker-scroller-component">
    <div class="yt-picker-scroller-mask" @touchstart.prevent="start" @touchmove.prevent="move"
         @touchend.prevent="end"></div>
    <div class="yt-picker-scroller-indicator"></div>
    <div class="yt-picker-scroller-content" :style="style">
      <div class="yt-picker-scroller-item " v-for="i in dateList">{{i.txt}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        activeItem: 0,
        itemLength: 0,
        activeItemValue: 0,
        curVal: '',
        style: {},
        Y: 0,
        t: 0.1,
        touchStartTime: 0,
        touchEndTime: 0,
        eY: 34 * 3,
        sY: 34 * 3,
        isMoving: false,
        itemHeight: 34,
        isR: false
      }
    },
    props: {
      dataList: {
        type: Array,
        default: []
      },
      defaultVal: [String, Number],
      type: {
        type: String,
        default: ''
      }
    },
    mounted () {
      if (this.defaultVal) {
        this.moveTo()
      } else {
        this.style = {
          transform: 'translate3d(0px, ' + this.sY + 'px, 0px)'
        }
      }
    },
    computed: {
      dateList () {
        let a = [];
        let txt = '';
        switch (this.type) {
          case 'year':
            txt = '年';
            break;
          case 'month':
            txt = '月';
            break;
          case 'day':
            txt = '日';
            break;
          case 'hour':
            txt = '时';
            break;
          case 'minute':
            txt = '分';
            break;
          default:
            txt = '年';
        }
        for (let i = this.dataList[0]; i <= this.dataList[1]; i++) {
          a.push({txt: i + txt, val: i})
        }
        this.itemLength = a.length
        if (this.type === 'day') {
          let end = (this.itemLength - 1) * -34 + 102;
          if (this.eY <= end) {
            this.Y = end;
            this.eY = end;
            this.activeItem = this.itemLength - 1;
          }
          this.style = {
            transform: 'translate3d(0px, ' + this.eY + 'px, 0px)',
            transition: 'all ease ' + this.t + 's'
          }
          this.curVal = a[this.activeItem]['val']
          this.$emit('changeCurVal', this.type, this.curVal)
        }
        return a
      }
    },
    methods: {
      start (e) {
        this.sY = e.touches[0].clientY;
        this.touchStartTime = e.timeStamp;
      },
      //初始化有值的时候滚动到某个地方
      moveTo () {
        this.dateList.map((i, k) => {
          if (i.val === this.defaultVal) {
            this.activeItem = k;
            this.activeItemValue = i.val;
          }
        });
        this.Y = 102 - (this.activeItem * 34);
        this.eY = 102 - (this.activeItem * 34);
        this.style = {
          transform: 'translate3d(0px, ' + this.Y + 'px, 0px)',
          transition: 'all ease ' + this.t + 's'
        }
      },
      move (e) {
        this.Y = this.eY + e.touches[0].clientY - this.sY;
//
        this.t = 0.1;
        this.style = {
          transform: 'translate3d(0px, ' + this.Y + 'px, 0px)',
          transition: 'all ease ' + this.t + 's'
        }
      },
      end (e) {
        let m = this.Y;
        let start = 102;
        let end = (this.itemLength - 1) * -34 + 102;
        this.eY = this.Y;
        this.touchEndTime = e.timeStamp - this.touchStartTime;
        this.t = 0.1;
        //没有移动
        if (this.sY === e.changedTouches[0].clientY) {
          return
        }
        /*
         * 在短时间移动比较大的距离的时候会滑动距离变大
         * */
        if ((this.touchEndTime < 220) && Math.abs(e.changedTouches[0].clientY - this.sY) > 100) {
          this.eY = this.eY + (e.changedTouches[0].clientY - this.sY) * this.touchEndTime / 100
          this.t = 25 / this.touchEndTime * 2;
        }
        ;
        //跳转对位
        if (Math.abs(this.eY % 34) <= 17) {
          this.eY = parseInt(this.eY / 34) * 34;
        } else {
          if (this.eY > 0) {
            this.eY = parseInt(this.eY / 34) * 34 + 34
          } else {
            this.eY = parseInt(this.eY / 34) * 34 - 34
          }
        }
        this.activeItem = Math.abs((this.eY - 102) / 34);
        //超出范围，滚回去
        if (this.eY > start) {
          this.Y = 102;
          this.eY = 102;
          this.activeItem = 0;
        }
        if (this.eY <= end) {
          this.Y = end;
          this.eY = end;
          this.activeItem = this.itemLength - 1;
        }
        this.style = {
          transform: 'translate3d(0px, ' + this.eY + 'px, 0px)',
          transition: 'all ease ' + this.t + 's'
        }
        this.curVal = this.dateList[this.activeItem]['val']
        this.$emit('changeCurVal', this.type, this.curVal)
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .yt-picker-scroller-component
    display block
    flex 1
    position relative
    overflow hidden
    width 100%

  .yt-picker-scroller-mask
    position absolute
    left 0
    top 0
    height 100%
    margin 0 auto
    width 100%
    z-index 3
    background-image linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
    background-position top, bottom
    background-size 100% 102px
    background-repeat no-repeat

  .yt-picker-scroller-content
    position absolute
    left 0
    top 0
    width 100%
    z-index -1

  .yt-picker-scroller-indicator
    width 100%
    height 34px
    position absolute
    left 0
    top 102px
    z-index 2
    background-image linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent)
    background-position top, bottom
    background-size 100% 1px
    background-repeat no-repeat

  .yt-picker-scroller-item
    text-align center
    font-size 18px
    height 34px
    line-height 34px
    color #000

</style>
