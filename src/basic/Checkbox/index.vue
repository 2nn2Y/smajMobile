<template>
  <label @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchcancel="handleTouchEnd" @click.stop="handleClick"
    class="mu-checkbox" :class="{'disabled': disabled}" :style="`color:${activeColor}`">
    <input type="checkbox" :disabled="disabled" :name="name" @change="handleChange" v-model="inputValue">
    <yt-touch-ripple :centerRipple="true" v-if="!disabled" rippleWrapperClass="mu-checkbox-ripple-wrapper" class="mu-checkbox-wrapper">
      <div class="mu-checkbox-icon">
        <svg class="mu-checkbox-icon-uncheck mu-checkbox-svg-icon" :class="iconClass" v-if="!checkedIcon" viewBox="0 0 24 24">
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>
        <svg class="mu-checkbox-icon-checked mu-checkbox-svg-icon" :class="iconClass" v-if="!uncheckIcon" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </yt-touch-ripple>
    <div class="mu-checkbox-wrapper" v-if="disabled">
      <div class="mu-checkbox-icon">
        <svg class="mu-checkbox-icon-uncheck mu-checkbox-svg-icon" :class="iconClass" v-if="!checkedIcon" viewBox="0 0 24 24">
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>
        <svg class="mu-checkbox-icon-checked mu-checkbox-svg-icon" :class="iconClass" v-if="!uncheckIcon" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>
  </label>
</template>

<script>
import {dispatch} from '@/mixins'
export default {
  name: 'mu-checkbox',
  mixins: [dispatch],
  props: {
    name: {
      type: [String, Number]
    },
    label: {},
    disabled: {
      type: Boolean,
      default: false
    },
    uncheckIcon: {
      type: String,
      default: ''
    },
    checkedIcon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: [String, Object, Array]
    },
    centerRipple: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      default: '#03a9f5'
    }
  },
  data () {
    return {
      inputValue: null
    }
  },
  created () {
    this.inputValue = this.isActive
  },
  computed: {
    isActive () {
      let active = false
      try {
        let componentName = 'CheckboxGroup'
        let parent = this.$parent || this.$root
        let name = parent.$options.componentName

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent

          if (parent) {
            name = parent.$options.componentName
          }
        }
        active = parent.value.indexOf(this.label) > -1
      } catch (error) {
        active = false
      }
      return active
    }
  },
  watch: {
    isActive (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClick (e) {
      if (e._constructed) {
        this.inputValue = !this.inputValue
        this.handleChange()
      }
    },
    handleMouseDown (event) {
      if (this.disabled) return
      if (event.button === 0) {
        this.$children[0].start(event)
      }
    },
    handleMouseUp () {
      if (this.disabled) return
      this.$children[0].end()
    },
    handleMouseLeave () {
      if (this.disabled) return
      this.$children[0].end()
    },
    handleTouchStart (event) {
      if (this.disabled) return
      this.$children[0].start(event)
    },
    handleTouchEnd () {
      if (this.disabled) return
      this.$children[0].end()
    },
    handleChange () {
      this.$emit('change', this.inputValue)
      this.dispatch('CheckboxGroup', 'checkbox-click', this.label)
    }
  }
}
</script>

<style lang="less" type="text/less">
.mu-checkbox {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  input[type="checkbox"] {
    display: none;
    &:checked {
      + .mu-checkbox-wrapper {
        .mu-checkbox-icon-uncheck{
          opacity: 0;
          transition: opacity 650ms ease 150ms;
          color: currentColor;
        }
        .mu-checkbox-icon-checked{
          opacity: 1;
          transform: scale(1);
          transition: opacity 0ms ease, transform 800ms ease;
        }
        .mu-checkbox-ripple-wrapper{
          color: currentColor;
        }
      }

    }
  }

  * {
    pointer-events: none;
  }
  &.disabled  {
    cursor: not-allowed;
  }
}

.mu-checkbox-wrapper{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.mu-checkbox-icon{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  position: relative;
}

.mu-checkbox-svg-icon{
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  user-select: none;
}

.mu-checkbox-icon-uncheck {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  transition: opacity 1s ease .2s;
  color: currentColor;
  .mu-checkbox.disabled & {
    color: currentColor
  }
}

.mu-checkbox-icon-checked {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  color: currentColor;
  transform: scale(0);
  transition: opacity 450ms ease, transform 0ms ease 450ms;
  .mu-checkbox.disabled & {
    color: currentColor;
  }
}

.mu-checkbox-ripple-wrapper {
  width: 48px;
  height: 48px;
  top: -12px;
  left: -12px;
  .mu-checkbox.label-left & {
      right: -12px;
      left: auto;
  }
}
</style>
