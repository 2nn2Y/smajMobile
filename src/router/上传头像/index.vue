<template>
  <yt-page title="上传头像" class="upload">
    <div class="avatar iconfont icon-zhuanjiaku"
         @click="toggle">
      <img class="avatar-img"
           v-if="src.length>0"
           :src="src">
    </div>
    <div class="submit"
         @click="submitAvatar">
      提交
    </div>
    <transition name="yt-fade" slot="alert">
      <div class="mask"
           @click="toggle"
           v-if="show">
      </div>
    </transition>
    <transition name="yt-slider-bottom" slot="alert">
      <div class="wrap"
           v-if="show">
        <div class="btn default camera border-1px"
             @click="camera">拍照
        </div>
        <div class="btn default Album"
             @click="Album">从相册选择
        </div>
        <div class="btn default cancel"
             @click="toggle">取消
        </div>
      </div>
    </transition>
    <transition name="yt-fade">
      <div class="cut" v-if="cut">
        <span class="exit" @click="exit">取消</span>
        <span class="save" @click="save">保存</span>
        <vCropper :img="img" ref="cropper"></vCropper>
      </div>
    </transition>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {EditUserPic} from '@/api'
  import {mapGetters} from 'vuex'
  import VueCropper from 'vue-cropper'
  export default {
    name: 'uploadAvatar',
    computed: mapGetters({
      user: 'getUser'
    }),
    components: {
      'vCropper': VueCropper
    },
    data () {
      return {
        show: false,
        cut: false,
        img: '',
        src: ''
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      camera () {
        let self = this
        this.plus.camera({
          success (path) {
            self.toggle()
            self.img = path
            self.startCropper()
          }
        })
      },
      startCropper () {
        this.cut = true
        this.$nextTick(() => {
          this.$refs.cropper.startCrop()
        })
      },
      Album () {
        let self = this
        this.plus.album({
          success (path) {
            self.toggle()
            self.img = path
            self.startCropper()
          }
        })
      },
      exit () {
        this.cut = true
      },
      save () {
        let self = this
        this.$refs.cropper.getCropData((path) => {
          self.cut = false
          self.src = path
        })
      },
      async submitAvatar () {
        if (this.src.length === 0) {
          this.$module.toast.show({msg: '请先选择图片!'})
          return
        }
        let res = await EditUserPic({
          userId: this.user.id,
          userPic: this.src
        })
        if (res.success) {
          this.$module.toast.show({msg: '上传成功!', type: 'success'})
        }
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .upload
    text-align: center

  .avatar
    position: relative
    margin: 3rem auto
    width: 20rem
    height: 20rem
    line-height: 20rem
    font-size: 8rem
    border-radius: 50%
    color: #fff
    background: #faa35c
    &-img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

  .submit
    display: inline-block
    font-size: 1em
    line-height: 3rem
    padding: 0 2.6rem
    border-radius: 1.5rem
    font-weight: bold
    color: #fff
    background: #03a9f5

  .mask
    position absolute
    bottom 0
    left 0
    right 0
    top 0
    z-index 1000
    background-color rgba(0, 0, 0, 0.5)
    transition all .3s ease

  .wrap
    position: absolute
    bottom: 0
    left: 0
    right: 0
    line-height: 4rem
    z-index 1000
    transition: all .3s ease

  .btn
    margin: 0 10px
    text-align: center
    border-radius: 5px
    &:active
      background: #f2f4f6

  .default
    color: #666
    background: #fff

  .camera
    border-bottom 1px solid #f1f1f1
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

  .Album
    border-top-left-radius: 0
    border-top-right-radius: 0

  .cancel
    margin: 1rem
    font-size: 1.7rem
    font-weight: bold

  .img
    width: 200px
    height: 200px

  .cut
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    transition: all .3s ease

  .exit, .save
    position: absolute
    z-index: 10
    top: 10px
    width: 50px
    height: 50px
    line-height: 50px
    border-radius: 50%
    background: #fff

  .exit
    left: 10px

  .save
    right: 10px

</style>
