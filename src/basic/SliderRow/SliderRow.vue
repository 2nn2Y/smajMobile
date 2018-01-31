<template>
  <div class="sliderRow"
       :style="sliderRowStyle"
       @touchmove="move"
       @touchend="end"
       @touchcancle="end"
       @touchstart="start">
    <div class="sliderRow-content" :style="sliderStyle">
      <slot></slot>
      <div class="sliderRow-btn"
           :style="btnWrapStyle">
        <span class="sliderRow-btn-item"
              @click="emitClick(btn.clickName)"
              :class="sliderBtnCla(btn)"
              :style="btnStyle"
              v-for="btn in btns">{{btn.text}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const BtnWidth = 100
  export default {
    name: 'sliderRow',
    props: {
      btns: {
        type: Array,
        default () {
          return [
            {
              text: '删除',
              type: 'danger',
              clickName: 'removeClick'
            }
          ]
        }
      },
      index: {
        type: Number,
        default: -1
      },
      disable: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '70'
      },
      autoHide: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        left: 0
      }
    },
    computed: {
      maxWidth () {
        return BtnWidth * this.btns.length + 50
      },
      defaultWidth () {
        return BtnWidth * this.btns.length
      },
      sliderStyle () {
        return `left:${this.left}px;`
      },
      btnStyle () {
        return `width:${BtnWidth}px;`
      },
      btnWrapStyle () {
        return `width:${this.maxWidth}px;height:${this.height}px;line-height: ${this.height}px;`
      },
      sliderRowStyle () {
        return `height:${this.height}px;`
      }
    },
    methods: {
      emitClick (name) {
        if (this.autoHide) {
          this.close()
        }
        this.$emit(name, this.index)
      },
      sliderBtnCla (btn) {
        return btn.type
      },
      start (e) {
        if (this.disable) return
        this.startX = this.__startX = e.touches[0].pageX
        this.isMove = false
      },
      end (e) {
        if (this.disable) return
        this.direction = (e.changedTouches[0].pageX - this.__startX) > 0 ? 'right' : 'left'
        if (this.direction === 'right' && this.isMove) {
          this.left = 0
        } else if (this.direction === 'left' && this.isMove) {
          this.left = -this.defaultWidth
        }
      },
      move (e) {
        if (this.disable) return
        let moveX = e.touches[0].pageX
        if (Math.abs(moveX - this.__startX) < 30) {
          return
        }
        this.isMove = true
        this.left += moveX - this.startX
        this.startX = e.touches[0].pageX
        if (this.left < -this.maxWidth) {
          this.left = -this.maxWidth
        }
        if (this.left > 0) {
          this.left = 0
        }
      },
      close () {
        this.left = 0
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .sliderRow
    position: relative

  .sliderRow-content
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    transition: left .3s ease

  .sliderRow-btn
    position: absolute
    left: 100%
    top: 0

  .sliderRow-btn-item
    display: inline-block
    text-align: center
    height: 100%
    font-weight: bold

  .danger
    color: #fff
    background: #ff4201

  .success
    color: #fff
    background: #20a0ff
</style>
