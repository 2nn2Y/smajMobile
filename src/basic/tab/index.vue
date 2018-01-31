<template>
  <yt-touch-ripple class="yt-tab-link"
                 :centerRipple="false"
                 :class="{'yt-tab-active': active}"
                 @click="tabClick">
    <div class="yt-tab-wrap" ref="tab">
      <slot></slot>
      <div class="yt-tab-text" v-if="title">{{title}}</div>
    </div>
  </yt-touch-ripple>
</template>

<script>
import {isNotNull} from '@/utils'
import {dispatch} from '@/mixins'
export default {
  componentName: 'Tab',
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  mixins: [dispatch],
  computed: {
    active () {
      return isNotNull(this.value) && this.$parent.value === this.value
    }
  },
  methods: {
    getTabWidth () {
      return this.$refs.tab.offsetWidth
    },
    tabClick (e) {
      this.dispatch('Tabs', 'Tab-Click', this.value)
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.yt-tab-link
  min-height 30px
  padding-top 2px
  padding-bottom 2px
  font-size 14px
  background none
  appearance none
  text-decoration none
  border none
  outline none
  color inherit
  position relative
  display flex
  flex-direction column
  justify-content center
  line-height normal
  align-items center
  transition all .45s ease
  cursor pointer

.yt-tab-active
  color #0086E5

.yt-tab-wrap
  padding 0 12px

.yt-tab-text
  line-height 16px

</style>
