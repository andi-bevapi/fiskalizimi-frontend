// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/Mateo/Desktop/repos/fiskalizimi/fiskalizimi-front-end-v2/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": false,
    "path": "/",
    "component": require('C:/Users/Mateo/Desktop/repos/fiskalizimi/fiskalizimi-front-end-v2/src/layouts/index').default,
    "routes": [
      {
        "exact": true,
        "path": "/",
        "component": require('C:/Users/Mateo/Desktop/repos/fiskalizimi/fiskalizimi-front-end-v2/src/pages/Dashboard').default
      },
      {
        "exact": true,
        "path": "/produktet",
        "component": require('C:/Users/Mateo/Desktop/repos/fiskalizimi/fiskalizimi-front-end-v2/src/pages/Products').default
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
