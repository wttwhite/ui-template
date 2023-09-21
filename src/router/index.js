import VueRouter from 'vue-router'
import commonTable from '@/views/common-table'
import commonTableAddEdit from '@/views/common-table/add-edit'
import commonTableDetail from '@/views/common-table/detail'
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
  {
    path: '/commonTableAddEdit',
    name: 'commonTableAddEdit',
    meta: {
      name: '表格示例-新增编辑',
    },
    component: commonTableAddEdit,
  },
  {
    path: '/commonTableDetail',
    name: 'commonTableDetail',
    meta: {
      name: '表格示例-详情',
    },
    component: commonTableDetail,
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
