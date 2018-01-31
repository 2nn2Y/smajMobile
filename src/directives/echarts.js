/**
 * Created by mas on 2017/9/18.
 */
import echarts from 'echarts'
export default {
  inserted (el, binding) {
    if (!el._echarts) {
      el._echarts = echarts.init(el)
    }
    el._echarts.setOption(binding.value)
  },
  componentUpdated (el, binding) {
    el._echarts.setOption(binding.value)
  },
  unbind (el) {
    el._echarts = null
  }
}
