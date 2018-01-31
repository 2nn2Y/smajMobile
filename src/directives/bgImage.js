/**
 * Created by mas on 2017/9/19.
 */
export default {
  inserted (el, binding) {
    let ctx = el.getContext('2d')
    let w = el.width = window.innerWidth
    let h = el.height = window.innerHeight
    let img = document.createElement('img')
    img.src = binding.value
    img.onload = function () {
      ctx.drawImage(img, 0, 0, w, h)
    }
  },
  componentUpdated (el, binding) {
  },
  unbind (el) {
  }
}
