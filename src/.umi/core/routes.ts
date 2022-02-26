// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/home/user/Desktop/fiskalizimi_new/fiskalizimi-front-end-v2/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": false,
    "path": "/",
    "component": require('/home/user/Desktop/fiskalizimi_new/fiskalizimi-front-end-v2/src/layouts/index').default,
    "routes": [
      {
        "exact": true,
        "path": "/",
        "component": require('/home/user/Desktop/fiskalizimi_new/fiskalizimi-front-end-v2/src/pages/Dashboard').default
      },
      {
        "exact": true,
        "path": "/produktet",
        "component": require('/home/user/Desktop/fiskalizimi_new/fiskalizimi-front-end-v2/src/pages/Products').default
      },
      {
        "exact": true,
        "path": "/kategorite",
        "component": require('/home/user/Desktop/fiskalizimi_new/fiskalizimi-front-end-v2/src/pages/Categories').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
