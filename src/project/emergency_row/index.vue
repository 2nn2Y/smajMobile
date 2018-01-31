<template>
  <div class="row">
    <p class="row-title">{{data.title}}</p>
    <div class="row-item" v-for="option in data.options" @click="click(option)">
      <img class="row-img" :src="option.img" :alt="option.title">
      <p class="row-desc">{{option.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'yjjyRow',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      click (option) {
        this.$emit('click', option)
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    background: #fff
    margin-bottom: 20px
    font-size: 18px
    padding: 0 15px 15px 15px
    &-item
      margin-right: 10px
      display: inline-block
    &-img
      width: 40px
      height: 40px
      margin: 15px
    &-desc
      font-size: .8em
      text-align: center
    &-title
      font-size: 1em
      height: 2.5em
      line-height: 2.5em
</style>
