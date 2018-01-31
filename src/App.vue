<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    computed: mapGetters({
      user: 'getUser'
    }),
    data () {
      return {
        transitionName: 'slider-left'
      }
    },
    created () {
      this.$backbutton._lister('clickBack', () => {
        this.$router.go(-1)
        return true
      })
    },
    watch: {
//      'loginSuccess' () {
//        if (this.loginSuccess) {
//          window.init({
//            userName: this.user.userName,
//            id: this.user.id
//          })
//        }
//      },
      '$route' (to, from) {
        this.transitionName = to.meta.index >= from.meta.index ? 'yt-slider-right' : 'yt-slider-left'
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "./stylus/index.styl"
  html, body
    width: 100%
    height: 100%
    font-size: 10px

  #app
    position: relative
    overflow: hidden
    font-size: 0
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    height: 100%

</style>
