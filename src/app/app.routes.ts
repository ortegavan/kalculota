import { Routes } from '@angular/router';
import { NfComponent } from './components/nf/nf.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'nf',
        pathMatch: 'full',
    },
    {
        path: 'nf',
        component: NfComponent,
    },
    {
        path: '404',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: '404',
    },
];
