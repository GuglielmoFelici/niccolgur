import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueComponent} from './components/queue/queue.component';
import {SeasonComponent} from './components/season/season.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';


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
        path: 'user/:id',
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
