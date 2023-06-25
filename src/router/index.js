import VueRouter from 'vue-router'
import commonTable from '@/views/common-table'
const routes = [
  {
    path: '/',
    redirect: '/commonTable',
  },
  {
    path: '/commonTable',
    name: 'commonTable',
    meta: {
      name: '表格示例',
      menu: true,
    },
    component: commonTable,
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
