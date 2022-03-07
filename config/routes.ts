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
      { exact: true, path: '/produktet', component: './Products', access: 'canViewProducts' },
      { exact: true, path: '/kategorite', component: './Categories', access: 'canViewCategories' },
      { exact: true, path: '/njesite-shitjes', component: './Categories' },
      { exact: true, path: '/perdoruesit', component: './Categories' },
      { exact: true, path: '/konfigurime', component: './Categories' },
      { exact: true, path: '/furnizuesit', component: './Suppliers' },
    ],
  },
];
