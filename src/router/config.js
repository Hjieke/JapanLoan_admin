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
        // {
        //   path: 'index',
        //   name: '首页',
        //   meta: {
        //     icon: 'home'
        //   },
        //   component: () => import('@/pages/ywyy/yhgl/wjgl.vue')
        // },
        // {
        //   path: 'ipmanage',
        //   name: 'ip管理',
        //   meta: {
        //     icon: 'info-circle',
        //   },
        //   component: CommonView,
        //   children: [{
        //     path: 'ipblack',
        //     name: 'ip黑名单',
        //     component: () => import('@/pages/ywyy/ipgl/iphmd.vue'),
        //   }]
        // },
        // {
        //   path: 'usermanage',
        //   name: '用户管理',
        //   meta: {
        //     icon: 'user'
        //   },
        //   component: CommonView,
        //   children: [

        //     {
        //       path: 'wjgl',
        //       name: '玩家管理',
        //       component: () => import('@/pages/ywyy/yhgl/wjgl.vue'),
        //     },
        //     {
        //       path: 'ckjl',
        //       name: '存款记录',
        //       component: () => import('@/pages/ywyy/yhgl/ckjl.vue'),
        //     },
        //     {
        //       path: 'qkjl',
        //       name: '取款记录',
        //       component: () => import('@/pages/ywyy/yhgl/qkjl.vue'),
        //     },
        //     {
        //       path: 'wjyhk',
        //       name: '玩家银行卡',
        //       component: () => import('@/pages/ywyy/yhgl/wjyhk.vue'),
        //     },
        // {
        //   path: 'zjls',
        //   name: '资金流水',
        //   component: () => import('@/pages/ywyy/yhgl/zjls.vue'),
        // },
        // {
        //   path: 'wjdjpz',
        //   name: '玩家等级配置',
        //   component: () => import('@/pages/ywyy/yhgl/wjdjpz.vue'),
        // },
        // {
        //   path: 'ptyk',
        //   name: '平台盈亏',
        //   component: () => import('@/pages/ywyy/yhgl/ptyk.vue'),
        // },
        // {
        //   path: 'wjyk',
        //   name: '玩家盈亏',
        //   component: () => import('@/pages/ywyy/yhgl/wjyk.vue'),
        // },
        //   {
        //     path: 'yskj',
        //     name: '预设开奖',
        //     component: () => import('@/pages/ywyy/yhgl/yskj.vue'),
        //   },
        //  {
        //     path: 'gggl',
        //     name: '公告管理',
        //     component: () => import('@/pages/ywyy/zwgl/gggl.vue'),
        //   },
        //   ]
        // },
        // {
        //   path: 'lotterymanage',
        //   name: '彩票管理',
        //   meta: {
        //     icon: 'form'
        //   },
        //   children: [{
        //       path: 'czgl',
        //       name: '彩种管理',
        //       component: () => import('@/pages/demo'),
        //     },
        //     {
        //       path: 'tzjl',
        //       name: '投注记录',
        //       component: () => import('@/pages/demo'),
        //     },
        //     {
        //       path: 'fjgl',
        //       name: '房间管理',
        //       component: () => import('@/pages/demo'),
        //     },
        //     {
        //       path: 'tsld',
        //       name: '特殊漏洞',
        //       component: () => import('@/pages/demo'),
        //     },
        //     {
        //       path: 'yskj',
        //       name: '预设开奖',
        //       component: () => import('@/pages/demo'),
        //     },
        //     {
        //       path: 'sgkj',
        //       name: '手工开奖',
        //       component: () => import('@/pages/demo'),
        //     },
        //   ]
        // },
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
              path: 'xtsz',
              name: '系统设置',
              component: () => import('@/pages/ywyy/zwgl/xtsz.vue'),
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