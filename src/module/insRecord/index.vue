<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .page
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
    display flex
    flex-direction column

  .row
    display: flex
    justify-content: space-between
    align-items: center
    height 45px
    line-height 45px
    overflow: hidden
    color: #666
    font-size: 14px
    padding: 0 10px
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    &:active
      background-color: #f1f2f3
    label
      font-size: 15px
      flex: 0 0 80px
    input
      flex 1
      height 100%
      overflow hidden
      color #666
      font-size 1em
      text-align right
      background-color transparent

  .textarea
    width 100%
    height 100px
    padding 10px
    resize none
    box-sizing border-box
    background-color #f5f5f5

  .wrap
    flex 1

  .btn
    width 100%
    background-color #f5f5f5
</style>
<template>
  <transition name="yt-slider-right-all">
    <div class="page" v-show="showFlag">
      <v-pageBar @leftClick="hide" :emitClick="true">添加检查情况</v-pageBar>
      <div class="container">
        <div class="wrap yt-hide-scroll">
          <p class="row">
            <label>隐患位置</label>
            <vInputSpeech :disable="!CanEdit" style="flex:1;" v-model="InstrumentRecordInsertDto.hiddenDangerPosition" placeholder="请输入隐患位置"></vInputSpeech>
          </p>
          <p class="row" @click="showCheckType">
            <label>隐患类别</label>
            <input :disabled="!CanEdit" disabled class="yt-input" type="text" :value="InstrumentRecordInsertDto.hiddenDangerCategoriesName || '请选择'">
          </p>
          <p class="row">
            <label>隐患描述</label>
            <vInputSpeech :disable="!CanEdit" :showInput="false" v-model="InstrumentRecordInsertDto.hiddenDangerDescribe"></vInputSpeech>
          </p>
          <textarea :disabled="!CanEdit" class="textarea yt-input" v-model="InstrumentRecordInsertDto.hiddenDangerDescribe" placeholder="请输入隐患描述"></textarea>
          <yt-img-list :disable="!CanEdit" :data="imgList" @add="ImgAdd" @remove="ImgRemove"></yt-img-list>
        </div>
        <div class="btn"><yt-btn @click="handlerAdd">{{btnName}}</yt-btn></div>
      </div>
      <yt-alert-wrap @confim="confim" v-model="showCheck">
        <yt-checkbox-group v-model="selectCheckList">
          <vTree :datas="HiddenDangerCategoryList"></vTree>
        </yt-checkbox-group>
      </yt-alert-wrap>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {GetHiddenDangerCategoriesTree} from '@/api'
  import {FILE_PREFIX, API_PREFIX} from '@/config'
  import {check, delayed} from '@/utils'
  import {listerBack} from '@/mixins'
  const NAME = {
    add: '录入检查情况',
    edit: '完成',
    preview: '返回'
  }
  class Model {
    constructor (options = {}) {
      Object.assign(this, {
        id: 0,
        taskRecordId: 0,
        hiddenDangerCategoriesId: 0,
        hiddenDangerPosition: '',
        hiddenDangerCategoriesName: '',
        hiddenDangerDescribe: '',
        deleteFiles: [],
        imgArry: [],
        files: []
      }, options)
    }
    setCategories (obj) {
      this.hiddenDangerCategoriesId = obj.id
      this.hiddenDangerCategoriesName = obj.text
    }

    removeImg (id) {
      this.deleteFiles.push(id)
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id === id) {
          this.files.splice(i, 1)
          break
        }
      }
    }

    addImg (list) {
      this.imgArry = list.map(item => {
        return item.path
      })
    }

    checkModel () {
      return check(this, {
        'hiddenDangerCategoriesId': '请选择隐患类别！',
        'hiddenDangerDescribe': '请输入隐患描述！'
      })
    }
  }
  export default {
    mixins: [listerBack],
    computed: {
      CanEdit () {
        return this.btnName !== NAME.preview
      }
    },
    data () {
      return {
        showFlag: false,
        InstrumentRecordInsertDto: {},
        showCheck: false,
        HiddenDangerCategoryList: [],
        selectCheckList: [],
        ok: null,
        btnName: NAME.add,
        imgList: []
      }
    },
    methods: {
      ImgAdd (list) {
        this.InstrumentRecordInsertDto.addImg(list)
      },
      ImgRemove (id) {
        this.InstrumentRecordInsertDto.removeImg(id)
      },
      async fetchData () {
        await delayed(300)
        let res = await GetHiddenDangerCategoriesTree()
        this.HiddenDangerCategoryList = res
      },
      confim () {
        if (!this.selectCheckList.length) {
          this.$module.toast.show({msg: '请选择隐患类别！'})
          return
        }
        this.InstrumentRecordInsertDto.setCategories(this.selectCheckList[0])
        this.showCheck = false
      },
      show (options) {
        let {ok, record, edit} = options
        this.ok = ok
        this.showFlag = true
        if (!record) {
          this.btnName = NAME.add
          this.imgList = []
        } else {
          this.btnName = edit ? NAME.edit : NAME.preview
          this.imgList = []
          if (record.files && record.files.length > 0) {
            this.imgList = record.files.map(item => {
              return {
                id: item.id,
                path: item.physicalPath.replace(FILE_PREFIX, API_PREFIX),
                size: 0
              }
            })
          }
        }
        this.selectCheckList = []
        this.InstrumentRecordInsertDto = new Model(record)
        if (!this.HiddenDangerCategoryList.length) {
          this.fetchData()
        }
      },
      hide () {
        this.showFlag = false
      },
      showCheckType () {
        if (this.CanEdit) {
          this.showCheck = true
        }
      },
      handlerAdd () {
        let msg = this.InstrumentRecordInsertDto.checkModel()
        if (msg) {
          this.$module.toast.show({msg})
          return
        }
        if (this.ok) {
          this.ok(this.InstrumentRecordInsertDto)
        }
        this.hide()
      }
    }
  }
</script>
