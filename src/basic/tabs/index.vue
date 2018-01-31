<template>
  <div class="yt-tabs">
    <div class="yt-tab-head" v-bind="{'unflex': unflex}" v-if="pos === 'top'" ref="scroll">
      <slot></slot>
      <span class="yt-tab-head-highlight" ref="highlight"></span>
    </div>
    <div class="yt-tab-body">
      <div class="yt-tab-body-item"
           :class="_getPos(index)"
           @touchstart="_start($event, index)"
           @touchmove="_move"
           @touchend="_end"
           @touchcancel="_end"
           @webkitTransitionEnd.self="_transitionEnd(index)"
           @transitionEnd.self="_transitionEnd(index)"
           :pageIndex="index"
           v-for="(tab, index) in tabList"
           ref="tabPage">
        <transition name="yt-tab-fade">
          <yt-loading class="yt-tab-mask" v-show="tab._showMask"></yt-loading>
        </transition>
        <div class="yt-tab-body-item" v-if="tab._isFirst">
          <slot :name="tab._value">
          </slot>
        </div>
      </div>
    </div>
    <div class="yt-tab-head" v-if="pos === 'bottom'">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const TAB_NAME = 'Tab'
  const LEFTCLASS = 'yt-tab-body-item-left'
  const RIGHTLASS = 'yt-tab-body-item-right'
  const LINECOLOR = '#0086E5'
  const TRANSITION = 'transition: all .3s ease'
  const DIRECTION = {
    DIRECTION_LEFT: 'left',
    DIRECTION_RIGHT: 'right'
  }
  const ELASTICLEN = 150
  export default {
    componentName: 'Tabs',
    props: {
      pos: {
        type: String,
        default: 'top'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      lineColor: {
        type: String,
        default: LINECOLOR
      },
      disableSlider: {
        type: Boolean,
        default: false
      },
      scaleX: {
        type: Number,
        default: 0.3
      },
      loading: {
        type: Boolean,
        default: false
      },
      unflex: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      curIndex () {
        for (let i = 0; i < this.tabList.length; i++) {
          let item = this.tabList[i]
          if (item._value === this.value) {
           return i
          }
        }
      }
    },
    data () {
      return {
        tabList: [],
        curTab: {},
        nextTab: {}
      }
    },
    methods: {
      // tab子组件调用 设置当前值
      HandleTabClick (value) {
        if (value === this.value) return
        this.nextTab = this._getTab(value)
        this._judgeFirstEnter(this.nextTab)
        this.$refs.tabPage[this.nextTab._index].setAttribute('style', TRANSITION)
        this.$refs.tabPage[this.curTab._index].setAttribute('style', TRANSITION)
        this._setLineStyle(this.curTab, this.nextTab)
        this.$emit('input', value)
        this.$emit('change', value)
        this.curTab = this.nextTab
      },

      stopLoading (value) {
        if (value === undefined || value === null) {
          return
        }
        for (let i = 0; i < this.tabList.length; i++) {
          if (this.tabList[i]._value === value) {
            this.tabList[i]._showMask = false
            break
          }
        }
      },

      // 重新获取tabList
      refresh () {
        this.$nextTick(() => {
          let res = []
          this.$children.forEach((child, index) => {
            if (child.$options.componentName === TAB_NAME) {
              res.push({
                _index: index,
                _value: child.value,
                _isFirst: false,
                _showMask: false,
                _width: child.getTabWidth()
              })
            }
          })
          this.tabList = [].concat(res)
          if (this.tabList.length) {
            this.curTab = this._getTab(this.value)
            this._judgeFirstEnter(this.curTab)
            this._setLineStyle(this.curTab)
          }
        })
      },

      _start (e, index) {
        if (this.disableSlider) return
        this.curTab = this.tabList[index]
        this._startX = e.touches[0].clientX
        this._startY = e.touches[0].clientY
        this._isMove = false
        this._Intent = true
        this._judgeIntent = true
      },

      _move (e) {
        if (!this._Intent) return
        if (this.disableSlider) return
        let deltyX = e.touches[0].clientX - this._startX
        let deltyY = e.touches[0].clientY - this._startY
        if (this._judgeIntent && Math.abs(deltyY) > Math.abs(deltyX)) {
          this._Intent = false
          this._judgeIntent = false
          return
        }
        if (Math.abs(deltyX) < 30) return
        let nextPage = null
        let direction = deltyX > 0 ? DIRECTION.DIRECTION_RIGHT : DIRECTION.DIRECTION_LEFT
        switch (direction) {
          case DIRECTION.DIRECTION_LEFT:
            nextPage = this.curTab._index + 1
            break
          case DIRECTION.DIRECTION_RIGHT:
            nextPage = this.curTab._index - 1
            break
          default:
            break
        }
        if (nextPage < 0 || nextPage >= this.tabList.length) return
        e.stopPropagation()
        this._isMove = true
        this.nextTab = this.tabList[nextPage]
        if (this.loading && !this.nextTab._isFirst) {
          this.nextTab._showMask = true
        }
        this._setMoveStyle(deltyX)
      },

      _end (e) {
        if (this.disableSlider || !this._isMove) return
        e.stopPropagation()
        let deltyX = e.changedTouches[0].clientX - this._startX
        if (Math.abs(deltyX) < ELASTICLEN) {
          this._setMoveStyle(0, true)
        } else {
          this.HandleTabClick(this.nextTab._value)
        }
        this._startX = null
        this._isMove = false
        this._Intent = true
        this._judgeIntent = true
      },

      _setMoveStyle (deltyX, isTransition) {
        let transition = isTransition ? TRANSITION : ''
        let el = this.$refs.tabPage[this.curTab._index]
        let nextEl = this.$refs.tabPage[this.nextTab._index]
        let proportion = (deltyX / el.offsetWidth) * 100
        el.setAttribute('style', `transform: translate3d(${proportion}%, 0, 0); ${transition}`)
        nextEl.setAttribute('style', `transform: translate3d(${proportion}%, 0, 0); ${transition}`)
        this._setMoveLineStyle(proportion)
      },

      _setMoveLineStyle (proportion) {
        let lineEl = this.$refs.highlight
        if (lineEl) {
          let len = this.tabList.length
          let width = null
          let result = `scaleX(${this.scaleX});background-color:${this.lineColor}`
          if (!this.unflex) {
            width = len > 0 ? (100 / len).toFixed(4) + '%' : '100%'
            result = `width: ${width};transform: translate3d(${this.curTab._index * 100 - proportion}%, 0, 0) ${result}`
          } else {
            width = this.curTab._width + 'px'
            let tranX = proportion / 100 * this.curTab._width
            result = `width: ${width};transform: translate3d(${this._getTranX(this.curTab) - tranX}px, 0, 0) ${result}`
          }
          lineEl.setAttribute('style', result)
        }
      },

      _getTranX(next) {
        if (!this.tabList || this.tabList.length === 0) {
          return 0
        }
        let list = this.tabList.filter((item, index) => {
          return index < next._index
        })
        if (list.length > 0) {
          return list.map(item => {
            return item._width
          }).reduce((a, b) => {
            return a + b
          })
        } else {
          return 0
        }
      },

      _getTab(value) {
        if (value === null || !this.tabList || this.tabList.length === 0) {
          return {}
        }
        for (let i = 0; i < this.tabList.length; i++) {
          if (this.tabList[i]._value === value) {
            return this.tabList[i]
          }
        }
      },

      _setLineStyle (cur, next) {
        let lineEl = this.$refs.highlight
        let result = `scaleX(${this.scaleX});background-color:${this.lineColor}`
        if (!lineEl || !cur) {
          return
        }
        let width = null
        let transX = null
        let len = this.tabList.length
        if (!next) {
          if (!this.unflex) {
            width = len > 0 ? (100 / len).toFixed(4) + '%' : '100%'
            transX = cur._index * 100 + '%'
          } else {
            width = cur._width + 'px'
            transX = this._getTranX(cur) + 'px'
          }
          result = `width: ${width};transform: translate3d(${transX}, 0, 0) ${result}`
        } else {
          if (!this.unflex) {
            width = len > 0 ? (100 / len).toFixed(4) + '%' : '100%'
            transX = next._index * 100 + '%'
          } else {
            width = next._width + 'px'
            transX = this._getTranX(next) + 'px'
          }
          result = `width: ${width};transform: translate3d(${transX}, 0, 0) ${result}`
        }
        lineEl.setAttribute('style', result)
      },

      _judgeFirstEnter(tab) {
        if (!tab._isFirst) {
          this.$emit('active', tab._value)
          tab._isFirst = true
          if (this.loading) {
            tab._showMask = true
          }
        }
      },

      _getPos(index) {
        if (index > this.curIndex) return RIGHTLASS
        if (index < this.curIndex) return LEFTCLASS
        return ''
      },

      _transitionEnd(index) {
        this.$refs.tabPage[index].setAttribute('style', '')
      }
    },
    created () {
      this.$on('Tab-Click', this.HandleTabClick)
      this.refresh()
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">

  .yt-tabs
    position relative
    display flex
    flex-direction column
    width 100%
    height 100%
    overflow hidden

  .yt-tab-head
    position relative
    min-height 40px
    box-sizing border-box
    display flex
    text-align center
    align-items center
    justify-content center
    border-top 1px solid #dfe6ec
    border-bottom 1px solid #dfe6ec
    .yt-tab-link
      flex 1
    &[unflex=true]
      height 40px
      overflow-x auto
      overflow-y hidden
      white-space nowrap
      display flex
      align-items center
      justify-content flex-start
      border none
      &::-webkit-scrollbar
        width 100%
        height 1px
        border 0
        background-color #f5f5f5
      &::-webkit-scrollbar-thumb
        display none
      .yt-tab-link
        flex none
        font-size 12px

    &-highlight
      position absolute
      left 0
      bottom 0
      z-index 100
      height 4px
      border-radius 2px
      transition transform .3s cubic-bezier(.13, .82, .21, 1.08)
      backface-visibility hidden

  .yt-tab-body
    flex 1
    position relative
    overflow hidden
    &-item
      position absolute
      top 0
      left 0
      width 100%
      bottom 0
      &-right
        left 100%
      &-left
        left -100%

  .yt-tab-mask
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 1000
    background #fff
    transition opacity .3s ease-in

  .yt-tab-fade-leave-active
    opacity 0
</style>
