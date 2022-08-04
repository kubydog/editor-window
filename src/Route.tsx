import React from 'react';
import { RoutesType } from '@mjgaletto/redirect/lib';
import Home from './Home';
import Settings from './Settings';

const Routes:RoutesType[] = [
  {
    id: 1,
    name: 'Index',
    component: <Home />,
    path: '/',
    exact: true,
  },
  {
    id: 2,
    name: 'Admission',
    component: <Settings />,
    path: '/admission',
    exact: false,
  },
];
export default Routes;
