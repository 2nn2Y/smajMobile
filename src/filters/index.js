/**
 * Created by mas on 2017/9/18.
 */
import array2String from './array2String'
import formatTime from './formatTime'
import friendlyFileSize from './friendlyFileSize'
import friendlyTime from './friendlyTime'
import parseTimeToString from './parseTimeToString'

const directives = {
  array2String,
  formatTime,
  friendlyFileSize,
  friendlyTime,
  parseTimeToString
}

export default {
  install (Vue) {
    for (let key in directives) {
      Vue.filter(key, directives[key])
    }
  }
}

