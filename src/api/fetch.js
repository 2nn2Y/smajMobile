/**
 * Created by mas on 2017/11/16.
 */
import axios from 'axios'
import {ISDEV, API_PREFIX} from '@/config'

axios.interceptors.request.use((config) => {
  if (config.url.match('^http|^https')) {
    return config
  }
  if (!ISDEV) {
    config.url = API_PREFIX + config.url
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  return Promise.resolve(res.data)
}, (res) => {
  let result = {
    result: null,
    success: false,
    unAuthorizedRequest: false,
    error: {
      message: ''
    }
  }
  if (res.response && res.response.data && res.response.data.error) {
    result = res.response.data
  } else {
    window.app.$module.toast.show({msg: '网络错误, 请检查网络!', type: 'error', time: 2000})
  }
  return Promise.resolve(result)
})

export default axios
