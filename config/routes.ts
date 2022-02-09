export default [
  {
    exact: false,
    path: '/',
    component: '../layouts/index',
    routes: [
      { exact: true, path: '/', component: './Dashboard' },
      { exact: true, path: '/produktet', component: './Products' },
    ],
  },
];
