import {Component, OnInit} from '@angular/core';
import {TypeObject} from '../../ts/domain';
import {Router} from '@angular/router';
import {scrollToTop} from "../../ts/util";
import {StorageService} from "../../services/storage-service.service";
import {assetsImages} from "../../../environments/environment";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    current: TypeObject;

    tabs = [
        new TypeObject('1', 'Queue', 'queue'),
        new TypeObject('2', 'Season', 'season'),
    ];

    constructor(private router: Router,
                private storage: StorageService) {
    }

    ngOnInit() {
        // se il path prevede parametri, si potrebbero usare le regex
        // TODO non funziona se viene omesso il path relativo all'inizio
        setTimeout(() => this.current =
            this.tabs.find(tab => tab.data === window.location.href.split('/').pop()));
    }

    isCurrent(tab: TypeObject) {
        return this.current && this.current.id === tab.id ? 'current' : '';
    }

    tabOnClick(tab: TypeObject) {
        this.current = tab;
        this.router.navigate([tab.data]).then(scrollToTop);
    }


}
