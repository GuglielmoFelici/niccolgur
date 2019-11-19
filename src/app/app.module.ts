import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QueueComponent} from './components/queue/queue.component';
import {QueueElementComponent} from './components/queue/queue-element/queue-element.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SeasonComponent} from './components/season/season.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        QueueComponent,
        QueueElementComponent,
        NavbarComponent,
        SeasonComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
