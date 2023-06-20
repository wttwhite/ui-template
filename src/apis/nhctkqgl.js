import request from './index'

// 导出
export function exportExcel(data) {
  return request({
    url: `/check-on-work/exportExcel`,
    method: 'post',
    data,
    responseType: 'blob',
  })
}
// 导出模板
export function exportExcelModel() {
  return request({
    url: `/check-on-work/exportExcelModel`,
    method: 'post',
    responseType: 'blob',
  })
}
// 导入
export function importExcel(data) {
  return request({
    url: `/check-on-work/importExcel`,
    method: 'post',
    data,
  })
}
// 考勤编辑
export function updateCheckOnWork(data) {
  return request({
    url: `/check-on-work/updateCheckOnWork`,
    method: 'post',
    data,
  })
}
