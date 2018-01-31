<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .imgPreview
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 9000
    background-color #000000
    transition all .2s ease
    &-top
      position absolute
      top 0
      left 0
      width 100%
      height 40px
      color #ffffff
    &-img
      position absolute
      top 50%
      left 0
      width 100%
      transform translate3d(0, -50%, 0)

</style>

<template>
  <transition name="yt-slider-right-all">
    <div class="imgPreview" v-show="showFlag">
      <yt-navbar :disableLeft="true" @click-left="close" bgc="transparent" :title="title"></yt-navbar>
      <yt-carousel :data="list" v-model="current" ref="carousel">
        <img slot-scope="props" class="imgPreview-img" :src="props.data">
      </yt-carousel>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  export default {
    name: 'imgPreview',
    mixins: [listerBack],
    computed: {
      title () {
        return `${this.current + 1} / ${this.list.length}`
      }
    },
    data () {
      return {
        list: [],
        current: 0,
        showFlag: false
      }
    },
    methods: {
      show ({list = [], current = 0}) {
        this.showFlag = true
        this.list = list
        this.current = current
      },
      close () {
        this.showFlag = false
      }
    }
  }
</script>
