export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: '/user/register', component: './User/Register' },
      // { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      { path: '/', redirect: '/dashboard/workplace' },
      { path: '/contract/template/:type', component: './contract/Template' },
      { path: '/contract/template/', component: './contract/Template' },
      { path: '/contract/create', redirect: '/contract/template' },
      { path: '/contract/create/:templateId', component: './contract/StepForm' },
      // 采购合同模版列表页面
      { path: '/purchase_contract/template/', component: './purchaseContract/Template' },

      // 采购合同模版创建页面
      {
        path: '/purchase_contract/template/create',
        component: './purchaseContract/TemplateCreate',
      },

      // 采购合同模版详情页面
      {
        path: '/purchase_contract/template/info/:templateId',
        component: './purchaseContract/TemplateInfo',
      },

      // 编辑合同信息
      { path: '/contract/edit/:contractId', component: './contract/StepForm' },
      { path: '/contract/fetch/:contractId', component: './contract/StepForm' },
      { path: '/dashboard/workplace', component: './Dashboard/Workplace' },

      // 主页--合同
      { path: '/dashboard/workplace/contract/:status', component: './Dashboard/Contract' },

      // 主页--模版
      { path: '/dashboard/workplace/template', component: './Dashboard/Template' },

      // 合同--状态
      { path: '/contract/status/:contractId', component: './Dashboard/Status' },
      // 劳务合同
      {
        path: '/labor',
        name: 'labor',
        icon: 'table',
        routes: [
          // 顶部菜单: 采购合同模版列表
          {
            // path: '/list/table-list',
            path: '/labor/template',
            // name: 'searchtable',
            name: 'template',
            // component: './List/TableList',
            component: './laborContract/Template',
          },
          // 顶部菜单: 采购合同模版列表
          {
            // path: '/list/table-list',
            path: '/labor/contract',
            // name: 'searchtable',
            name: 'contract',
            // component: './List/TableList',
            component: './laborContract/Contract',
          },
        ],
      },
      // 采购合同
      {
        path: '/purchase',
        name: 'purchase',
        icon: 'table',
        routes: [
          // 顶部菜单: 采购合同模版列表
          {
            // path: '/list/table-list',
            path: '/purchase/template',
            // name: 'searchtable',
            name: 'template',
            // component: './List/TableList',
            component: './purchaseContract/Template',
          },
          // 顶部菜单: 采购合同列表
          {
            // path: '/list/table-list',
            path: '/purchase/contract',
            // name: 'searchtable',
            name: 'contract',
            // component: './List/TableList',
            component: './purchaseContract/Contract',
          },
        ],
      },
      {
        path: '/profile',
        // name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        // name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        // name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'system',
        icon: 'setting',
        path: '/system',
        routes: [
          {
            path: '/system/dict',
            name: 'dict',
            component: './System/Dict',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            // name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
