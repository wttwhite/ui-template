import request from './index'

// 上传图片
export function uploadToId(data) {
  return request({
    url: `app/baseserver/fileInfo/uploadToId`,
    method: 'POST',
    data,
  })
}
// 文件删除
export function removeById(params) {
  return request({
    url: `app/baseserver/fileInfo/removeById`,
    method: 'get',
    params,
  })
}
// 通过id获取文件的详细信息
export function getFileInfoByIds(data) {
  return request({
    url: `app/baseserver/fileInfo/getFileInfoByIds`,
    method: 'POST',
    data,
  })
}
