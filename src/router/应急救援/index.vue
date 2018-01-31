<template>
  <yt-page class="wrap" title="应急救援">
    <img class="right-icon"
         :src="'./static/img/close2.png'"
         @click="closeEmergencyRescue"
         slot="right"/>
    <div class="yt-scroll">
      <yt-emergency-row @click="handlerClick" v-for="(item,index) in list" key="index" :data="item"></yt-emergency-row>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAccidentFile, EndRescues} from '@/api'
  import {API_PREFIX} from '@/config'
  export default {
    name: 'yjjy',
    computed: {
      list () {
        let img
        let flag
        if (!this.AccidentFileSrc) {
          img = './static/img/yjfa-h.png'
          flag = false
        } else {
          img = './static/img/yjfa.png'
          flag = true
        }
        return [
          {
            title: '事故简况',
            options: [
              {
                name: '事故简况',
                path: '/sgjk?isStart=true',
                img: './static/img/sgjk.png'
              },
              {
                name: '企业信息',
                path: '/qyxx/detail/',
                img: './static/img/qyxx.png'
              },
              {
                name: '应急视频',
                path: '/yjsp',
                img: './static/img/yjsp.png'
              },
              {
                name: '传感器信息',
                path: '/cgqxx',
                img: './static/img/cgqxx.png'
              }
            ]
          },
          {
            title: '应急保障',
            options: [
              {
                name: '应急指挥部',
                path: '/yjzhb',
                img: './static/img/yjzhb.png'
              },
              {
                name: '应急队伍',
                path: '/yjdw',
                img: './static/img/yjdw.png'
              },
              {
                name: '应急专家',
                path: '/yjzj',
                img: './static/img/yjzj.png'
              },
              {
                name: '应急物资',
                path: '/yjwz',
                img: './static/img/yjwz.png'
              },
              {
                name: '避难场所',
                path: '/bncs',
                img: './static/img/bncs.png'
              }
            ]
          },
          {
            title: '应急方案',
            options: [
              {
                name: '应急方案',
                path: '/pdfyl',
                img: img,
                flag: flag,
                url: this.AccidentFileSrc
              }
            ]
          }
        ]
      }
    },
    data () {
      return {
        id: null,
        AccidentFileSrc: ''
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.query.AccidentId)
    },
    methods: {
      handlerClick (option) {
        let query = this.$router.currentRoute.query
        let path = option.path
        if (option.name === '企业信息') {
          path += query.enterpriseId
          this.$router.push({path: path})
          return
        }
        if (option.name === '应急方案' && !option.flag) {
          this.$module.toast.show({msg: '应急方案未生成!!'})
          return
        }
        if (option.name === '应急方案' && option.flag) {
          WebViewJavascriptBridge.callHandler('previewPdf', {
            title: '应急方案',
            url: option.url.replace('218.92.104.102', API_PREFIX),
            fileName: '应急方案.pdf'
          })
          return
        }
        this.$router.push({
          path: path,
          query: query
        })
      },
      async fetchData (id) {
        if (id === this.id) return
        this.AccidentFileSrc = await GetAccidentFile(id)
        this.id = id
      },
      closeEmergencyRescue () {
        let query = this.$router.currentRoute.query
        let confim = async () => {
          this.$module.loading.show()
          let res = await EndRescues(query)
          this.$module.loading.hide()
          if (res.success) {
            this.$module.toast.show({msg: '关闭成功！', type: 'success'})
            this.$router.go(-1)
          } else {
            this.$module.toast.show({msg: res.error.message})
          }
        }
        this.$module.confim.show({desc: '您确定要关闭此次救援活动吗？', confim})
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    background: #efeff4

  .right-icon
    margin-top: 7px
    width: 25px
    height: 25px

</style>
