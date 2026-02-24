import { Routes } from '@angular/router';
import { Info } from './info/info';
import { Users } from './users/users';
import { Party } from './party/party';

export const routes: Routes = [
    {
        path: '',
        component: Info
    },
    {
        path: 'users',
        component: Users
    },
    {
        path: 'party',
        component: Party
    }
];
