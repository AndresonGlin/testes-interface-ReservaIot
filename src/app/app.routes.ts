import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard-guard';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
    },
    {
        path: "",
        loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/global-dashboard/global-dashboard').then(m => m.GlobalDashboard)
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];
