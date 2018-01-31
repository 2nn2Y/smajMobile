<template>
  <yt-page title="应急队伍">
    <div class="yt-scroll">
      <div v-for="Team in EmergencyTeams">
        <div class="title">{{Team.teamName}}</div>
        <div>
          <p class="row">
            <span>负责人</span>
            <span>{{Team.users ? Team.users[0].name : ''}}</span>
          </p>
          <p class="row">
            <span>联系电话</span>
            <a :href="`tel:${Team.users ? Team.users[0].mobile : ''}`" class="phone">{{Team.users ? Team.users[0].mobile : ''}}</a>
          </p>
          <p class="row">
            <span>队伍功能</span>
            <span>{{Team.teamType}}</span>
          </p>
        </div>
        <div class="split"></div>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetTeamList} from '@/api'
  export default {
    name: 'YJDW',
    data () {
      return {
        EmergencyTeams: []
      }
    },
    methods: {
      async fetchData () {
        if (this.EmergencyTeams.length) return
        this.EmergencyTeams = await GetTeamList()
      }
    },
    activated () {
      this.fetchData()
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">

  .title
    border-bottom 1px solid #f1f1f1
    font-size: 16px
    line-height: 2.66em
    padding: 0 1em

  .row
    display: flex
    justify-content: space-between
    font-size: 14px
    line-height: 2.66em
    padding: 0 1em
    span
      color: #ccc
      &:first-child
        color: #333
    .phone
      color #20a0ff

  .split
    border-top: 1px solid #ddd
    border-bottom: 1px solid #ddd
    background: #edf4f7
    height: 12px
</style>
