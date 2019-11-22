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
            return `${this.config.images.base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://www.artranked.com/images/3b/3be9d9fcc7e4e8f433893ef020168598.jpg';
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
