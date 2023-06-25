import request from './http'

// 获取表格数据
export function getPageDataApi(data) {
  return request({
    url: `/warn-edu-course/getPageDataApi`,
    method: 'post',
    data,
  })
}
// 导出
export function exportExcel(data) {
  return request({
    url: `/check-on-work/exportExcel`,
    method: 'post',
    data,
    responseType: 'blob',
  })
}
// 新增课程
export function saveWarnEduCourse(data) {
  return request({
    url: `/warn-edu-course/saveWarnEduCourse`,
    method: 'post',
    data,
  })
}
// 编辑课程 根据ID
export function updateWarnEduCourse(data) {
  return request({
    url: `/warn-edu-course/updateWarnEduCourse`,
    method: 'post',
    data,
  })
}
// 获取详情课程 根据ID
export function getCourseDetail(id) {
  return request({
    url: `/warn-edu-course/${id}`,
    method: 'get',
  })
}

// 编辑课程文件json根据课程ID和用户id,并修改该用户的课程状态,并新增我的学习记录
export function updateFileJsonByUserId(data) {
  return request({
    url: `/warn-edu-course/updateFileJsonByUserId`,
    method: 'post',
    data,
  })
}
// 学习平台
// 置顶操作
export function updateStudyPlatformCourseIsTop(data) {
  return request({
    url: `/study-platform-course/updateStudyPlatformCourseIsTop`,
    method: 'post',
    data,
  })
}
// 下架课程 根据ID
export function updateStudyPlatformCourseStatus(data) {
  return request({
    url: `/study-platform-course/updateStudyPlatformCourseStatus`,
    method: 'post',
    data,
  })
}
export function platformCourseDel(id) {
  return request({
    url: `/study-platform-course/delete/${id}`,
    method: 'get',
  })
}
// 完成人员列表
export function getFinishPersonList(id) {
  return request({
    url: `/study-platform-course/getFinishPersonList/${id}`,
    method: 'get',
  })
}
// 新增课程
export function saveStudyPlatformCourse(data) {
  return request({
    url: `/study-platform-course/saveStudyPlatformCourse`,
    method: 'post',
    data,
  })
}
// 编辑课程 根据ID
export function updateStudyPlatformCourse(data) {
  return request({
    url: `/study-platform-course/updateStudyPlatformCourse`,
    method: 'post',
    data,
  })
}
export function studyCourseDetail(id) {
  return request({
    url: `/study-platform-course/${id}`,
    method: 'get',
  })
}
// 查询我的学习课程详情 根据课程ID和userId
export function getStudyCourseByIdAndUserId(data) {
  return request({
    url: `/study-platform-course/getStudyCourseByIdAndUserId`,
    method: 'post',
    data,
  })
}
export function updateStudyIntroduce(data) {
  return request({
    url: `/study-platform-course/updateStudyPlatformCourseIntroduce`,
    method: 'post',
    data,
  })
}

// 我的学习
// 我的学习记录列表
export function myStudyRecordList(data) {
  return request({
    url: `/user-study-record/myStudyRecordList`,
    method: 'post',
    data,
  })
}
export function studyRecordDel(id) {
  return request({
    url: `/user-study-record/delete/${id}`,
    method: 'get',
  })
}
