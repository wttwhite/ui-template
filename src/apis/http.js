import arkfun from 'arkfun'
import { Message } from 'element-ui'
const { _axios } = arkfun
const request = _axios({
  context: 'context-seat', //上下文
  env: 'app', //服务环境, 目前 app,wx
  authentication: true, //是否进行鉴权
  token:
    process.env.NODE_ENV == 'production'
      ? null
      : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsImF1ZCI6ImhzamEtYXJjLXJlYWN0b3ItdXNlciIsImV4cCI6MTY4NjkwNzgzMzU1NywiaWF0IjoxNjg2OTAwNjMzNTU3LCJpc3MiOiJoc2phLWRldiIsImp0aSI6IjM4OWU3Njg1LTg0OGYtNDVlNS1iNmUxLWU0NTZmMGI1YjA3ZSIsIm5iZiI6MTY4NjkwMDYzMzU1Nywib3JncyI6WzI1MiwyNDNdLCJyb2xlcyI6WzEsMTUxLDE1N10sInN1YiI6ImFyYy1yZWFjdG9yIiwidXNlcklkIjo1MzAsInVzZXJuYW1lIjoieWYxIn0.UCXs9Qxik_9CLqjOVM3xBUyaP_NaSxmXEkO3UpJ7F0I', //开发环境调试的token
  createOption: {
    timeout: 500000,
  }, //请求实例创建自定义配置
  callback: (res) => {
    if (res.data instanceof Blob) {
      return res
    }
    let data = res.data
    if (data.code !== 0 && data.code !== '0' && data.code !== 200) {
      Message.warning(data.msg || '服务器错误')
      return Promise.reject(data.data)
    } else {
      return data.data
    }
  }, //接口返回自定义处理函数
  headerOption: {}, //自定义请求头
  configOptionFun: (config) => {
    //请求配置自定义配置
    if (!config.url) return config
    // 用到的其他组件上下文接口
    if (config.url.includes('xbase') || config.url.includes('gtree')) {
      config.baseURL = process.env.NODE_ENV == 'production' ? '' : '/devKey'
    }
    if (config.header) {
      config.headers = { ...config.headers, ...config.header }
    }
    return config
  },
})

export default request
