import request from './http'

// 获取当前用户数据
export function getCurrentUser() {
  return request({
    url: '/app/xbase/employee/user/getCurrentUser',
    method: 'get',
  })
}
// 获取当前用户详情
export function getCurrentDetail() {
  return request({
    url: '/app/xbase/employee/user/getCurrentDetail',
    method: 'GET',
  })
}
// 部门list
export function getDeptTree(params) {
  return request({
    url: '/app/xbase/employee/org/getDeptTree',
    method: 'get',
    params,
  })
}
// 机构树查询
export function getCompanyTree(params) {
  return request({
    url: '/app/xbase/employee/org/getCompanyTree',
    method: 'get',
    params,
  })
}
