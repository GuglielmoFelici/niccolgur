import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {User} from '../../ts/domain';
import {images} from 'src/app/ts/env';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    notFound = false;
    user: User;
    images = images;
    presenceData: {
        present,
        absent,
        total,
        ratio,
    };

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
            });
        this.manager.getUserPresence(id)
            .then(presence => {
                this.presenceData = {
                    present: presence.present,
                    absent: presence.total - presence.present,
                    total: presence.total,
                    ratio: Math.round((presence.present * 100) / presence.total)
                };
            });
    }

}
