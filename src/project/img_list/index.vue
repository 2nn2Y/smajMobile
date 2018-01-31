<template>
  <div class="file" @touchstart="_start" @touchend="_end" @touchmove="_end">
    <div class="img-wrap" v-for="(img, index) in imgList">
      <img @click.stop="handlerPreview(index)" class="img-wrap-img" :src="img.path">
      <img @click.stop="handlerRemove(img, index)" v-if="!disable && IsLongTap" class="img-wrap-img-remove"
           :src="`${require('@/img/remove.png')}`">
    </div>
    <div v-if="!disable" class="img-wrap" @click="handlerCamera">
      <div class="img-wrap-btn">
        <img class="img-wrap-camera" :src="`${require('@/img/camera2.png')}`">
        <p class="img-wrap-text">照片/视频</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {ISDEV} from '@/config'
  export default {
    name: 'imgList',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        imgList: [],
        IsLongTap: false,
        addList: []
      }
    },
    activated () {
      this.IsLongTap = false
    },
    methods: {
      _start () {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.IsLongTap = true
        }, 800)
      },
      _end () {
        if (this.timeout) {
          clearTimeout(this.timeout)
          return
        }
        setTimeout(() => {
          this.IsLongTap = false
        }, 10000)
      },
      handlerPreview (index) {
        if (ISDEV) {
          this.$module.previewImg.show({
            current: index,
            list: this.imgList.map(item => {
              return item.path
            })
          })
          return
        }
        WebViewJavascriptBridge.callHandler('previewImg', {
          cur: index,
          list: this.imgList.map(item => {
            return item.path
          })
        })
      },
      handlerRemove (img, index) {
        if (img.id > 0) {
          this.$emit('remove', img.id)
        } else {
          let index = this.addList.indexOf(img)
          if (index !== -1) {
            this.addList.splice(index, 1)
            this.$emit('add', this.addList)
          }
        }
        this.imgList.splice(index, 1)
      },
      getImgList () {
        return this.imgList
      },
      handlerCamera () {
        if (ISDEV) return
        WebViewJavascriptBridge.callHandler('cameraPic', null, (data) => {
          Object.assign(data, {id: 0})
          data = JSON.parse(data)
          this.imgList.push(data)
          this.addList.push(data)
          this.$emit('add', this.addList)
        })
      }
    },
    watch: {
      'data' () {
        this.addList = []
        this.imgList = this.data
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .file
    font-size 0
    padding 0 5px

  .img-wrap
    position relative
    display inline-block
    width 33.33%
    padding-bottom 33.33%
    height 0
    vertical-align middle
    overflow hidden
    &-btn
      position absolute
      top 5px
      left 5px
      right 5px
      bottom 5px
      box-sizing border-box
      display flex
      vertical-align middle
      flex-direction column
      align-items center
      justify-content center
      background-color #f9f9f9
    &-img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      padding 5px
      box-sizing border-box
      &-remove
        position absolute
        right 5px
        top 5px
        width 20px
        height 20px
        border-bottom-left-radius 5px
        background-color #101010
    &-camera
      width 40px
    &-text
      margin-top 10px
      letter-spacing 2px
      color rgb(204, 204, 204)
      font-size 12px
</style>
