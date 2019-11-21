import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Niccolgur, Season} from '../../ts/domain';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {StorageService} from '../../services/storage-service.service';
import {images} from '../../ts/env';

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

    seasonNumber;
    seasonsCount;
    season: Season;
    error;
    config;
    images = images;

    constructor(private niccolgurManager: NiccolgurManagerService,
                private storage: StorageService) {
    }

    ngOnInit() {
        this.storage.config.subscribe(config => this.config = config);
        this.niccolgurManager.getSeasonsCount().then(
            n => {
                this.seasonsCount = n;
                this.changeSeason(n);
            }, err => {
                this.error = err;
            });
    }

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data) {
            console.log("ciao");
            return `${this.config.images.base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/768px-Dialog-error-round.svg.png';
        }
    }

    changeSeason(n) {
        this.seasonNumber = n;
        this.niccolgurManager.getSeason(n).then(
            season => {
                this.season = season.reverse();
            }, err => {
                console.log(err);
                this.error = err;
            });
    }

}
