import { Routes } from '@angular/router';
import { CorePage } from './core/core.page';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPage } from './core/pages/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CorePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/router').then(
            (mod) => mod.DASHBOARD_ROUTES
          ),
      },
      {
        path: 'pokemon',
        loadChildren: () =>
          import('./modules/pokemon/router').then((mod) => mod.POKEMON_ROUTES),
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
