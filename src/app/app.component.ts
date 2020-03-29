import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {StorageService} from './services/storage-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'fe-ng';

    constructor(private titleService: Title,
                private storage: StorageService) {
        this.titleService.setTitle('Niccolgur');
    }

    scrollToTop() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

}
