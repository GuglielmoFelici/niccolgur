import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {Season, User} from '../../../ts/domain';
import {profile_pics} from "../../../../environments/environment";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: User;
    seasons: Season[];
    users: User[];
    notFound = false;
    loading = true;

    constructor(private route: ActivatedRoute,
                private manager: NiccolgurManagerService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(map => {
                const id = map.get('id');
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
        )
    }

}
