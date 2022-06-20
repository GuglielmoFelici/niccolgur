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
        {id: '1', desc: 'Queue', route: 'queue', show: () => true},
        {id: '2', desc: 'Season', route: 'season', show: () => true},
        // {id: '3', desc: 'Niccuscar', route: 'niccuscar', show: () => true},
    ];

    constructor(private router: Router,
                private storage: StorageService) {
    }

    ngOnInit() {
    }

    isCurrent(tab) {
        // se il path prevede parametri, si dovrebbero usare le regex
        const current = this.tabs.find(tab => tab.route === window.location.href.split('/').pop());
        return current && current.id === tab.id ? 'current' : '';
    }

    tabOnClick(tab) {
        this.current = tab;
        this.router.navigate([tab.route]).then(scrollToTop);
    }


}
