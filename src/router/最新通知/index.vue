<template>
  <yt-page title="最新通知" class="zxtz">
    <div class="yt-scroll">
      <div class="row" @click="detail(Announcement)" v-for="Announcement in AnnouncementList">
        <div class="left">
          <p class="title">{{Announcement.title}}</p>
          <p class="content" v-html="Announcement.content"></p>
          <p class="time">{{Announcement.createTime}}</p>
        </div>
        <div class="right">
          <span class="iconfont icon-fanhui"></span>
        </div>
        <span v-if="!Announcement.whetherRead" class="corner"></span>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAnnouncementList} from '@/api'
  export default {
    name: 'zxtz',
    data () {
      return {
        AnnouncementList: []
      }
    },
    methods: {
      async fetchData(id) {
        if (id === this.id) return
        this.$module.loading.show()
        let res = await GetAnnouncementList(id)
        if (res.success) {
          this.AnnouncementList = res.result.rows
          this.id = id
        }
        this.$module.loading.hide()
      },
      detail (Announcement) {
        this.$router.push({
          path: '/ZXTZdetail',
          query: {
            announcementId: Announcement.announcementId,
            id: Announcement.id,
            whetherRead: Announcement.whetherRead
          }
        })
        if (!Announcement.whetherRead) {
          Announcement.whetherRead = true
        }
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.query.userId)
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    position: relative
    padding: 0 10px
    height: 90px
    display: flex
    align-items: center
    justify-content: center
    border-bottom: 1px solid #f1f1f1
    &:active
      background-color: #f1f2f3

  .left
    overflow: hidden
    padding-left: 15px
    flex: 1

  .right
    flex: 0 0 30px
    text-align: center
    color: #aaa
    transform: rotate(180deg)

  .title
    color: #333
    font-weight: bold
    font-size: 15px
    line-height: 25px

  .content
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    line-height: 30px
    color: #999
    font-size: 13px

  .time
    font-size: 12px
    color: #ff5722

  .corner
    position: absolute
    top: 10px
    right: 10px
    width: 10px
    height: 10px
    border-radius: 50%
    background-color: #ff5722
</style>
