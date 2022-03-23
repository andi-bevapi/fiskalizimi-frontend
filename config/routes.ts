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
      { exact: true, path: '/kategorite', component: './Categories' },
      { exact: true, path: '/pikat-shitjes', component: './BranchList' },
      { exact: true, path: '/njesite-shitjes', component: './SellingUnits' },
      { exact: true, path: '/perdoruesit', component: './Users' },
      { exact: true, path: '/konfigurime', component: './Categories' },
      { exact: true, path: '/furnizuesit', component: './Suppliers' },
    ],
  },
];
