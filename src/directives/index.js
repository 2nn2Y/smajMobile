import scroll from './scroll'
import echarts from './echarts'
import bgImage from './bgImage'
const directives = {
  scroll,
  echarts,
  bgImage
}

export default {
  install (Vue) {
    for (let key in directives) {
      Vue.directive(key, directives[key])
    }
  }
}
