<template>
  <yt-page title="应急视频详情">
    <div class="wrap">
      <div class="inputWrap"><input type="text" v-model="key" class="yt-input input" placeholder="搜索..."><span class="btn">输入</span></div>
      <div class="contWrap yt-hide-scroll">
        <p class="yt-noInfo" v-if="list.length===0">暂无相关信息</p>
        <div class="item" v-for="item in list" @click="play(item)">
          <div class="info">
            <span>
              <img class="img" :src="item.SnapUrl">
              <p class="groupName">{{item.assetName}}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentVideoGroupsDetail, GetDeviceUrl} from '@/api'
  export default {
    name: 'yjspdetail',
    data () {
      return {
        key: '',
        AccidentEnterpriseVideoDetail: []
      }
    },
    computed: {
      list () {
        if (!this.key) {
          return this.AccidentEnterpriseVideoDetail
        } else {
          let results = []
          this.AccidentEnterpriseVideoDetail.forEach(item => {
            let reg = new RegExp(this.key)
            if (item.assetName.match(reg)) {
              results.push(item)
            }
          })
          return results
        }
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.params.id)
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.AccidentEnterpriseVideoDetail = []
        this.$module.loading.show()
        let res = await GetAccidentVideoGroupsDetail(id)
        this.$module.loading.hide()
        if (res.success) {
          this.AccidentEnterpriseVideoDetail = res.result
          this.id = id
          this.AccidentEnterpriseVideoDetail.forEach((item, index) => {
            GetDeviceUrl(item.id, item.assetParms)
              .then(res => {
                let obj = Object.assign({}, item, res)
                this.AccidentEnterpriseVideoDetail.splice(index, 1, obj)
              })
          })
        }
      },
      play (item) {
        this.$router.push({
          path: '/iframePlay',
          query: {
            src: item.url
          }
        })
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    display flex
    flex-direction column
    width 100%
    height 100%
    overflow hidden

  .inputWrap
    display: flex
    align-items: center
    text-align: center
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    width: 100%
    height: 55px
    line-height: 5px
    background-color: #e5e5e5

  .btn
    margin: 0 10px
    width: 50px
    height: 35px
    text-align: center
    color: #fff
    border-radius: 5px
    line-height: 35px
    background: #03a9f5

  .input
    flex: 1
    font-size: 15px
    padding-left: .66em
    margin-left: .66em
    border: 1px solid #20a0ff
    border-radius: .33em
    height: 60%

  .contWrap
    flex 1
    font-size 0
    background: #fff

  .noInfo
    border-bottom 1px solid #f1f1f1
    background-color: #fff
    color: #aaa
    line-height: 2em
    text-align: center
    font-size: 15px

  .item
    display inline-block
    position relative
    width 50%
    padding-top 40%
    overflow hidden

  .info
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display flex
    text-align center
    align-items center
    background-color #edf4f7

  .img
    display inline-block
    width 80%
    height 70%

  .groupName
    font-size 14px
    margin-top 12px
    color #333
</style>
