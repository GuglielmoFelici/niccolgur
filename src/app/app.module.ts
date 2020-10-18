import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {QueueComponent} from './components/pages/queue/queue.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SeasonComponent} from './components/pages/season/season.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule, MatTableModule,
    MatTabsModule
} from '@angular/material';
import {MatListModule} from '@angular/material';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { ClassificaComponent } from './components/pages/classifica/classifica.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        QueueComponent,
        NavbarComponent,
        SeasonComponent,
        UserProfileComponent,
        MovieCardComponent,
        UserStatsComponent,
        ClassificaComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(routes, {useHash: true}),
        FormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ChartsModule,
        MatTabsModule,
        MatIconModule,
        MatTableModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
