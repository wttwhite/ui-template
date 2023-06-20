import request from './index'
// 字典
export function getDictInfoList(data) {
  return request({
    url: '/app/gtree/dict-info/dictInfoList',
    method: 'post',
    data,
  })
}
