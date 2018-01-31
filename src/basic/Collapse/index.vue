<template>
  <div class="collapse" v-bind="{'open': isActive}">
    <yt-touch-ripple class="collapse-titleWrap"
                     @click="handCollapse($event)">
      <span v-if="!isRight" class="collapse-titleWrap-title">
        <slot name="titleLeft">{{title}}</slot>
      </span>
      <img v-if="showIcon" class="collapse-titleWrap-icon" src="./right.png">
      <span v-if="isRight" class="collapse-titleWrap-title">
        <slot name="title">{{title}}</slot>
      </span>
    </yt-touch-ripple>
    <yt-collapse-transition @transition="transition" v-show="isActive">
      <div class="collapse-bodyWrap" :class="bodyClass">
        <slot>
        </slot>
      </div>
    </yt-collapse-transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {dispatch} from '@/mixins'
  export default {
    mixins: [dispatch],

    componentName: 'Collapse',

    props: {
      isRight: {
        type: Boolean,
        default: true
      },
      showIcon: {
        type: Boolean,
        default: true
      },

      title: {
        type: String,
        default: ''
      },
      name: {
        required: true,
        type: [String, Number, Array, Object],
        default: ''
      },
      bodyClass: {
        type: [String, Number, Array, Object],
        default: ''
      }
    },

    computed: {
      isActive () {
        let active = false
        try {
          let componentName = 'CollapseGroup'
          let parent = this.$parent || this.$root
          let name = parent.$options.componentName
          while (parent && (!name || name !== componentName)) {
            parent = parent.$parent

            if (parent) {
              name = parent.$options.componentName
            }
          }
          active = parent.list.indexOf(this.name) > -1
        } catch (error) {
          active = false
        }
        return active
      }
    },

    methods: {
      handCollapse (e) {
        this.dispatch('CollapseGroup', 'collapse-click', this.name)
      },
      transition (e) {
        this.$emit('transition', e)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .collapse
    font-size 13px
    &-titleWrap
      position relative
      display flex
      align-items center
      color #48576a
      cursor pointer
      text-indent 10px
      height 45px
      line-height 45px
      box-sizing border-box
      border-bottom 1px solid #dfe6ec
      overflow hidden
      &-icon
        margin 0 15px
        width 16px
        height 16px
        transition all .3s ease
      &-title
        flex 1
        height 100%
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
    &-bodyWrap
      background-color #fbfdff
      color #1f2d3d
      line-height 35px

  .collapse[open=open]
    .collapse-titleWrap-icon
      transform rotate(90deg)
</style>
