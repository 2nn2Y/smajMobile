/**
 * Created by mas on 2017/8/30.
 */
export function merge(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i]
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

export function delayed(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function check(obj, msg) {
  for (let key in msg) {
    let li = key.split('.')
    if (li.length === 1) {
      let val = obj[key]
      if (!val) {
        return msg[key]
      } else {
        if (val instanceof Array && !val.length) {
          return msg[key]
        }
      }
    } else {
      let val = obj
      for (let i = 0; i < li.length; i++) {
        val = val[li[i]]
        if (!val) {
          return msg[key]
        } else {
          if (val instanceof Array && !val.length) {
            return msg[key]
          }
        }
      }
    }
  }
  return null
}

export function isNotNull(val) {
  return val !== undefined && val !== null
}

export function requestAnimationFrame() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, (callback.interval || 100 / 60) / 2)
    }
}

export function cancelAnimationFrame() {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (id) {
      window.clearTimeout(id)
    }
}

export function strongTest(options) {
  let color = options.color || 'red'

  let key = options.key
  let text = options.text + ''
  if (key) {
    let reg = new window.RegExp(key, 'i')
    return text.replace(reg, `<strong style="color: ${color}">${key}</strong>`)
  }
  return text
}

/**
 * 将 String, Object, Array 转成 Array
 */
export function convertClass(classes) {
  let newClasses = []
  if (!classes) return newClasses
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes)
  } else if (classes instanceof Object) {
    for (const name in classes) {
      if (classes[name]) newClasses.push(name)
    }
  } else {
    newClasses = newClasses.concat(classes.split(' '))
  }
  return newClasses
}

