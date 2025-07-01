import { Route } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { DashboardWrapperPage } from './pages/dashboard-wrapper.page';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'dashboard' }],
    component: DashboardPage,
    children: [
      {
        path: '',
        component: DashboardWrapperPage,
      },
    ],
  },
];
