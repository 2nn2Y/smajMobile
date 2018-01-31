/**
 * Created by apple on 2017/6/23.
 */
import todoRow from './todo_row'
import emergencyRow from './emergency_row'
import page from './page'
import AlertWrap from './alert_wrap'
import RecordRow from './record_row'
import ImgList from './img_list'

const components = {
  'ytPage': page,
  'ytTodoRow': todoRow,
  'ytEmergencyRow': emergencyRow,
  'ytAlertWrap': AlertWrap,
  'ytRecordRow': RecordRow,
  'ytImgList': ImgList
}
export default {
  install (Vue) {
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}
