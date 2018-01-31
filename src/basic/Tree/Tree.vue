<template>
  <div class="tree-node">
    <div v-for="(data, index) in datas"
         @click.stop="toggleShow(index, data, $event)"
         :showBody="showList[index]">
      <div slot="title" class="tree-node-title">
        <div
          :style="marginStyle"
          class="tree-icon-wrap"
          :class="{'tree-icon-wrap-open': showList[index]}">
          <img src="./right.png" v-if="data.children.length > 0" class="tree-icon-down"/>
        </div>
        <i v-if="showFileIcon" class="icon icon-folder-close tree-icon-down"></i>
        <span class="tree-node-text">
          {{data.text}}
          <img v-if="data.state && data.state.length > 0" @click.stop="desc(data.state)" style="position: relative; top: 5px; margin-left: 10px;width: 20px;" src="./desc.png">
        </span>
        <yt-checkbox v-if="showCheck" class="tree-checkIcon" :label="data"></yt-checkbox>
      </div>
      <yt-collapse-transition :show="showList[index]" v-if="data.children.length > 0">
        <v-tree :showCheck="showCheck"
                :showFileIcon="showFileIcon"
                @node-click="emitEvent"
                :datas="data.children"
                :index="nextIndex"></v-tree>
      </yt-collapse-transition>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  const MARGINLEFT = 20
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      },

      datas: {
        type: Array,
        default () {
          return []
        }
      },

      // 表示当前节点所在的层级
      index: {
        type: Number,
        default: 0
      },

      // 开启手风琴模式
      accordion: {
        type: Boolean,
        default: false
      },

      showFileIcon: {
        type: Boolean,
        default: false
      },

      showCheck: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        showList: [],
        nextIndex: 0
      }
    },

    created () {
      this.nextIndex = this.index + 1
      let flag = this.open
      this.datas.forEach(() => {
        this.showList.push(flag)
      })
    },

    computed: {
      marginStyle () {
        return 'margin-left: ' + MARGINLEFT * this.index + 'px;'
      }
    },

    methods: {
      desc (item) {
        this.$module.alert.show(item)
      },
      toggleShow (index, data, event) {
        this.emitEvent(data, event.target, this)
        let list = !this.showList[index]
        if (this.accordion) {
          if (this.showList[index]) {
            this.showList.splice(index, 1, list)
            return
          }

          this.showList = []
          let flag = false
          this.datas.forEach(() => {
            this.showList.push(flag)
          })
        }
        this.showList.splice(index, 1, list)
      },

      emitEvent (data, target, component) {
        this.$emit('node-click', data, target, component)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .tree-node
    background-color: #fff
    height: auto
    line-height: 30px
    color: #333
    cursor: default

  .tree-node-title
    display: flex
    align-items: center
    background-color: #fff
    &-active
      background-color: rgb(228, 232, 241)
    &:hover
      background-color: rgb(228, 232, 241)

  .tree-node-text
    flex: 1
    line-height: 30px

  /* tree-icon 部分*/
  .tree-icon-wrap
    display: inline-block
    width: 30px
    height: 30px
    line-height: 30px
    vertical-align: middle
    transform: rotate(0deg)
    transition: all .3s linear
    &-open
      transform: rotate(90deg)

  .tree-icon-down
    position: absolute
    width: 15px
    height: 15px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    text-indent: 2px
    color: rgb(151, 168, 190)

  .tree-icon-check
    position: absolute
    width: 20px
    height: 20px
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    text-indent: 2px
    color: rgb(151, 168, 190)

  .tree-checkIcon
    margin-right: 15px

</style>
