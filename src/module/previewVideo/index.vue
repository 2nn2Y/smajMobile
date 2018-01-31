<template>
  <transition name="yt-slider-right-all">
    <div class="video-page" v-show="showFlag">
      <yt-navbar @click-left="close" :disableLeft="true" bgc="transparent" :title="barTitle"></yt-navbar>
      <yt-video-group v-model="current">
        <yt-carousel :data="list" v-model="current">
          <yt-video slot-scope="props" :name="props.index" :data="props.data"></yt-video>
        </yt-carousel>
      </yt-video-group>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {listerBack} from '@/mixins'
  export default {
    name: 'previewVideo',
    mixins: [listerBack],
    computed: {
      barTitle () {
        return `${this.current + 1} / ${this.list.length}`
      }
    },
    data() {
      return {
        list: [],
        current: 0,
        showFlag: false
      }
    },
    methods: {
      show ({list, current}) {
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

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .video-page
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background #000000
    transition all .2s ease
</style>
