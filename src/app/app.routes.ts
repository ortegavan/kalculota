import { Routes } from '@angular/router';
import { NfComponent } from './components/nf/nf.component';

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
        path: '**',
        redirectTo: 'nf',
    },
];
