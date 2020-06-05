import {Component, OnInit} from '@angular/core';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {User} from '../../../ts/domain';
import {Router} from '@angular/router';
import { images } from 'src/environments/environment';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

    elements: User[] = [];
    error;
    images = images;
    selected: User;
    master: User;

    constructor(private niccolgurManager: NiccolgurManagerService,
                private router: Router) {
    }

    ngOnInit() {
        this.niccolgurManager.getUsersQueue().then(
            users => {
                this.elements = users;
                this.master = this.elements[0];
                this.selected = this.elements[0];
            }, err => {
                this.error = err;
            });
    }

    getClassList(user: User) {
        const ret = [];
        if (this.master.id === user.id) {
            ret.push('master');
        }
        if (this.selected && this.selected.id === user.id) {
            ret.push('highlighted');
        } // TODO css opacity 0 ??
        return ret;
    }

    userOnClick(user: User) {
        if (!this.selected || this.selected.id !== user.id) {
            this.selected = user;
        } else {
            this.router.navigate([`/users/${user.id}`]);
        }
    }

    isSelected(user: User) {
        return this.selected.id === user.id;
    }

    // TODO animazioni

}
