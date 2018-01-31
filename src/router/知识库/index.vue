<template>
  <yt-page title="知识库">
    <input v-model="key" placeholder="请搜索..." class="search yt-input" type="text">
    <yt-tabs @active="activePage" v-model="active" :unflex="true" :loading="true" ref="tab">
      <yt-tab v-for="(tab, index) in TABS" :key="index" :title="tab.title" :value="index"></yt-tab>
      <yt-collapse-group :slot=0>
        <yt-group :data="TABS[0].list">
          <yt-collapse slot-scope="props" :title="props.data.text" :name="props.index">
            <p class="row" @click="handlerClick(child)" v-for="child in props.data.children">{{child.text}}<span class="row-icon iconfont icon-fanhui"></span></p>
          </yt-collapse>
        </yt-group>
      </yt-collapse-group>
      <yt-group :pullDownFn="pullDown" :pullUpFn="pullUp" :name=1 :data="TABS[1].list" :slot=1>
        <div slot-scope="props" class="row">
          <span class="row-text">{{props.data.showName}}</span><span class="row-icon iconfont icon-fanhui"></span>
        </div>
      </yt-group>
      <div class="wrap" v-for="(tab, index) in TABS" v-if="index > 1" :slot="index">
        <yt-group :pullDownFn="pullDown" :pullUpFn="pullUp" :name="index" :data="tab.list">
          <div slot-scope="props" class="row">
            <span class="row-text">{{props.data.name}}</span><span class="row-icon iconfont icon-fanhui"></span>
          </div>
        </yt-group>
      </div>
    </yt-tabs>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {GetLawEnforcementBasisTree, GetDangerousGoodsList, GetKnowledges} from '@/api'
  export default {
    name: 'zsk',
    data () {
      return {
        key: '',
        active: 0,
        TABS: [
          {
            title: '执法依据',
            list: []
          },
          {
            title: '物质特性',
            list: []
          },
          {
            title: '安全生产法规',
            type: 9,
            list: []
          },
          {
            title: '安全生产标准',
            type: 10,
            list: []
          },
          {
            title: '安全管理知识库',
            type: 11,
            list: []
          },
          {
            title: '典型事故案例',
            type: 12,
            list: []
          },
          {
            title: '行业排查标准',
            type: 13,
            list: []
          },
          {
            title: '职业卫生事故案例',
            type: 14,
            list: []
          },
          {
            title: '职业卫生防治标准',
            type: 15,
            list: []
          },
          {
            title: '职业卫生国家标准',
            type: 16,
            list: []
          }
        ],
        pullDown: async (index) => {
          let list = await this.getList(index)
          return list
        },
        pullUp: async (index, skipCount) => {
          let list = await this.getList(index, skipCount)
          return list
        }
      }
    },
    methods: {
      async activePage (index) {
        let item = this.TABS[index]
        item.list = await this.getList(index)
        this.TABS.splice(index, 1, item)
        this.$refs.tab.stopLoading(index)
      },
      async getList(index, skipCount = 0) {
        let rows = 20
        let obj = {
          page: Math.ceil(skipCount / rows) + 1,
          rows,
          type: index + 7
        }
        let res = null
        if (index === 0) {
          res = await GetLawEnforcementBasisTree()
        } else if (index === 1) {
          res = await GetDangerousGoodsList(obj)
          res = res.rows
        } else {
          res = await GetKnowledges(obj)
          res = res.rows
        }
        return res
      },
      handlerClick (data) {
        this.$router.push({
          path: '/zfyjxq',
          query: {
            id: data.id
          }
        })
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .wrap
    width 100%
    height 100%
    overflow hidden

  .row
    display flex
    align-items center
    justify-content space-between
    height 44px
    line-height 44px
    font-size 14px
    padding 0 10px
    box-sizing border-box
    border-bottom 1px solid #f1f1f1
    &:active
      background: #eee
    &-text
      flex 1
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
    &-icon
      margin-right: 5px
      color: #aaa
      transform: rotate(180deg)


  .search
    margin: 5px 0 5px 5%
    border-radius: 2px
    width: 90%
    font-size: .8em
    height: 2em
    line-height: 2em
    text-indent: 1em
    background: #f2f2f2
</style>
