<template>
  <div class="input-speech">
    <input class="input-speech-input"
           v-show="showInput"
           type="text"
           :value="value"
           @input="change"
           :placeholder="placeholder"
           :style="'text-align:' + align"
           v-bind="{readonly: disable}"/>
    <img @click="startRecognize"
         v-show="!disable"
         class="input-speech-speech"
         :src="speechSrc"
         alt="语言输入">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'InputSpeech',
    props: {
      disable: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      showInput: {
        type: Boolean,
        default: true
      },
      align: {
        type: String,
        default: 'right'
      },
      additional: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      speechSrc () {
        if (!this.disable) {
          return './static/img/speech.png'
        }
        return './static/img/speech-h.png'
      }
    },
    methods: {
      change (e) {
        this.$emit('input', e.target.value)
      },
      startRecognize () {
        if (this.disable) return
        WebViewJavascriptBridge.callHandler('speechToText', null, (str) => {
          if (this.additional) {
            this.$emit('input', this.value + str)
          } else {
            this.$emit('input', str)
          }
        })
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .input-speech
    display: flex
    align-items: center
    height: 100%
    padding: 0 10px
    box-sizing: border-box
    overflow: hidden
    &-input
      text-align: right
      flex: 1
      font-size: 14px
      height: 100%
      border: 0
      outline: 0
      background-color: transparent
      &:focus
        outline: 0
        border: 0
    &-speech
      width: 22px
      height: 22px
</style>
