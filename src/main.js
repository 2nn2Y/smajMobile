import Vue from 'vue'
import router from './router'
import {ISDEV} from '@/config'
import App from './App'
import basic from './basic'
import project from './project'
import store from './vuex/store'
import module from './module'
import directives from './directives'
import filters from './filters'
import backbutton from './utils/event'

Vue.use(backbutton)
Vue.use(basic)
Vue.use(project)
Vue.use(filters)
Vue.use(directives)
Vue.use(module)

Vue.config.productionTip = false

function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge)
    }, false)
  }
}

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init()
  ready()
  bridge.registerHandler('clickBackButton', function(data, responseCallback) {
    window.app.$backbutton._trigger('clickBack')
    responseCallback(null)
  })
})
if (ISDEV) {
  ready()
}
function ready() {
  /* eslint-disable no-new */
  window.app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })
}
