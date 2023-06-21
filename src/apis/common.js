import request from './index'
// 表格搜索页面列表
export function getPageApi(url, method, data) {
  const params =
    method === 'post'
      ? {
          data,
        }
      : { params: data }
  return request({
    url,
    method,
    ...params,
  })
}
