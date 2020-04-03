import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {Season, User} from '../../../ts/domain';
import {images} from 'src/app/ts/env';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: User;
    seasons: Season[];
    users: User[];
    images = images;
    notFound = false;
    loading = true;

    constructor(private route: ActivatedRoute,
                private manager: NiccolgurManagerService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.notFound = true;
            return;
        }
        this.manager.getUser(id)
            .then(user => {
                this.user = user;
                this.notFound = !!user;
                return this.manager.getSeasons();
            })
            .then(seasons => {
                this.seasons = seasons;
                return this.manager.getUsers();
            })
            .then(users => {
                this.users = users;
                this.loading = false;
            });
    }
}
