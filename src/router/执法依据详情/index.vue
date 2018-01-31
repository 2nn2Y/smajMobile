<template>
  <yt-page title="执法依据列表">
    <div class="yt-scroll">
      <yt-collapse-group :accordion="true">
        <yt-collapse :title="data.illegalActivities" :key="index" :name="index" v-for="(data, index) in ContentLawEnforcements">
          <div class="row-content">
            <h1>一、违法行为经过</h1>
            <p>{{data.illegalActivities}}</p>
            <h1>二、违法条款</h1>
            <p>{{data.illegalAct}}</p>
            <h1>三、处罚依据</h1>
            <p>{{data.punishmentBasis}}</p>
            <h1>四、处罚种类和幅度</h1>
            <p>{{data.punishmentCategory}}</p>
          </div>
        </yt-collapse>
      </yt-collapse-group>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetContentLawEnforcements} from '@/api'
  export default {
    name: 'zfyjxq',
    data () {
      return {
        id: 0,
        ContentLawEnforcements: []
      }
    },
    methods: {
      async fetchData (id) {
        if (id === this.id) return
        this.ContentLawEnforcements = await GetContentLawEnforcements(id)
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.query.id)
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    display: flex
    padding: 0 20px
    line-height: 45px
    border-bottom: 1px solid #eee
    justify-content: space-between

    &-text
      flex 1
      border 0
      outline 0
      background #fff
      &:focus
        border 0
        outline 0

    &-icon
      color: #aaa
      transform: rotate(180deg)

    &-content
      font-size 14px
      color: #101010
      line-height: 35px
      padding: 0 20px
      p
        text-indent: 10px

</style>
