<template>
  <span @click="pickTime">
    <span v-if="!value">请选择</span>
    <span v-if="value">{{value}}</span>
  </span>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'ytTime',
    props: {
      value: '',
      type: {
        type: String,
        default: 'date'
      }
    },
    methods: {
      pickTime () {
        this.$module.picker.show({
          type: this.type,
          cur: this.value,
          ok: (date) => {
            let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            if (this.type === 'time') {
              str += ` ${date.getHours()}:${date.getMinutes()}`
            }
            this.$emit('input', str)
          }
        })
      }
    }
  }
</script>
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
</style>
