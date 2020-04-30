import axios from 'axios'
axios.defaults.baseURL = 'https://open.duyiedu.com'
axios.interceptors.request.use(function (config) {
  // console.log(config)
  config.params = {
    ...config.params,
    appkey: 'lwb15035020365_1564097674808'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
