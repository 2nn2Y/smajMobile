<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 6000
    background-color #fff
    transition all .3s ease

  .container
    position fixed
    top 66px
    left 0
    bottom 0
    right 0


  .row, .col
    position: relative
    padding: 0 20px
    font-size: 14px
    line-height: 2.6em
    color: #333
    border-bottom: 1px solid #f1f2f3
    &:active
      background-color: #f1f2f3

    &-active
      color: #03a9f5

  .select-icon
    position: absolute
    right: 10px
    top: 10px
    width: 20px
    height: 20px

  .list-btn, .list-btn2
    position: fixed
    bottom: 20px
    right: 20px
    display: inline-block
    text-align: center
    width: 45px
    height: 45px
    border-radius: 50%
    background: rgba(0, 0, 0, 0.5)

  .list-btn2
    bottom: 80px

  .list-icon
    margin-top: 7px
    width: 30px
    height: 30px

  .list-corner
    position: absolute
    right: -2px
    top: -5px
    font-size: 10px
    color: #fff
    font-weight: bold
    width: 18px
    height: 18px
    line-height: 18px
    border-radius: 50%
    background: red

  .col
    display: flex
    align-items: center
    padding: 0 0 0 20px

  .upload, .remove
    margin: 0 5px
    padding: 0 5px
    height: 25px
    line-height: 25px
    color: #fff
    font-size: 13px
    text-align: center
    border-radius: 5px
    background: #03a9f5

  .remove
    background: #dd4843

  .text
    flex: 1

  .inputWrap
    display: flex
    align-items: center
    border-bottom: 1px solid #eee
    background-color: #f1f2f3

  .inputWrap-input
    flex: 6
    height: 30px
    background: #fff
    border-radius: 5px
    margin: 5px 5px 5px 10px

  .confirm
    flex: 1
    margin: 0 5px
    height: 30px
    line-height: 30px
    text-align: center
    font-size: 14px
    border-radius: 5px
    color: #02A9F6
    background-color: #fff
</style>

<template>
  <transition name="yt-slider-right-all">
    <div class="wrap" v-if="showFlag">
      <v-pageBar @leftClick="hide" :emitClick="true" v-if="showFlag">选择检查内容</v-pageBar>
      <div class="container">
        <yt-tabs v-model="active">
          <yt-tab :value="TABS.LIST" title="选择列表"></yt-tab>
          <yt-tab :value="TABS.ADD" title="手动输入"></yt-tab>
          <div class="yt-scroll" :slot="TABS.LIST">
            <p class="row"
               @click="add(content.contentInfo)"
               :class="{'row-active': isSelect(content)}"
               v-for="(content, index) in selectList">{{index + 1}}: {{content.contentInfo}}
              <img v-if="isSelect(content)" class="select-icon" :src="'./static/img/select.png'">
            </p>
          </div>
          <div class="yt-scroll" :slot="TABS.ADD">
            <p class="inputWrap">
              <span class="inputWrap-input" style="text-align: left;">
                <vInputSpeech align="left" v-model="key"></vInputSpeech>
              </span>
              <span class="confirm" @click="confirm">确认</span>
            </p>
            <p v-if="key.length > 0 && showContent" class="row" @click="handlerClick(result)"
              v-for="(result, index) in MatchingCheckContent">{{index + 1}}: {{result.contentInfo}}</p>
          </div>
        </yt-tabs>
        <span class="list-btn" @click="handlerShowAlert">
          <img class="list-icon" :src="'./static/img/list.png'" alt="预览结果">
          <span class="list-corner" v-if="list.length > 0">{{list.length}}</span>
        </span>
        <span class="list-btn2" @click="handlerOk">
          <img class="list-icon" :src="'./static/img/complete.png'" alt="预览结果">
        </span>
      </div>
      <yt-alert-wrap @confim="handlerOk" title="下面是预览结果" v-model="showAlert">
        <div class="yt-scroll">
          <p v-for="(item, index) in list" class="col">
            <span class="text">{{index + 1}}: {{item.msg}} </span>
            <span class="upload" @click="upload(item)" v-if="item.isNew">入库</span>
            <span class="remove" @click="remove(index)">删除</span>
          </p>
        </div>
      </yt-alert-wrap>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {GetCheckContentList, GetMatchingCheckContent, AddOrEditCheckContentInfo} from '@/api'
  import {listerBack} from '@/mixins'
  const TABS = {
    LIST: 'list',
    ADD: 'add'
  }
  export default {
    name: 'xzjcnr',
    mixins: [listerBack],
    data () {
      return {
        TABS,
        showFlag: false,
        showAlert: false,
        active: TABS.LIST,
        selectList: [],
        list: [],
        ok: null,
        key: '',
        showContent: false,
        MatchingCheckContent: [],
        userId: null
      }
    },
    methods: {
      upload(item) {
        let obj = {
          id: 0,
          contentInfo: item.msg,
          userId: this.userId
        }
        let confim = async () => {
          await AddOrEditCheckContentInfo(obj)
          item.isNew = false
        }
        this.$module.confim.show({
          desc: '该条检查内容将被存入库中。您确定要添加吗？',
          confim
        })
      },
      handlerClick (item) {
        if (this.isRepeat(item.contentInfo)) return
        this.list.push({isNew: false, msg: item.contentInfo})
        this.key = ''
        this.$nextTick(() => {
          this.showContent = false
        })
      },
      confirm () {
        if (this.key === '') {
          this.$module.toast.show({msg: '请输入内容!'})
          return
        }
        if (this.isRepeat(this.key)) return
        this.list.push({isNew: true, msg: this.key})
        this.key = ''
      },
      show (ok, userId) {
        this.showFlag = true
        this.ok = ok
        this.userId = userId
        this.fecthData()
      },
      hide () {
        this.showFlag = false
      },
      remove(index) {
        this.list.splice(index, 1)
      },
      async fecthData () {
        this.selectList = await GetCheckContentList()
      },
      isSelect(content) {
        for (var i = 0; i < this.list.length; i++) {
          if (content.contentInfo === this.list[i].msg) {
            return true
          }
        }
        return false
      },
      isRepeat (msg) {
        for (let i = 0; i < this.list.length; i++) {
          if (msg === this.list[i].msg) {
            return true
          }
        }
        return false
      },
      add (msg) {
        if (this.isRepeat(msg)) return
        this.$module.confim.show({
          desc: '您确定选择这条内容吗?',
          confim: () => {
            this.list.push({isNew: false, msg: msg})
          }
        })
      },
      handlerShowAlert () {
        this.showAlert = true
      },
      handlerOk () {
        if (!this.list.length) {
          this.$module.toast.show({msg: '请选择检查内容!'})
          return
        }
        if (this.ok) {
          let str = ''
          this.list.forEach((item, index) => {
            str += `${index + 1}: ${item.msg};\n`
          })
          this.ok(str)
          this.list = []
          this.showAlert = false
          this.hide()
        }
      }
    },
    watch: {
      'key' () {
        this.showContent = true
        let self = this
        if (this.key) {
          if (this.timeout) {
            clearTimeout(this.timeout)
          }
          this.timeout = setTimeout(async () => {
            this.MatchingCheckContent = await GetMatchingCheckContent(this.key)
          }, 500)
        }
      }
    }
  }
</script>
