import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueComponent} from './components/pages/queue/queue.component';
import {SeasonComponent} from './components/pages/season/season.component';
import {UserProfileComponent} from './components/pages/user-profile/user-profile.component';
import {ClassificaComponent} from './components/pages/classifica/classifica.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'queue',
        pathMatch: 'full',
    },
    {
        path: 'queue',
        component: QueueComponent,
        pathMatch: 'full',
    },
    {
        path: 'season',
        component: SeasonComponent,
        pathMatch: 'full',
    },
    {
        path: 'classifica',
        component: ClassificaComponent,
        pathMatch: 'full',
    },
    {
        path: 'users/:id',
        component: UserProfileComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'queue',
        pathMatch: 'full',
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
