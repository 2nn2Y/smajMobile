import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () => import('./登录')
const main = () => import('./Main')
const uploadAvatar = () => import('./上传头像')
const xzzf = () => import('./行政执法')
const dbsx = () => import('./待办事项')
const tjfx = () => import('./统计分析')
const qylxtj = () => import('./企业类型统计')
const qyxx = () => import('./企业信息')
const qyxxdetail = () => import('./企业信息详情')
const zdwxy = () => import('./重大危险源')
const zdwxydetail = () => import('./重大危险源详情')
const yjjy = () => import('./应急救援')
const sgjk = () => import('./事故简况')
const zsk = () => import('./知识库')
const zjk = () => import('./专家库')
const zjkdetail = () => import('./专家库详情')
const txll = () => import('./通信联络')
const zxtz = () => import('./最新通知')
const zxtzdetail = () => import('./最新通知详情')
const zfjcrw = () => import('./执法检查任务')
const zgfcrw = () => import('./整改复查任务')
const zlzgsh = () => import('./责令整改审核')
const yjzhb = () => import('./应急指挥部')
const yjdw = () => import('./应急队伍')
const yjwz = () => import('./应急物资')
const bncs = () => import('./避难场所')
const yjsp = () => import('./应急视频')
const yjspdetail = () => import('./应急视频详情')
const yjzj = () => import('./应急专家')
const cgqxx = () => import('./传感器信息')
const cgqxxdetail = () => import('./传感器详情')
const iframePlay = () => import('./IframePlay')
const zfwstj = () => import('./执法文书统计')
const zfyjxq = () => import('./执法依据详情')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'login'
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      meta: {
        index: 0
      }
    },
    {
      path: '/main',
      name: '首页',
      component: main,
      query: {
        userId: 0,
        userRoleType: 0,
        page: 0
      },
      meta: {
        index: 1
      }
    },
    {
      path: '/uploadAvatar',
      name: '上传头像',
      component: uploadAvatar,
      meta: {
        index: 2
      }
    },
    {
      path: '/xzzf',
      name: '行政执法',
      component: xzzf,
      query: {
        userId: 0
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/dbsx',
      name: '待办事项',
      component: dbsx,
      query: {
        userId: 0,
        userRoleType: 0
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/tjfx',
      name: '统计分析',
      component: tjfx,
      meta: {
        index: 2
      }
    },
    {
      path: '/qylxtj',
      name: '企业类型统计',
      component: qylxtj,
      meta: {
        index: 3
      }
    },
    {
      path: '/qyxx',
      name: '企业信息',
      component: qyxx,
      meta: {
        index: 3
      }
    },
    {
      path: '/qyxx/detail/:id',
      name: '企业信息详情',
      component: qyxxdetail,
      meta: {
        index: 4
      }
    },
    {
      path: '/zdwxy',
      name: '重大危险源',
      component: zdwxy,
      meta: {
        index: 2
      }
    },
    {
      path: '/zdwxy/detail/:id',
      name: '重大危险源详情',
      component: zdwxydetail,
      meta: {
        index: 3
      }
    },
    {
      path: '/yjjy',
      name: '应急救援',
      component: yjjy,
      query: {
        userId: 0,
        enterpriseId: 0,
        AccidentId: 0
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/sgjk',
      name: '事故简况',
      component: sgjk,
      query: {
        AccidentId: 0,
        enterpriseId: 0,
        userId: 0,
        isStart: true
      },
      meta: {
        index: 3
      }
    },
    {
      path: '/zsk',
      name: '知识库',
      component: zsk,
      meta: {
        index: 2
      }
    },
    {
      path: '/zjk',
      name: '专家库',
      component: zjk,
      meta: {
        index: 2
      }
    },
    {
      path: '/zjk/detail/:id',
      name: '专家库详情',
      component: zjkdetail,
      meta: {
        index: 11
      }
    },
    {
      path: '/txll',
      name: '通信联络',
      component: txll,
      meta: {
        index: 2
      }
    },
    {
      path: '/zxtz',
      name: '最新通知',
      component: zxtz,
      meta: {
        index: 2
      }
    },
    {
      path: '/zxtzdetail',
      name: '最新通知详情',
      component: zxtzdetail,
      query: {
        announcementId: '',
        id: ''
      },
      meta: {
        index: 3
      }
    },
    {
      path: '/zfjcrw',
      name: '执法检查任务',
      component: zfjcrw,
      meta: {
        index: 3
      }
    },
    {
      path: '/zgfcrw',
      name: '整改复查任务',
      component: zgfcrw,
      query: {
        userId: 0,
        enterpriseId: 0,
        enterprise: '',
        inspectTaskId: 0,
        taskId: 0
      },
      meta: {
        index: 3
      }
    },
    {
      path: '/zlzgsh',
      name: '责令整改审核',
      component: zlzgsh,
      query: {
        company: '',
        companyId: 0,
        taskId: 0,
        instructionId: 0
      },
      meta: {
        index: 3
      }
    },
    {
      path: '/yjzhb',
      name: '应急指挥部',
      component: yjzhb,
      meta: {
        index: 4
      }
    },
    {
      path: '/yjdw',
      name: '应急队伍',
      component: yjdw,
      meta: {
        index: 5
      }
    },
    {
      path: '/yjwz',
      name: '应急物资',
      component: yjwz,
      meta: {
        index: 5
      }
    },
    {
      path: '/bncs',
      name: '避难场所',
      component: bncs,
      meta: {
        index: 5
      }
    },
    {
      path: '/yjsp',
      name: '应急视频',
      component: yjsp,
      meta: {
        index: 3
      }
    },
    {
      path: '/yjspdetail/:id',
      name: '应急视频详情',
      component: yjspdetail,
      meta: {
        index: 4
      }
    },
    {
      path: '/iframePlay',
      name: '播放',
      component: iframePlay,
      meta: {
        index: 5
      }
    },
    {
      path: '/yjzj',
      name: '应急专家',
      component: yjzj,
      query: {
        id: ''
      },
      meta: {
        index: 10
      }
    },
    {
      path: '/cgqxx',
      name: '传感器信息',
      component: cgqxx,
      query: {
        id: ''
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/cgqxxdetail/:id',
      name: '传感器详情',
      component: cgqxxdetail,
      meta: {
        index: 10
      }
    },
    {
      path: '/zfwstj',
      name: '执法文书统计',
      component: zfwstj,
      meta: {
        index: 3
      }
    },
    {
      path: '/zfyjxq',
      name: '执法依据详情',
      component: zfyjxq,
      query: {
        id: 0
      },
      meta: {
        index: 10
      }
    }
  ]
})
