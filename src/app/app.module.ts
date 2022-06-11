import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {QueueComponent} from './components/pages/queue/queue.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SeasonComponent} from './components/pages/season/season.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {AuthInterceptor} from "./services/auth-interceptor.service";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import { LoginHandlerComponent } from './components/login-handler/login-handler.component';
import { AddMovieComponent } from './components/pages/add-movie/add-movie.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

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
        LoginHandlerComponent,
        AddMovieComponent,
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
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
