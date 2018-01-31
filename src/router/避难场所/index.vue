<template>
  <yt-page title="避难场所">
    <div class="yt-scroll">
      <div v-for="(Shelter,index) in ShelterList">
        <div class="title">{{Shelter.name}}</div>
        <p class="row">
          <span>占地面积</span>
          <span>{{Shelter.courtyardArea}}</span>
        </p>
        <p class="row">
          <span>容纳人数</span>
          <span>{{Shelter.courtyardCapacity}}</span>
        </p>
        <p class="row">
          <span>所属单位</span>
          <span>{{Shelter.courtyardName}}</span>
        </p>
        <p class="row">
          <span>负责人</span>
          <span>{{Shelter.principal}}</span>
        </p>
        <p class="row">
          <span>联系电话</span>
          <span>{{Shelter.principalPhone}}</span>
        </p>
        <div class="split" v-if="index !== ShelterList.length - 1"></div>
      </div>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetShelterList} from '@/api'
  export default {
    name: 'bncs',
    data () {
      return {
        ShelterList: []
      }
    },
    activated () {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        if (this.ShelterList.length) return
        this.ShelterList = await GetShelterList()
      }
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
