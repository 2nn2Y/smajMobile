/**
 * Created by mas on 2017/9/18.
 */
import BScroll from 'better-scroll'

export default {
  inserted (el, binding) {
    if (!el._scroll) {
      let options = binding.value || {}
      let obj = binding.modifiers || {}
      Object.assign(options, obj)
      el._scroll = new BScroll(el, options)
      // 监听事件
      let events = options.events || {}
      for (let key in events) {
        el._scroll.on(key, events[key])
      }
    }
  },
  componentUpdated (el, binding) {
    el._scroll.refresh()
  },
  unbind (el) {
    // el._scroll.destroyed()
  }
}
