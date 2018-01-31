<template>
  <yt-page title="专家库详情">
    <div>
      <p class="row">
        <span class="row-avatar iconfont icon-iconfontwo"></span>
        <span>{{CurExpert.name}}</span>
        <span>
          <img class="gender" v-if="CurExpert.gender === 1" :src="'./static/img/boy.png'" alt="男">
          <img class="gender" v-if="CurExpert.gender === 0" :src="'./static/img/girl.png'" alt="女">
          47岁</span>
      </p>
      <p class="row">
        <span>职称</span>
        <span>{{CurExpert.academicTitle}}</span>
      </p>
      <p class="row">
        <span>所在单位</span>
        <span>{{CurExpert.unitName}}</span>
      </p>
      <p class="row">
        <span>联系方式</span>
        <span>{{CurExpert.phoneNumber}}</span>
      </p>
      <p class="row">
        <span>职务</span>
        <span>{{CurExpert.jobName}}</span>
      </p>
      <p class="row">
        <span>专业</span>
        <span>{{CurExpert.professionalName}}</span>
      </p>
      <p class="row">
        <span>毕业院校</span>
        <span>{{CurExpert.graduateSchool}}</span>
      </p>
      <p class="row">
        <span>个人履历</span>
        <span>{{CurExpert.appendixEducationalBackground}}</span>
      </p>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GettExpertInfo} from '@/api'
  export default {
    name: 'zjkdetail',
    data () {
      return {
        CurExpert: {},
        id: 0
      }
    },
    methods: {
      async fetchData(id) {
        if (id === this.id) return
        this.CurExpert = {}
        this.CurExpert = await GettExpertInfo(id)
        this.id = id
      }
    },
    activated () {
      this.fetchData(this.$router.currentRoute.params.id)
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .row
    display flex
    align-items center
    justify-content space-between
    padding 13px 15px
    font-size 14px
    box-sizing border-box
    border-bottom 1px solid #f1f1f1
    &-avatar
      display inline-block
      width 2em
      height 2em
      line-height 2em
      text-align center
      border-radius 50%
      background-color #8bc34a
      color: #fff
      font-size: 38px

  .gender
    display inline-block
    vertical-align middle
    width 20px
    height 20px
</style>
