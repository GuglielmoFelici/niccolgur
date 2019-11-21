import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueComponent} from './components/queue/queue.component';
import {SeasonComponent} from './components/season/season.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'queue',
        pathMatch: 'full',
    },
    {
        path: 'queue',
        component: QueueComponent,
    },
    {
        path: 'season',
        component: SeasonComponent,
    },
    {
        path: '**',
        component: QueueComponent,
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
