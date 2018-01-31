<template>
  <yt-page title="最新通知">
    <div class="wrap">
      <div class="cont-wrap yt-hide-scroll">
        <div class="titleWrap">
          <p class="title">{{CurAnnouncement.title}}</p>
          <p class="desc">
            <span>通知时间:</span>
            <span>{{CurAnnouncement.createTime | formatTime}}</span>
            <span>来源:</span>
            <span>{{CurAnnouncement.issuerName}}</span>
          </p>
        </div>
        <div class="content" v-html="CurAnnouncement.content"></div>
      </div>
      <div class="btn-wrap">
        <yt-btn @click="upLoadFile" :class="{'no-File': !hasFile}">{{ hasFile ? '下载附件' : '暂无附件'}}</yt-btn>
      </div>
    </div>
    <yt-alert-wrap v-model="showFile" slot="alert">
      <p class="fileList-title" slot="title">附件列表</p>
      <div class="fileList yt-hide-scroll" v-if="showFile && hasFile">
        <p class="fileList-col" v-for="item in CurAnnouncement.fileList">
          <span class="fileList-name">{{item.fullName}}</span>
          <span class="fileList-time">{{item.creationTime}}</span>
          <span @click="listDetail(item)" class="iconfont icon-fanhui fileList-upload"></span>
        </p>
      </div>
    </yt-alert-wrap>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {UpdateGovernmentRecord, GetAnnouncementInfo} from '@/api'
  export default {
    name: 'ZXTZdetail',
    computed: {
      hasFile () {
        if (this.CurAnnouncement.fileList && this.CurAnnouncement.fileList.length) {
          return true
        }
        return false
      }
    },
    data () {
      return {
        showFile: false,
        id: 0,
        CurAnnouncement: {}
      }
    },
    activated () {
      let query = this.$router.currentRoute.query
      this.fetchData(query.announcementId, query.id, query.whetherRead + '' === 'true')
    },
    methods: {
      async fetchData (announcementId, id, whetherRead) {
        if (announcementId === this.id) return
        this.CurAnnouncement = {}
        this.$module.loading.show()
        let res = await GetAnnouncementInfo(announcementId)
        this.$module.loading.hide()
        if (res.success) {
          this.CurAnnouncement = res.result
          this.CurAnnouncement.createTime = new window.Date(Date.parse(this.CurAnnouncement.createTime))
          this.id = announcementId
          if (!whetherRead) {
            UpdateGovernmentRecord(id)
          }
        }
      },
      upLoadFile () {
        if (this.CurAnnouncement.fileList.length === 0) return
        if (this.CurAnnouncement.fileList.length === 1) {
          let item = this.CurAnnouncement.fileList[0]
          this.$router.push({
            path: '/xzgl',
            query: {
              name: item.fullName,
              fileName: item.fullName,
              fileExt: item.fileExt,
              src: item.physicalPath
            }
          })
        } else {
          this.toggleShowFile()
        }
      },
      listDetail(item) {
        this.$router.push({
          path: '/xzgl',
          query: {
            name: item.fullName,
            fileName: item.fullName,
            fileExt: item.fileExt,
            src: item.physicalPath
          }
        })
      },
      toggleShowFile () {
        this.showFile = !this.showFile
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    position relative
    width 100%
    height 100%
    overflow hidden

  .cont-wrap
    position absolute
    top 0
    left 0
    right 0
    bottom 62px

  .btn-wrap
    position absolute
    left 0
    bottom 0
    width 100%

  .no-File
    background-color #f5f5f5
    color #aaa

  .titleWrap
    border-bottom 1px solid #f1f1f1
    line-height: 30px
    text-align: center

  .title
    font-weight: bold
    font-size 16px

  .desc
    font-size: 14px
    color: #666
    span
      margin: 0 4px

  .content
    text-indent 10px
    font-size 15px
    padding 0 10px
    margin-bottom 70px
    line-height 30px
    color #222

  .fileList
    width 100%
    height 100%
    transition: all .3s ease
    background-color: #ffffff

  .fileList-title
    line-height: 40px
    text-align: center
    color: #03a9f5

  .fileList-col
    display: flex
    height: 40px
    line-height: 40px
    padding: 0 0 0 10px;
    border-bottom: 1px solid #eee

  .fileList-name
    flex: 1
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  .fileList-time
    flex: 0 0 100px
    text-align: center
    overflow: hidden

  .fileList-upload
    flex: 0 0 25px
    text-align: center
    color: #666
    transform: rotate(180deg)
</style>
