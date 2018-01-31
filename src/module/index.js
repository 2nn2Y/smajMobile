/**
 * Created by mas on 2017/11/3.
 */
import loading from './loading'
import confim from './confim'
import toast from './toast'
import picker from './picker'
import alert from './alert'
import previewImg from './previewImg'
import previewVideo from './previewVideo'
import insContent from './insContent'
import insRecord from './insRecord'
const module = {
  loading,
  confim,
  toast,
  picker,
  alert,
  previewImg,
  previewVideo,
  insContent,
  insRecord
}
export default {
  install (Vue) {
    for (let key in module) {
      let el = document.createElement('div')
      document.body.appendChild(el)
      let Com = Vue.extend(module[key])
      module[key] = new Com().$mount(el)
      Vue.prototype.$module = module
    }
  }
}
