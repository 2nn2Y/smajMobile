<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .row
    font-size: 13px
    &-title
      height 2.5em
      line-height 2.5em
      border-bottom 1px solid #f1f1f1
      background: #fff
      padding: 0 15px
      font-size: 1em
    &-body
      height 2.5em
      line-height 2.5em
      border-bottom 1px solid #f1f1f1
      display: flex
      padding-right: 5px
      font-size: 1em
      &-name
        font-size: 14px
        flex: 0 0 70px
        margin-left: 15px
      &-tag
        flex: 1
        span
          font-size: 12px
          color: #fff
          padding: 4px 15px
          border-radius: 10px
          background #7e8c8d
      &-phone
        font-size: 13px
        color: #20a0ff
        text-align: right
        flex: 1

  .search
    margin: 5px 0 5px 5%
    border-radius: 2px
    width: 90%
    font-size: .8em
    height: 2em
    line-height: 2em
    text-indent: 1em
    background: #f2f2f2

</style>

<template>
  <yt-page title="通讯联络">
    <div class="yt-scroll">
      <input v-model="key" placeholder="请搜索..." class="search yt-input" type="text">
      <yt-collapse-group>
        <yt-collapse :name="index" :title="item.title" :key="index" v-for="(item,index) in result">
          <p class="yt-noInfo" v-if="item.options.length===0">暂无相关信息</p>
          <p class="row-body" v-for="option in item.options">
            <span class="row-body-name">{{option.name}}</span>
            <span class="row-body-tag"><span v-if="option.tag.length">{{option.tag}}</span></span>
            <a class="row-body-phone" :href="`tel:${option.phone}`">{{option.phone}}</a>
          </p>
        </yt-collapse>
      </yt-collapse-group>
    </div>
  </yt-page>
</template>

<script type="text/ecmascript-6">
  import {GetAddressPersonList} from '@/api'
  export default {
    name: 'CommunicationContact',
    data () {
      return {
        key: '',
        AddressPersonList: []
      }
    },
    computed: {
      result () {
        if (!this.key) {
          return this.AddressPersonList
        }
        let reg = new RegExp(this.key)
        let result = []
        this.AddressPersonList.forEach(item => {
          let obj = {
            title: item.title,
            options: []
          }
          obj.options = item.options.filter(function (person) {
            return person.name.match(reg)
          })
          if (obj.options.length > 0) {
            result.push(obj)
          }
        })
        return result
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        let res = await GetAddressPersonList()
        this.AddressPersonList = [].concat(res.map(item => {
          return {
            title: item.text,
            options: item.children.map(person => {
              return {
                name: person.text,
                tag: person.attributes.jobTitle,
                phone: person.attributes.tel
              }
            })
          }
        }))
      }
    }
  }
</script>
