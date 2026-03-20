import { Routes } from '@angular/router';
import { Info } from './info/info';
import { Users } from './users/users';
import { Party } from './party/party';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Info
    },
    {
        path: 'users',
        component: Users,
        canActivate: [authGuard]
    },
    {
        path: 'party',
        component: Party,
        canActivate: [authGuard]
    }
];
