<template>
  <div @transition="transition" class="collapse-group">
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
        default: false
      },
      value: {
        type: Array,
        default () {
          return []
        }
      },
      open: {
        type: Number,
        default: -1
      },
      close: {
        type: Number,
        default: -1
      }
    },

    data () {
      return {
        activeNames: []
      }
    },

    watch: {
      'value' (value) {
        this.activeNames = [].concat(value)
      },
      'open' () {
        let result = []
        this.$children.forEach(item => {
          if (item.name === 'Collapse') {
            result.push(item._uid)
          }
        })
        this.setActiveNames(result)
      },
      'close' () {
        this.setActiveNames([])
      }
    },

    mounted () {
      let activeNames = this.accordion ? this.value[0] : this.value
      this.setActiveNames(activeNames)
      this.$on('collapse-click', this.handleItemClick)
    },

    methods: {

      setActiveNames (activeNames) {
        activeNames = [].concat(activeNames)
        let value = this.accordion ? activeNames[0] : activeNames
        this.activeNames = activeNames
        this.$emit('change', value)
      },

      handleItemClick (item) {
        try {
          if (this.accordion) {
            let activeNames = this.activeNames[0] && this.activeNames[0] === item ? '' : item
            this.setActiveNames(activeNames)
          } else {
            let activeNames = this.activeNames.slice(0)
            let index = activeNames.indexOf(item)
            if (index > -1) {
              activeNames.splice(index, 1)
            } else {
              activeNames.push(item)
            }
            this.setActiveNames(activeNames)
          }
        } catch (error) {
        }
      },

      transition (e) {
        this.$emit('transition', e)
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
</style>
