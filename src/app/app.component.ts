import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {StorageService} from './services/storage-service.service';
import {scrollToTop} from "./ts/util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'fe-ng';

    scrollToTop = scrollToTop;

    constructor(private titleService: Title,
                private storage: StorageService) {
        this.titleService.setTitle('Niccolgur');
    }

}
