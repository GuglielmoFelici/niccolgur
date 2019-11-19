import {Component, OnInit} from '@angular/core';
import {TypeObject} from '../../ts/domain';
import {Router} from '@angular/router';

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
        this.current = this.tabs[0];
    }

    ngOnInit() {
    }

    isCurrent(tab: TypeObject) {
        return this.current.id === tab.id ? 'current' : '';
    }

    tabOnClick(tab: TypeObject) {
        this.current = tab;
        this.router.navigate([tab.data]);
    }

}
