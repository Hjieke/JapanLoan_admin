import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'
import CommonView from '@/layouts/CommonView'

// 路由配置
const options = {
  routes: [{
    path: '/login',
    name: '登录页',
    component: () => import('@/pages/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/exception/404'),
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/403'),
  },
  {
    path: '/',
    name: '首页',
    component: TabsView,
    redirect: '/stationservicemanage',
    children: [

      {
        path: 'stationservicemanage',
        name: '系统管理',
        meta: {
          icon: 'database'
        },
        component: CommonView,
        children: [{
          path: 'wjgl',
          name: '用户信息',
          component: () => import('@/pages/ywyy/yhgl/wjgl.vue'),
        },
        {
          path: 'jklb',
          name: '借款列表',
          component: () => import('@/pages/ywyy/zwgl/jklb.vue'),
        },
        {
          path: 'kfgl',
          name: '客服管理',
          component: () => import('@/pages/ywyy/zwgl/kfgl.vue'),
        },
        {
          path: 'spzt',
          name: '审批状态管理',
          component: () => import('@/pages/ywyy/zwgl/spzt.vue'),
        },
        {
          path: 'xtsz',
          name: '系统设置',
          component: () => import('@/pages/ywyy/zwgl/xtsz.vue'),
        },
        {
          path: 'xtszbank',
          name: '系统银行设置',
          component: () => import('@/pages/ywyy/zwgl/xtsz_bank.vue'),
        },
        {
          path: 'txjl',
          name: '提现记录',
          component: () => import('@/pages/ywyy/zwgl/txjl.vue'),
        },

        {
          path: 'ipfw',
          name: 'IP访问查看',
          component: () => import('@/pages/ywyy/zwgl/ipfw.vue'),
        },
        
          // {
          //   path: 'htgl',
          //   name: '合同管理',
          //   component: () => import('@/pages/ywyy/zwgl/htgl.vue'),
          // },
          // {
          //   path: 'cspz',
          //   name: '参数配置',
          //   component: () => import('@/pages/ywyy/zwgl/cspz.vue'),
          // },
          // {
          //   path: 'gggl',
          //   name: '公告管理',
          //   component: () => import('@/pages/ywyy/zwgl/gggl.vue'),
          // },
        ]
      },
      // {
      //   path: 'usermanage',
      //   name: '用户管理',
      //   meta: {
      //     icon: 'form'
      //   },
      //   component: PageView,
      //   children: [{
      //     path: 'demo2',
      //     name: '演示页面2',
      //     component: () => import('@/pages/demo'),
      //   }]
      // },
      // {
      //   path: 'exception',
      //   name: '异常页',
      //   meta: {
      //     icon: 'warning',
      //   },
      //   component: BlankView,
      //   children: [{
      //       path: '404',
      //       name: 'Exp404',
      //       component: () => import('@/pages/exception/404')
      //     },
      //     {
      //       path: '403',
      //       name: 'Exp403',
      //       component: () => import('@/pages/exception/403')
      //     },
      //     {
      //       path: '500',
      //       name: 'Exp500',
      //       component: () => import('@/pages/exception/500')
      //     }
      //   ]
      // },
      // {
      //   name: '验权页面',
      //   path: 'auth/demo',
      //   meta: {
      //     icon: 'file-ppt',
      //     authority: {
      //       permission: 'form',
      //       role: 'manager'
      //     },
      //     component: () => import('@/pages/demo')
      //   }
      // }
    ]
  }
  ]
}

export default options