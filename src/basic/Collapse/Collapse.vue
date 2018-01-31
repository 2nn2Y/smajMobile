<template>
  <div class="collapse">
    <div class="collapse-title-wrap"
         :class="{'collapse-title-wrap-open': show && canOpen}"
         @click.stop="handCollapse($event)">
      <slot name="title"></slot>
    </div>
    <vCollapseTransition @transition="transition" :show="show">
      <slot></slot>
    </vCollapseTransition>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: 'Collapse'
      },
      canOpen: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        show: true
      }
    },

    computed: {
      isActive () {
        let active = false
        try {
          active = this.$parent.activeNames.indexOf(this._uid) > -1
        } catch (error) {
          active = false
        }
        return active
      }
    },

    created () {
      this.show = this.isActive
    },

    watch: {
      'isActive' (value) {
        this.show = value
      }
    },

    methods: {
      handCollapse (e) {
        this.$utils.dispatch.call(this, 'CollapseGroup', 'collapse-click', this._uid)
      },
      transition (e) {
        this.$emit('transition', e)
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .collapse-title-wrap
    &-open
      background-color: #f2f4f6
    .collapse-icon
      margin: 0 10px;
      color: #fff;
      transform: rotate(0deg);
      transition: all .3s ease-in-out;
    .collapse-icon-active
      transform: rotate(90deg)
</style>
