import VueRouter from 'vue-router'

import attendanceManage from '@/views/attendance-manage'
import attendanceDefinite from '@/views/attendance-definite'

const routes = [
  {
    path: '/',
    redirect: '/attendanceManage',
  },
  {
    path: '/attendanceManage',
    name: 'attendanceManage',
    meta: {
      name: '考勤管理',
      menu: true,
    },
    component: attendanceManage,
  },
  {
    path: '/attendanceDefinite',
    name: 'attendanceDefinite',
    meta: {
      name: '考勤明细',
      menu: true,
    },
    component: attendanceDefinite,
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

export default routes
