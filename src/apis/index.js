import arkfun from 'arkfun'
import { Message } from 'element-ui'
const { _axios } = arkfun
const request = _axios({
  context: 'nhctkqgl', //上下文
  env: 'app', //服务环境, 目前 app,wx
  authentication: true, //是否进行鉴权
  token:
    process.env.NODE_ENV == 'production'
      ? null
      : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwiYXVkIjoiaHNqYS1hcmMtcmVhY3Rvci11c2VyIiwiZXhwIjoxNjg2MjIwMDQyNjI4LCJpYXQiOjE2ODYyMTI4NDI2MjgsImlzcyI6ImhzamEtZGV2IiwianRpIjoiMmJiZTRhZWYtN2M4MC00YTZjLWJhOWItZmZlMTE2NDcyOWNmIiwibmJmIjoxNjg2MjEyODQyNjI4LCJvcmdzIjpbXSwicm9sZXMiOltdLCJzdWIiOiJhcmMtcmVhY3RvciIsInVzZXJJZCI6MCwidXNlcm5hbWUiOiJzeXNhZG1pbiJ9.JGBRHPbo86ncmavg3W894YhxJHzkeeVMOa_bKZQKitk', //开发环境调试的token
  createOption: {}, //请求实例创建自定义配置
  callback: (res) => {
    if (res.data instanceof Blob) {
      return res
    }
    let data = res.data
    if (data.code !== 0 && data.code !== '0' && data.code !== 200) {
      Message.warning(data.msg || data.datamessage)
      return Promise.reject(data.data)
    } else {
      return data.data
    }
  }, //接口返回自定义处理函数
  headerOption: {}, //自定义请求头
  configOptionFun: (config) => {
    //请求配置自定义配置
    // config.baseURL =
    //   process.env.NODE_ENV == 'production' ? config.baseURL : '/nhctkqgl'
    if (!config.url) return config
    if (
      config.url.includes('baseserver') ||
      config.url.includes('xbase') ||
      config.url.includes('xmgl') ||
      config.url.includes('gtree') ||
      config.url.includes('nhctcontract')
    ) {
      config.baseURL = process.env.NODE_ENV == 'production' ? '' : '/devKey'
    }

    if (config.header) {
      config.headers = { ...config.headers, ...config.header }
    }
    return config
  },
})

export default request
