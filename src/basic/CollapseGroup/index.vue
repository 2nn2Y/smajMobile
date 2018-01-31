<template>
  <div class="collapse-group">
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'CollapseGroup',
    componentName: 'CollapseGroup',
    props: {
      accordion: {
        type: Boolean,
        default: true
      },
      value: {
        type: Array,
        default () {
          return []
        }
      }
    },

    data () {
      return {
        list: []
      }
    },

    created () {
      this.list = [].concat(this.value)
      this.$on('collapse-click', this.handleItemClick)
    },

    methods: {
      handleItemClick (item) {
        let value = [].concat(this.list)
        let index = this.list.indexOf(item)
        if (this.accordion) {
          if (index > -1) {
            value = []
          } else {
            value = [item]
          }
        } else {
          if (index > -1) {
            value.splice(index, 1)
          } else {
            value.push(item)
          }
        }
        this.list = [].concat(value)
        this.$emit('input', value)
      }
    },

    watch: {
      'value' () {
        this.list = [].concat(this.value)
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
</style>
