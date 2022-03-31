export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        path: '/login',
        layout: false,
        component: './Login',
      }
    ],
  },
  {
    exact: false,
    path: '/',
    component: '../layouts',
    wrappers: [
      '@/wrappers/auth',
      '@/wrappers/permissions'
    ],
    routes: [
      { exact: true, path: '/', component: './Dashboard' },
      { exact: true, path: '/produktet', component: './Products', access: 'canViewProduct' },
      { exact: true, path: '/kategorite', component: './Categories', access: 'canViewCategory' },
      { exact: true, path: '/pikat-shitjes', component: './Branch', access: 'canViewBranch' },
      { exact: true, path: '/njesite-shitjes', component: './SellingUnits', access: 'canViewSellingUnit' },
      { exact: true, path: '/perdoruesit', component: './Users', access: 'canViewUser' },
      { exact: true, path: '/furnitoret', component: './Suppliers', access: 'canViewSupplier' },
      { exact: true, path: '/konfigurime', component: './Configurations' },
      { exact: true, path: '/edit-profile', component: './EditProfile' },
    ],
  },
];
