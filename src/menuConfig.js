// 菜单配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    text: '反馈',
    to: '//github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
    icon: 'cart',
  },
  {
    text: '帮助',
    to: '//alibaba.github.io/ice/',
    external: true,
    newWindow: true,
    icon: 'all',
  },
];

const asideMenuConfig = [
  // {
  //   name: '监控页',
  //   path: '/dashboard',
  // },
  {
    name: '垃圾管理',
    path: '/home',
  },
  // {
  //   name: '垃圾编辑',
  //   path: '/edit',
  // },
  // {
  //   name: '垃圾查看',
  //   path: '/view',
  // },
];

export { headerMenuConfig, asideMenuConfig };
