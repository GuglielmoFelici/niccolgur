import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QueueComponent} from './components/queue/queue.component';
import {QueueElementComponent} from './components/queue/queue-element/queue-element.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SeasonComponent} from './components/season/season.component';
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
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        QueueComponent,
        QueueElementComponent,
        NavbarComponent,
        SeasonComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
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
