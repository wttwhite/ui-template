import request from './http'

// 表格搜索页面列表
export function getPageDataApi(url, method, data) {
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

// 删除接口, 就是post
export function deleteCommonApi(url, data) {
  return request({
    url,
    method: 'post',
    data,
  })
}
