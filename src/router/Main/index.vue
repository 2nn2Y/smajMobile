<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .tab-icon
    font-size 25px

  .row
    display flex
    align-items center
    justify-content center
    text-align center
    position relative
    padding 0 10px
    height 90px
    border-bottom 1px solid #f1f1f1
    &:active
      background: #f2f4f6

  .time
    color #aaaaaa
    font-weight normal
    font-size 12px

  .icon
    display: inline-block
    position: absolute
    top: 60%
    right: 10px
    padding: 1px
    width: 16px
    height: 16px
    font-size: 14px
    line-height: 16px
    color: #fff
    border-radius: 8px
    transform: translate3d(0, -50%, 0)
    background: #ff5722

  .left
    flex: 0 0 100px

  .left-icon
    width 1.8em
    height 1.8em
    line-height 1.8em
    border-radius 50%
    display inline-block
    color: #fff
    font-size: 35px
    &[announcement]
      background-color #00bcd4
    &[todo]
      background-color #e282fa
    &[emergency]
      background-color #ff5722

  .right
    overflow: hidden
    text-align: left
    flex: 1

  .col
    font-size 13px
    display flex
    color #707070
    align-items center
    justify-content space-between
    line-height 30px

  .title
    color #000000
    font-size 15px
    font-weight bold

  .carousel-imgWrap
    width: 100%
    height: 180px
    img
      width: 100%
      height: 100%

  .person
    background: #efeff4

  .person-row
    display flex
    text-align center
    align-items center
    border-bottom: 1px solid #ccc
    justify-content: space-between
    background: #fff
    color: #101010
    padding: 1.2em .5em
    font-size: 16px
    &:active
      background: #f1f2f3
    &-avatar
      display inline-block
      width 2em
      height 2em
      line-height 2em
      background-color #8bc34a
      color: #fff
      font-size: 35px

  .icon-right
    transform: rotate(180deg)

  .exit
    margin: 15px
    text-align: center
    height: 2.5em
    line-height: 2.5em
    font-size: 17px
    color: #ffffff
    background-color: #dd524d
    border-radius: 5px
    margin-top: 50px

  .checkVersion
    color: #aaa

  .split
    height: 15px

  .menu
    width 100%
    height 100%
    font-size 0
    background-color: #f5f5f5
    overflow hidden

  .menu-item
    position relative
    display inline-block
    width 33.33%
    padding-top 36%
    background-color #ffffff
    border-right 1px solid #f1f1f1
    border-bottom 1px solid #f1f1f1
    box-sizing border-box
    &:active
      background-color #f5f5f5

  .icon-wrap
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    display flex
    text-align center
    align-items center
    justify-content center

  .menu-icon
    width 60px
    height 60px

  .menu-text
    text-align center
    font-size 15px
    margin-top 10px
</style>

<template>
  <yt-page title="神木移动监管平台" :showLeft="false">
    <yt-tabs v-model="active" pos="bottom">
      <yt-tab v-for="(val, key) in TABS" :key="key" :title="val.title" :value="key"><i class="tab-icon iconfont" :class="val.icon"></i></yt-tab>
      <div :slot="TABS2.HOME">
        <div class="yt-scroll">
          <div class="carousel-imgWrap"><img :src="'./static/img/main.jpg'"></div>
          <div class="row" @click="handlerClick(KEYS.ANN)">
            <div class="left"><span class="left-icon iconfont icon-xiaoxi" announcement></span></div>
            <div class="right">
              <p class="col title">{{Announcement.title}}<span class="time">{{Announcement.time}}</span></p>
              <p class="col">{{Announcement.desc}}</p>
            </div>
            <span class="icon" v-if="Announcement.total">{{Announcement.total}}</span>
          </div>
          <div class="row" @click="handlerClick(KEYS.TODO)">
            <div class="left"><span class="left-icon iconfont icon-daibanshixiang3" todo></span></div>
            <div class="right">
              <p class="col title">{{Todo.title}}<span class="time">{{Todo.time}}</span></p>
              <p class="col">{{Todo.desc}}</p>
            </div>
          </div>
          <div class="row" @click="handlerClick(KEYS.EME)" v-show="false">
            <div class="left"><span class="left-icon iconfont icon-yingjiyuan" emergency></span></div>
            <div class="right">
              <p class="col title">{{EmergencyAccident.title}}<span class="time">{{EmergencyAccident.time}}</span>
              </p>
              <p class="col">{{EmergencyAccident.desc}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="menu" :slot="TABS2.MENU">
        <div class="menu-item" @click="handlerClickMenu(menu)" v-for="menu in menuList">
          <div class="icon-wrap">
            <span>
              <img class="menu-icon" :src="menu.img" :alt="menu.text">
              <p class="menu-text">{{menu.text}}</p>
            </span>
          </div>
        </div>
      </div>
      <div class="yt-scroll person" :slot="TABS2.PERSON">
        <div class="split"></div>
        <div class="person-row" @click="upload">
          <div class="person-row-left">头像</div>
          <div class="person-row-right">
            <span class="person-row-avatar iconfont icon-iconfontwo" v-if="!user.file"></span>
            <img v-if="user.file" :src="user.file.physicalPath" class="person-row-avatar"/>
          </div>
        </div>
        <div class="person-row">
          <span class="person-row-left">名称</span>
          <span class="person-row-right">{{user.userName}}</span>
        </div>
        <div class="person-row">
          <span class="person-row-left">联系方式</span>
          <span class="person-row-right">{{!user.tel ? '暂无' : user.tel.length > 0 ? user.tel : '暂无'}}</span>
        </div>
        <div class="split"></div>
        <div class="person-row" @click="toFileList">
          <span class="person-row-left">最近文件</span>
          <span class="person-row-right icon-right iconfont icon-fanhui"></span>
        </div>
        <div class="exit" @click="exitUserInfo">退出</div>
      </div>
    </yt-tabs>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetHomePageInformations} from '@/api'
  import storage from 'good-storage'
  import {USERTOKEN, AUTOLOGIN} from '@/config'
  import {mapGetters} from 'vuex'
  const TABS2 = {
    HOME: 'home',
    MENU: 'menu',
    PERSON: 'person'
  }
  const TABS = {
    home: {
      title: '首页',
      icon: 'icon-shouyeshouye'
    },
    menu: {
      title: '功能菜单',
      icon: 'icon-caidan'
    },
    person: {
      title: '个人中心',
      icon: 'icon-gerenzhongxin'
    }
  }
  const KEYS = {
    ANN: 'announcement',
    TODO: 'todo',
    EME: 'emergency'
  }
  class Model {
    constructor(options, role) {
      this.Announcement = this.setAnnouncement(options.getAnnouncementList)
      this.Todo = this.setTodo(options, role)
      this.EmergencyAccident = Object.assign({}, options.emergencyAccidentNoticeInfo, this.setEmergencyAccident(options.emergencyAccidentNoticeInfo))
    }

    setAnnouncement(obj) {
      let list = obj.rows.filter(item => {
        return !item.whetherRead
      })
      let item = list.length ? list[0] : {
        title: '暂无新公告',
        createTime: ''
      }
      return {
        total: list.length,
        title: '通知公告',
        desc: item.title,
        time: item.createTime
      }
    }

    setEmergencyAccident(obj) {
      if (obj) {
        return {
          title: '应急救援',
          desc: `${obj.enterpriseName}(${obj.accidentType})`,
          time: obj.incidentDate
        }
      }
      return {
        title: '应急救援',
        desc: '暂无事故发生！',
        time: ''
      }
    }

    setTodo(obj, role) {
      let item = {
        title: '待办事项',
        desc: '暂无代办事项',
        time: ''
      }
      let _item = null
      switch (role) {
        case 0:
          if (obj.getEnterprisesTreatedList && obj.getEnterprisesTreatedList.length) {
            _item = obj.getEnterprisesTreatedList[0]
          } else if (obj.pendingReviews && obj.pendingReviews.length) {
            _item = obj.pendingReviews[0]
          }
          if (_item) {
            item.desc = _item.enterpriseName
            item.time = _item.leadTime
          }
          break
        case 1:
          if (obj.getUnDealAccidents && obj.getUnDealAccidents.result.rows.length) {
            _item = obj.getUnDealAccidents.result.rows[0]
          }
          if (_item) {
            item.desc = _item.enterpriseName
            item.time = _item.incidentDate
          }
          break
        case 2:
          if (obj.pendingAuditInstructions && obj.pendingAuditInstructions.length) {
            _item = obj.pendingAuditInstructions[0]
          }
          if (_item) {
            item.desc = _item.enterpriseName
            item.time = _item.leadTime
          }
          break
        case 3:
          if (obj.getUnDealAccidents && obj.getUnDealAccidents.result.rows.length) {
            _item = obj.getUnDealAccidents.result.rows[0]
          } else if (obj.pendingAuditInstructions && obj.pendingAuditInstructions.length) {
            _item = obj.pendingAuditInstructions[0]
          }
          if (_item) {
            item.desc = _item.enterpriseName
            item.time = _item.leadTime
          }
          break
      }
      return item
    }
  }
  export default {
    name: 'main',
    computed: mapGetters({
      user: 'getUser'
    }),
    data () {
      return {
        TABS,
        TABS2,
        active: TABS2.HOME,
        KEYS,
        Announcement: {},
        EmergencyAccident: {},
        Todo: {},
        menuList: [
          {
            text: '企业信息',
            img: './static/img/qyxx.png',
            path: '/qyxx'
          },
          {
            text: '行政执法',
            img: './static/img/xzzf.png',
            path: '/xzzf'
          },
          {
            text: '危险源监测',
            img: './static/img/wxyjc.png',
            path: '/zdwxy'
          },
          {
            text: '应急救援',
            img: './static/img/yjjy.png',
            path: '/yjjy'
          },
          {
            text: '知识库',
            img: './static/img/zsk.png',
            path: '/zsk'
          },
          {
            text: '专家库',
            img: './static/img/zjk.png',
            path: '/zjk'
          },
          {
            text: '统计分析',
            img: './static/img/tjfx.png',
            path: '/tjfx'
          }
        ]
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      exitUserInfo () {
        storage.set(USERTOKEN, '')
        storage.set(AUTOLOGIN, false)
        this.$router.push({path: '/login'})
        setTimeout(() => {
          this.active = TABS2.HOME
        }, 300)
      },
      upload () {
        this.$router.push({path: '/uploadAvatar'})
      },
      toFileList () {
        this.$router.push({
          path: '/xzgl',
          query: {
            src: ''
          }
        })
      },
      checkEme (query) {
        if (this.EmergencyAccident.id) {
          this.$router.push({
            path: '/yjjy',
            query: {
              userId: query.userId,
              enterpriseId: this.EmergencyAccident.enterpriseId,
              AccidentId: this.EmergencyAccident.id
            }
          })
        } else {
          this.$module.toast.show({msg: '暂无事故发生！'})
        }
      },
      handlerClick (key) {
        let query = this.$router.currentRoute.query
        switch (key) {
          case KEYS.ANN:
            this.$router.push({path: '/zxtz', query})
            break
          case KEYS.TODO:
            this.$router.push({path: '/dbsx', query})
            break
          case KEYS.EME:
            this.checkEme(query)
            break
        }
      },
      handlerClickMenu (item) {
        let path = item.path
        let query = this.$router.currentRoute.query
        if (path === '/yjjy') {
          this.checkEme(query)
        } else {
          this.$router.push({path, query})
        }
      },
      async fetchData() {
        let query = this.$router.currentRoute.query
        let userId = query.userId
        if (!this.FIRST) {
          this.$module.loading.show()
          this.FIRST = true
        }
        let res = await GetHomePageInformations(userId)
        this.$module.loading.hide()
        if (res.success) {
          res = res.result
          let page = new Model(res, parseInt(query.userRoleType))
          this.Announcement = page.Announcement
          this.EmergencyAccident = page.EmergencyAccident
          this.Todo = page.Todo
        }
      }
    }
  }
</script>
