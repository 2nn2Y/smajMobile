/**
 * Created by mas on 2017/11/19.
 */
class EventEmitter {
  constructor() {
    this._events = {}
  }

  _lister(type, fn, context = this) {
    if (!this._events[type]) {
      this._events[type] = []
    }

    this._events[type].push([fn, context])
  }

  _trigger(type) {
    let events = this._events[type]
    if (!events) {
      return
    }

    let len = events.length
    let eventsCopy = [...events]
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i]
      let [fn, context] = event
      if (fn) {
        let res = fn.apply(context, [].slice.call(arguments, 1))
        if (!res) {
          break
        }
      }
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$backbutton = new EventEmitter()
  }
}
