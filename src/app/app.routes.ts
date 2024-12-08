import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard/auth-guard.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=>import('./auth/auth.routes')
    },
    {
        path: 'admin',
        loadChildren: ()=>import('./admin/admin.routes'),
        canActivate: [AuthGuard]
    },
];
