import {Component, OnInit} from '@angular/core';
import {TypeObject} from '../../ts/domain';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from "../../app.component";
import {scrollToTop} from "../../ts/util";

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

    constructor(private router: Router) {
    }

    ngOnInit() {
        // se il path prevede parametri, si potrebbero usare le regex
        // TODO non funziona se viene omesso il path relativo all'inizio
        this.current =
            this.tabs.find(tab => tab.data === window.location.href.split('/').pop());
    }

    isCurrent(tab: TypeObject) {
        return this.current && this.current.id === tab.id ? 'current' : '';
    }

    tabOnClick(tab: TypeObject) {
        this.current = tab;
        this.router.navigate([tab.data]).then(scrollToTop);
    }

}
