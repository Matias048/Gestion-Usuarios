import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
     {
        path: '',
        redirectTo: 'home' ,
        pathMatch: 'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path: 'user', 
        loadChildren: () => import('./entities/user/user.routes').then(m => m.USER_ROUTES)
    }
];
