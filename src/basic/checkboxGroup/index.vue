<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'CheckboxGroup',
    componentName: 'CheckboxGroup',
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
    mounted () {
      this.$on('checkbox-click', this.handleItemClick)
    },
    methods: {
      handleItemClick (item) {
        let value = [].concat(this.value)
        let index = this.value.indexOf(item)
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
        value.sort((a, b) => {
          return a - b
        })
        this.$emit('input', value)
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
</style>
