<template>
  <div class="page">
    <vPageBar :showLeft="showLeft">
      <div>{{title}}</div>
      <div slot="right">
        <slot name="right"></slot>
      </div>
    </vPageBar>
    <div class="page-container">
      <slot></slot>
    </div>
    <slot name="alert"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'page',
    props: {
      title: {
        type: String,
        default: ''
      },
      showLeft: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .page
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: #fff
    font-size: 16px
    overflow: hidden
    transition: all .3s ease

  .page-nav
    position: fixed
    left: 0
    top: 0
    height: 22px
    width: 100%

  .page-container
    position: fixed
    left: 0
    top: 66px
    right: 0
    bottom: 0
    overflow: hidden

</style>
